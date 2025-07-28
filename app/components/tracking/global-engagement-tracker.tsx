'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import posthog from 'posthog-js'

export function GlobalEngagementTracker(): null {
  const pathname = usePathname()
  const trackingRef = useRef({
    startTime: Date.now(),
    maxScroll: 0,
    clicks: 0,
    timeEngaged: 0,
    lastActivity: Date.now(),
    idleTimer: null as NodeJS.Timeout | null,
  })

  // Calculate basic engagement score
  const calculateEngagementScore = () => {
    const data = trackingRef.current
    const timeMinutes = (Date.now() - data.startTime) / 60000
    const scrollDepth = data.maxScroll
    
    // Simple scoring: time (max 30) + scroll (max 40) + clicks (max 30)
    const timeScore = Math.min(timeMinutes * 5, 30)
    const scrollScore = Math.min((scrollDepth / 100) * 40, 40)
    const clickScore = Math.min(data.clicks * 3, 30)
    
    return Math.round(timeScore + scrollScore + clickScore)
  }

  useEffect(() => {
    const data = trackingRef.current
    
    // Track page view with enhanced data
    posthog.capture('enhanced_page_view', {
      path: pathname,
      referrer: document.referrer,
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      page_title: document.title,
    })

    // Track engagement time (active vs idle)
    const resetIdleTimer = () => {
      if (data.idleTimer) clearTimeout(data.idleTimer)
      
      const now = Date.now()
      data.timeEngaged += now - data.lastActivity
      data.lastActivity = now
      
      data.idleTimer = setTimeout(() => {
        // User is idle
        data.lastActivity = Date.now()
      }, 30000) // 30 seconds of inactivity = idle
    }

    // Scroll tracking
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      data.maxScroll = Math.max(data.maxScroll, scrollPercent)
      resetIdleTimer()
      
      // Debounced scroll depth capture
      scrollTimeout = setTimeout(() => {
        if (scrollPercent > 0 && scrollPercent % 25 === 0) {
          posthog.capture('scroll_milestone', {
            depth: scrollPercent,
            path: pathname,
          })
        }
      }, 500)
    }

    // Click tracking
    const handleClick = (e: MouseEvent) => {
      data.clicks++
      resetIdleTimer()
      
      // Track specific CTA clicks
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        const text = target.textContent?.trim().substring(0, 50)
        if (text) {
          posthog.capture('cta_interaction', {
            element_text: text,
            element_type: target.tagName.toLowerCase(),
            path: pathname,
            engagement_score: calculateEngagementScore(),
          })
        }
      }
    }

    // Visibility tracking
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const engagementData = {
          path: pathname,
          time_on_page: (Date.now() - data.startTime) / 1000,
          max_scroll_depth: data.maxScroll,
          click_count: data.clicks,
          engagement_score: calculateEngagementScore(),
          time_engaged: data.timeEngaged / 1000,
        }
        
        posthog.capture('page_backgrounded', engagementData)
      } else {
        data.lastActivity = Date.now()
        resetIdleTimer()
      }
    }

    // Track rage clicks (3+ clicks in 1 second)
    let clickTimes: number[] = []
    const handleRageClick = (e: MouseEvent) => {
      const now = Date.now()
      clickTimes.push(now)
      clickTimes = clickTimes.filter(time => now - time < 1000)
      
      if (clickTimes.length >= 3) {
        posthog.capture('rage_click_detected', {
          path: pathname,
          click_count: clickTimes.length,
          target: (e.target as HTMLElement).tagName,
        })
        clickTimes = []
      }
    }

    // Attach listeners
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('click', handleClick)
    document.addEventListener('click', handleRageClick)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('mousemove', resetIdleTimer)
    window.addEventListener('keypress', resetIdleTimer)
    
    // Initial idle timer
    resetIdleTimer()

    // Send periodic engagement updates for long sessions
    const engagementInterval = setInterval(() => {
      const score = calculateEngagementScore()
      if (score > 20) { // Only track engaged users
        posthog.capture('engagement_checkpoint', {
          path: pathname,
          score: score,
          time_elapsed: (Date.now() - data.startTime) / 1000,
          scroll_depth: data.maxScroll,
        })
      }
    }, 60000) // Every minute

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClick)
      document.removeEventListener('click', handleRageClick)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('mousemove', resetIdleTimer)
      window.removeEventListener('keypress', resetIdleTimer)
      clearInterval(engagementInterval)
      if (data.idleTimer) clearTimeout(data.idleTimer)
      clearTimeout(scrollTimeout)
      
      // Final engagement summary
      const finalScore = calculateEngagementScore()
      const finalData = {
        path: pathname,
        final_score: finalScore,
        total_time: (Date.now() - data.startTime) / 1000,
        engaged_time: data.timeEngaged / 1000,
        max_scroll: data.maxScroll,
        total_clicks: data.clicks,
        engagement_rate: Math.round((data.timeEngaged / (Date.now() - data.startTime)) * 100),
      }
      
      posthog.capture('page_exit_engagement', finalData)
    }
  }, [pathname])

  return null
}