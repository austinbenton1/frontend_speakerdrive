'use client'

import { useEffect, useRef } from 'react'
import posthog from 'posthog-js'

interface ValueProp {
  name: string
  viewTime: number
  depth: number
}

interface HesitationPoint {
  type: string
  position: number
  time: number
}

interface TrackedElement {
  element: Element
  startTime: number
  type: string
}

export function GetTheListTracking(): null {
  const trackingRef = useRef({
    valuePropsViewed: [] as ValueProp[],
    contentInteractions: [] as string[],
    hesitationPoints: [] as HesitationPoint[],
    microConversions: [] as string[],
    observers: [] as IntersectionObserver[],
    timeouts: new Set<NodeJS.Timeout>(),
    startTime: Date.now(),
    lastActivity: Date.now(),
    
    // Performance tracking
    renderTime: 0,
    firstContentfulPaint: 0,
    
    // Mobile-specific
    touchInteractions: 0,
    pinchZooms: 0,
    
    // Attribution
    utmParams: {} as Record<string, string>,
    referrer: '',
  })

  // Calculate engagement score
  const calculateEngagementScore = () => {
    const data = trackingRef.current
    const timeOnPage = (Date.now() - data.startTime) / 1000
    const activeTime = (data.lastActivity - data.startTime) / 1000
    
    return {
      raw: (data.valuePropsViewed.length * 10) + 
           (data.contentInteractions.length * 5) + 
           (Math.min(activeTime / 10, 30)),
      normalized: Math.min(100, Math.max(0, 
        (data.valuePropsViewed.length * 10) + 
        (data.contentInteractions.length * 5) + 
        (Math.min(activeTime / 10, 30)) - 
        (data.hesitationPoints.length * 2)
      ))
    }
  }

  // Calculate lead score with more nuanced scoring
  const calculateLeadScore = () => {
    const data = trackingRef.current
    let score = 0
    const weights = {
      valueProp: 8,
      interaction: 5,
      microConversion: 10,
      timeBonus: 0.5,
      hesitationPenalty: -3,
      mobileBonus: 5,
      returnVisitor: 15
    }
    
    // Value prop engagement (max 40 points)
    const uniqueProps = new Set(data.valuePropsViewed.map(vp => vp.name))
    score += Math.min(uniqueProps.size * weights.valueProp, 40)
    
    // Content interactions (max 25 points)
    score += Math.min(data.contentInteractions.length * weights.interaction, 25)
    
    // Micro conversions (max 25 points)
    const uniqueConversions = new Set(data.microConversions)
    score += Math.min(uniqueConversions.size * weights.microConversion, 25)
    
    // Time on page bonus (max 10 points)
    const timeMinutes = (Date.now() - data.startTime) / 60000
    score += Math.min(timeMinutes * weights.timeBonus, 10)
    
    // Mobile engagement bonus
    if (data.touchInteractions > 5) {
      score += weights.mobileBonus
    }
    
    // Return visitor bonus
    if (typeof window !== 'undefined' && localStorage.getItem('speakerdrive_return_visitor')) {
      score += weights.returnVisitor
    }
    
    // Penalties
    score += data.hesitationPoints.length * weights.hesitationPenalty
    
    return {
      score: Math.max(0, Math.min(100, score)),
      factors: {
        valueProps: uniqueProps.size,
        interactions: data.contentInteractions.length,
        conversions: uniqueConversions.size,
        timeMinutes: Math.round(timeMinutes * 10) / 10,
        hesitations: data.hesitationPoints.length
      }
    }
  }

  useEffect(() => {
    const data = trackingRef.current
    
    // Capture attribution data
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
      utmKeys.forEach(key => {
        const value = urlParams.get(key)
        if (value) data.utmParams[key] = value
      })
      data.referrer = document.referrer
      
      // Mark return visitor
      if (localStorage.getItem('speakerdrive_visited')) {
        localStorage.setItem('speakerdrive_return_visitor', 'true')
      } else {
        localStorage.setItem('speakerdrive_visited', 'true')
      }
    }

    // Track performance metrics
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (perfData) {
        data.renderTime = perfData.loadEventEnd - perfData.fetchStart
        data.firstContentfulPaint = perfData.domContentLoadedEventEnd - perfData.fetchStart
      }
    }

    // Unified Intersection Observer for better performance
    const elementMap = new Map<Element, TrackedElement>()
    
    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const tracked = elementMap.get(entry.target)
        if (!tracked) return
        
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const viewDuration = Date.now() - tracked.startTime
          
          if (tracked.type === 'valueProp') {
            const propName = (entry.target as HTMLElement).dataset.valueProp || 
                           entry.target.id || 
                           entry.target.className
            
            if (!data.valuePropsViewed.find(vp => vp.name === propName)) {
              data.valuePropsViewed.push({
                name: propName,
                viewTime: viewDuration,
                depth: window.scrollY
              })
              
              posthog.capture('value_proposition_viewed', {
                proposition: propName,
                time_to_view: viewDuration,
                scroll_depth: (window.scrollY / document.body.scrollHeight) * 100,
                view_order: data.valuePropsViewed.length,
                engagement_score: calculateEngagementScore().normalized
              })
              
              // High-intent signal
              if (data.valuePropsViewed.length >= 3 && !data.microConversions.includes('viewed_multiple_benefits')) {
                data.microConversions.push('viewed_multiple_benefits')
                posthog.capture('micro_conversion', {
                  type: 'high_interest_shown',
                  signal: 'viewed_3plus_benefits',
                  lead_score: calculateLeadScore().score
                })
              }
            }
          } else if (tracked.type === 'socialProof' && viewDuration > 2000) {
            posthog.capture('social_proof_engaged', {
              element: entry.target.className,
              view_duration: viewDuration,
              lead_score: calculateLeadScore().score
            })
          }
        }
      })
    }, { threshold: [0.5], rootMargin: '0px' })
    
    data.observers.push(mainObserver)
    
    // Observe elements with error handling
    const observeElements = () => {
      try {
        // Value propositions
        document.querySelectorAll('[data-value-prop], .benefit, .feature, #benefits-section > *').forEach(el => {
          elementMap.set(el, { element: el, startTime: Date.now(), type: 'valueProp' })
          mainObserver.observe(el)
        })
        
        // Social proof
        document.querySelectorAll('.testimonial, .review, [data-social-proof], .speaker-count, .success-story').forEach(el => {
          elementMap.set(el, { element: el, startTime: Date.now(), type: 'socialProof' })
          mainObserver.observe(el)
        })
      } catch (error) {
        console.error('Error setting up observers:', error)
      }
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeElements)
    } else {
      observeElements()
    }

    // Enhanced scroll tracking with throttling
    let scrollTimeout: NodeJS.Timeout
    let lastScrollPosition = 0
    let scrollBackCount = 0
    let rapidScrolls = 0
    let lastScrollTime = Date.now()
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const currentScroll = window.pageYOffset
        const currentTime = Date.now()
        const timeDiff = currentTime - lastScrollTime
        
        data.lastActivity = currentTime
        
        // Detect scroll backs
        if (currentScroll < lastScrollPosition - 100) {
          scrollBackCount++
          data.hesitationPoints.push({
            type: 'scroll_back',
            position: currentScroll,
            time: currentTime
          })
          
          if (scrollBackCount === 3) {
            posthog.capture('hesitation_signal', {
              type: 'multiple_scroll_backs',
              count: scrollBackCount,
              current_lead_score: calculateLeadScore().score
            })
          }
        }
        
        // Detect rapid scrolling
        if (timeDiff > 0) {
          const scrollSpeed = Math.abs(currentScroll - lastScrollPosition) / timeDiff
          if (scrollSpeed > 5) {
            rapidScrolls++
            if (rapidScrolls === 5) {
              posthog.capture('rapid_scanning', {
                behavior: 'quick_scan_not_reading',
                lead_score: calculateLeadScore().score
              })
            }
          } else {
            rapidScrolls = 0
          }
        }
        
        lastScrollPosition = currentScroll
        lastScrollTime = currentTime
      }, 100) // Throttle to every 100ms
      
      data.timeouts.add(scrollTimeout)
    }

    // Global click handler with delegation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      data.lastActivity = Date.now()
      
      // Expandable content
      if (target.matches('[data-expand], .read-more, .show-details, .toggle-content')) {
        data.contentInteractions.push('expanded_content')
        posthog.capture('content_expanded', {
          content_id: target.dataset.expand || target.textContent?.substring(0, 50),
          time_since_start: Date.now() - data.startTime,
          lead_score: calculateLeadScore().score
        })
      }
      
      // FAQ clicks
      if (target.matches('.faq-question, [data-faq], .accordion-header')) {
        const faqText = target.textContent?.substring(0, 100) || 'Unknown FAQ'
        data.contentInteractions.push(`faq_${faqText}`)
        posthog.capture('faq_clicked', {
          question: faqText,
          time_since_start: Date.now() - data.startTime,
          previous_faqs_viewed: data.contentInteractions.filter(i => i.startsWith('faq_')).length,
          lead_score: calculateLeadScore().score
        })
      }
      
      // Preview/sample interactions
      if (target.matches('[data-preview], .preview-list, .sample-speakers, .example-data')) {
        data.microConversions.push('viewed_sample')
        posthog.capture('sample_content_viewed', {
          sample_type: target.dataset.preview || 'list_preview',
          interaction_number: data.contentInteractions.length + 1,
          lead_score: calculateLeadScore().score
        })
      }
      
      // CTA clicks
      if (target.matches('.cta, [data-cta], button[type="submit"], .get-list-button')) {
        const leadData = calculateLeadScore()
        posthog.capture('cta_clicked', {
          cta_text: target.textContent,
          lead_score: leadData.score,
          lead_factors: leadData.factors,
          time_on_page: (Date.now() - data.startTime) / 1000,
          attribution: data.utmParams
        })
        
        // High-intent alert
        if (leadData.score >= 80) {
          posthog.capture('high_intent_lead_alert', {
            score: leadData.score,
            factors: leadData.factors,
            attribution: data.utmParams,
            referrer: data.referrer
          })
        }
      }
    }

    // Mobile-specific tracking
    const handleTouch = () => {
      data.touchInteractions++
      data.lastActivity = Date.now()
    }
    
    const handleGesture = (e: Event) => {
      if (e.type === 'gesturechange') {
        data.pinchZooms++
      }
    }

    // Form field tracking
    const formFocusTime: Record<string, number> = {}
    
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement
      if (target.matches('input, textarea')) {
        formFocusTime[target.name || target.id] = Date.now()
        data.lastActivity = Date.now()
      }
    }
    
    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement
      if (target.matches('input, textarea')) {
        const fieldId = target.name || target.id
        if (formFocusTime[fieldId]) {
          const timeSpent = Date.now() - formFocusTime[fieldId]
          if (timeSpent > 3000 && !target.value) {
            data.hesitationPoints.push({
              type: 'form_abandonment',
              position: 0,
              time: Date.now()
            })
            posthog.capture('form_hesitation', {
              field: fieldId,
              hesitation_time: timeSpent,
              field_abandoned: true,
              lead_score: calculateLeadScore().score
            })
          }
          delete formFocusTime[fieldId]
        }
      }
    }

    // Visibility change tracking
    const handleVisibilityChange = () => {
      if (document.hidden) {
        posthog.capture('tab_hidden', {
          time_on_page: (Date.now() - data.startTime) / 1000,
          lead_score: calculateLeadScore().score
        })
      } else {
        posthog.capture('tab_returned', {
          time_away: Date.now() - data.lastActivity,
          lead_score: calculateLeadScore().score
        })
        data.lastActivity = Date.now()
      }
    }

    // Attach all event listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleTouch)
    document.addEventListener('gesturechange', handleGesture)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Send initial page view with attribution
    posthog.capture('get_the_list_page_viewed', {
      attribution: data.utmParams,
      referrer: data.referrer,
      is_return_visitor: !!localStorage.getItem('speakerdrive_return_visitor'),
      device_type: /mobile/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      render_time: data.renderTime,
      first_contentful_paint: data.firstContentfulPaint
    })

    // Periodic lead score updates for engaged visitors
    const scoreInterval = setInterval(() => {
      const leadData = calculateLeadScore()
      if (leadData.score >= 40) {
        posthog.capture('lead_score_update', {
          score: leadData.score,
          factors: leadData.factors,
          engagement_time: (Date.now() - data.startTime) / 1000
        })
      }
    }, 30000) // Every 30 seconds

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleTouch)
      document.removeEventListener('gesturechange', handleGesture)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(scoreInterval)
      
      // Clear all timeouts
      data.timeouts.forEach(timeout => clearTimeout(timeout))
      
      // Disconnect all observers
      data.observers.forEach(observer => observer.disconnect())
      
      // Send final lead score on unmount
      const finalScore = calculateLeadScore()
      posthog.capture('page_exit_lead_score', {
        final_score: finalScore.score,
        factors: finalScore.factors,
        total_time: (Date.now() - data.startTime) / 1000,
        attribution: data.utmParams
      })
    }
  }, [])

  return null
}