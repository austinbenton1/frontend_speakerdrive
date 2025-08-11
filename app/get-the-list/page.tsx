"use client";

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { GetTheListTracking } from '../components/tracking/get-the-list-tracking'
import { Suspense } from 'react'

// Type definitions
type EventData = Record<string, any>;

// Extend the existing Window interface
declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: any) => void;
      identify: (id: string, properties?: any) => void;
      setPersonProperties?: (properties: any) => void;
      get_distinct_id?: () => string;
    };
  }
}

// Cold Email Intelligence Class
class ColdEmailIntelligence {
  startTime: number;
  sessionData: any;
  
  constructor() {
    this.startTime = Date.now();
    this.sessionData = {};
    this.init();
  }

  isBusinessHours() {
    const hour = new Date().getHours();
    const day = new Date().getDay();
    return day >= 1 && day <= 5 && hour >= 8 && hour <= 18;
  }

  async enrichVisitorData() {
    try {
      // Get location and company data
      const response = await fetch('https://ipapi.co/json/');
      const geoData = await response.json();
      
      // Determine if it's a business or personal email
      const isBusinessISP = this.checkBusinessISP(geoData.org);
      
      // Store enriched data
      this.sessionData = {
        city: geoData.city,
        region: geoData.region_code,
        country: geoData.country_name,
        timezone: geoData.timezone,
        organization: geoData.org,
        is_business_isp: isBusinessISP
      };
      
      // Track with PostHog if available
      if (window.posthog) {
        window.posthog.capture('cold_email_visitor_landed', {
          // Geographic data
          city: geoData.city,
          region: geoData.region_code,
          country: geoData.country_name,
          timezone: geoData.timezone,
          
          // Company intelligence
          organization: geoData.org,
          is_business_isp: isBusinessISP,
          company_type: isBusinessISP ? 'Business' : 'Personal',
          
          // Campaign data from URL
          campaign_name: new URLSearchParams(window.location.search).get('utm_campaign') || 'unknown',
          campaign_variant: new URLSearchParams(window.location.search).get('utm_content') || 'default',
          
          // Visit intelligence
          local_time: new Date().toLocaleTimeString(),
          local_hour: new Date().getHours(),
          visit_day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()],
          is_business_hours: this.isBusinessHours(),
          
          // Quality signals
          device_type: this.getDeviceType(),
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          connection_quality: (navigator as any).connection?.effectiveType || 'unknown'
        });
        
        // Set person properties for filtering
        if (window.posthog.setPersonProperties) {
          window.posthog.setPersonProperties({
            city: geoData.city,
            state: geoData.region,
            country: geoData.country_code,
            company: geoData.org,
            company_type: isBusinessISP ? 'Business' : 'Personal',
            timezone: geoData.timezone,
            traffic_source: 'cold_email',
            is_business_visitor: isBusinessISP
          });
        }
      }
      
      return geoData;
      
    } catch (error) {
      console.error('Enrichment failed:', error);
      return null;
    }
  }

  checkBusinessISP(org: string) {
    if (!org) return false;
    const consumerISPs = [
      'comcast', 'verizon', 'at&t', 'spectrum', 'cox', 'charter',
      'centurylink', 'frontier', 'windstream', 'mediacom', 'residential'
    ];
    const orgLower = org.toLowerCase();
    return !consumerISPs.some(isp => orgLower.includes(isp));
  }

  getDeviceType() {
    const ua = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
    if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
    return 'desktop';
  }

  trackEngagementMilestones() {
    // Track 15-second milestone (interested visitor)
    setTimeout(() => {
      if (document.visibilityState === 'visible' && window.posthog) {
        window.posthog.capture('cold_email_engagement_milestone', {
          milestone: '15_seconds',
          scroll_depth: this.getScrollDepth(),
          ...this.sessionData
        });
      }
    }, 15000);
    
    // Track 30-second milestone (engaged visitor)
    setTimeout(() => {
      if (document.visibilityState === 'visible' && window.posthog) {
        window.posthog.capture('cold_email_highly_engaged', {
          milestone: '30_seconds',
          scroll_depth: this.getScrollDepth(),
          quality_score: this.calculateQualityScore(),
          ...this.sessionData
        });
      }
    }, 30000);
    
    // Track 60-second milestone (very engaged visitor)
    setTimeout(() => {
      if (document.visibilityState === 'visible' && window.posthog) {
        window.posthog.capture('cold_email_super_engaged', {
          milestone: '60_seconds',
          scroll_depth: this.getScrollDepth(),
          quality_score: this.calculateQualityScore(),
          ...this.sessionData
        });
      }
    }, 60000);
  }

  getScrollDepth() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return Math.round(((scrollTop + windowHeight) / documentHeight) * 100);
  }

  calculateQualityScore() {
    // Quality indicators for cold email leads
    const indicators = {
      spent_15_seconds: (Date.now() - this.startTime) > 15000,
      scrolled_past_fold: this.getScrollDepth() > 25,
      is_business_hours: this.isBusinessHours(),
      is_desktop: this.getDeviceType() === 'desktop',
      has_good_connection: (navigator as any).connection?.effectiveType === '4g',
      multiple_pageviews: performance.navigation.type === 1
    };
    
    const score = Object.values(indicators).filter(Boolean).length;
    return (score / Object.keys(indicators).length) * 100;
  }

  setupExitIntentTracking() {
    let exitIntentFired = false;
    
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY <= 0 && !exitIntentFired && window.posthog) {
        exitIntentFired = true;
        
        const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
        window.posthog.capture('cold_email_exit_intent', {
          time_on_page_seconds: timeOnPage,
          scroll_depth: this.getScrollDepth(),
          quality_score: this.calculateQualityScore(),
          engagement_level: timeOnPage > 30 ? 'high' : timeOnPage > 15 ? 'medium' : 'low',
          ...this.sessionData
        });
      }
    });
  }

  // Enhanced campaign Attribution Helper for cold email
  setupCampaignAttribution() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Extract all campaign data
    const campaignData = {
      // Standard UTM params
      source: urlParams.get('utm_source') || 'cold_email',
      campaign: urlParams.get('utm_campaign') || urlParams.get('campaign') || 'unknown',
      content: urlParams.get('utm_content') || urlParams.get('variant') || 'default',
      medium: urlParams.get('utm_medium') || 'email',
      
      // Instantly specific tracking
      instantly_id: urlParams.get('iid'),
      instantly_campaign: urlParams.get('campaign'),
      sequence_step: urlParams.get('step'),
      contact_id: urlParams.get('cid'),
      
      // Time-based attribution
      sent_date: urlParams.get('sent_date'),
      days_since_send: this.calculateDaysSinceSend(urlParams.get('sent_date')),
      
      // A/B testing
      subject_line: urlParams.get('subject'),
      email_variant: urlParams.get('variant'),
      
      // Performance tracking
      email_open_to_click_minutes: urlParams.get('otc') // open to click time
    };
    
    if (window.posthog) {
      window.posthog.capture('cold_email_campaign_performance', {
        ...campaignData,
        campaign_identified: campaignData.campaign !== 'unknown',
        has_instantly_tracking: !!campaignData.instantly_id,
        click_timing: this.isBusinessHours() ? 'business_hours' : 'after_hours',
        device_on_click: this.getDeviceType()
      });
      
      // Store for conversion attribution
      sessionStorage.setItem('cold_email_campaign', JSON.stringify(campaignData));
      
      // Set campaign as person property for segmentation
      if (window.posthog.setPersonProperties) {
        window.posthog.setPersonProperties({
          last_campaign: campaignData.campaign,
          last_campaign_date: new Date().toISOString()
        });
      }
      
      // Auto-identify if email is provided in URL (for better tracking)
      const email = urlParams.get('email');
      const firstName = urlParams.get('first_name') || '';
      const lastName = urlParams.get('last_name') || '';
      
      if (email && window.posthog.get_distinct_id && window.posthog.get_distinct_id() !== email) {
        window.posthog.identify(email, {
          email: email,
          first_name: firstName,
          last_name: lastName,
          name: `${firstName} ${lastName}`.trim(), // Combined name for display
          source: 'cold_email_click',
          campaign: campaignData.campaign
        });
      }
    }
  }

  calculateDaysSinceSend(sentDate: string | null) {
    if (!sentDate) return null;
    const sent = new Date(sentDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - sent.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  init() {
    try {
      // Run enrichment
      this.enrichVisitorData();
      
      // Setup tracking
      this.trackEngagementMilestones();
      this.setupExitIntentTracking();
      this.setupCampaignAttribution();
      
      // Track initial cold email landing
      if (window.posthog) {
        const urlParams = new URLSearchParams(window.location.search);
        window.posthog.capture('cold_email_page_landed', {
          entry_time: new Date().toISOString(),
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          referrer: document.referrer || 'direct',
          
          // Campaign tracking
          campaign: urlParams.get('utm_campaign') || urlParams.get('campaign') || 'unknown',
          variant: urlParams.get('utm_content') || urlParams.get('variant') || 'default',
          instantly_id: urlParams.get('iid') || null,
          
          // Device info
          device_type: this.getDeviceType(),
          is_business_hours: this.isBusinessHours()
        });
      }
    } catch (error) {
      console.error('Cold email intelligence error:', error);
      // Don't let tracking errors break the page
    }
  }
}

export default function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState(new Set<number>());
  const [screenshotModal, setScreenshotModal] = useState<{src: string; alt: string} | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coldEmailIntelligence = useRef<ColdEmailIntelligence | null>(null);

  /* 
    COLD EMAIL URL STRUCTURE FOR INSTANTLY:
    
    Base: https://speakerdrive.com/get-the-list
    
    Add these parameters:
    ?utm_source=cold_email
    &utm_campaign={{campaign.name}}
    &utm_content={{variant.name}}
    &iid={{contact.id}}
    &sent_date={{campaign.sent_date}}
    &subject={{subject_line_variant}}
    &email={{contact.email}} (optional - for auto-identification)
    
    Example:
    https://speakerdrive.com/get-the-list?utm_source=cold_email&utm_campaign=event_planners_q1&utm_content=variant_a&iid=12345&sent_date=2025-01-28&email=john@company.com
  */

  // Generate or retrieve session ID - FIXED for hydration
  const getSessionId = () => {
    if (typeof window === 'undefined') return 'ssr-placeholder';
    
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      // Use a deterministic ID during SSR/initial render
      sessionId = 'pending-client-init';
      // Set the real ID after mount
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const realId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', realId);
        return realId;
      }
    }
    return sessionId;
  };

  // Initialize session ID and Cold Email Intelligence after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize session ID
      if (!sessionStorage.getItem('sessionId')) {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', sessionId);
      }
      
      // Initialize Cold Email Intelligence
      if (!coldEmailIntelligence.current) {
        try {
          coldEmailIntelligence.current = new ColdEmailIntelligence();
        } catch (error) {
          console.error('Failed to initialize Cold Email Intelligence:', error);
        }
      }
    }
  }, []);

  // Get current scroll depth as percentage
  const getScrollDepth = () => {
    if (typeof window === 'undefined') return 0;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
  };

  // Enhanced webhook function to track events
  const trackEvent = async (eventType: string, eventData: EventData = {}) => {
    try {
      // Only track on client side
      if (typeof window === 'undefined') return;
      
      // Include cold email intelligence data if available
      const enrichedData = coldEmailIntelligence.current?.sessionData || {};
      
      const payload = {
        event: eventType,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        scrollDepth: getScrollDepth(),
        ...enrichedData,
        ...eventData
      };

      // Fire and forget - don't await to avoid blocking user action
      fetch('https://n8n.speakerdrive.com/webhook/lander', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        // Keepalive ensures the request completes even if the page navigates away
        keepalive: true
      }).catch(err => {
        // Silently fail - don't break the user experience
        // console.error('Webhook error:', err);
      });
    } catch (error) {
      // Silently fail - don't break the user experience
      // console.error('Error sending webhook:', error);
    }
  };

  // Wrapper for button clicks to maintain backward compatibility
  const trackButtonClick = (buttonName: string, additionalData: EventData = {}) => {
    trackEvent('button_click', {
      button: buttonName,
      ...additionalData
    });
  };

  // Simplified video tracking for MP4
  const trackVideoEvent = (action: string, additionalData: EventData = {}) => {
    const currentTime = videoRef.current?.currentTime || 0;
    const duration = videoRef.current?.duration || 161; // 2:41 = 161 seconds
    
    trackEvent('video_event', {
      videoAction: action,
      videoType: 'mp4',
      currentTime: Math.round(currentTime),
      duration: Math.round(duration),
      percentage: Math.round((currentTime / duration) * 100),
      ...additionalData
    });
  };

  // Enhanced button click handlers
  const handleGetListClick = () => {
    // Get campaign data from session
    const campaignData = sessionStorage.getItem('cold_email_campaign');
    const campaign = campaignData ? JSON.parse(campaignData) : {};
    
    trackButtonClick('get_the_list', { 
      location: 'hero',
      campaign: campaign.campaign || 'unknown',
      time_to_click: coldEmailIntelligence.current ? 
        Math.round((Date.now() - coldEmailIntelligence.current.startTime) / 1000) : 0
    });
    
    setIsPopupOpen(true);
    setVideoError(false); // Reset error state
  };

  const handleTryFreeClick = (location: string) => {
    // Get campaign and enrichment data
    const campaignData = sessionStorage.getItem('cold_email_campaign');
    const campaign = campaignData ? JSON.parse(campaignData) : {};
    const enrichedData = coldEmailIntelligence.current?.sessionData || {};
    
    trackButtonClick('try_speakerdrive_free', { 
      location,
      campaign: campaign.campaign || 'unknown',
      time_on_page: coldEmailIntelligence.current ? 
        Math.round((Date.now() - coldEmailIntelligence.current.startTime) / 1000) : 0,
      is_business_visitor: enrichedData.is_business_isp || false
    });
    
    // Track high-value conversion
    if (window.posthog) {
      window.posthog.capture('cold_email_high_intent_conversion', {
        conversion_type: 'clicked_trial',
        button_location: location,
        ...campaign,
        ...enrichedData
      });
    }
    
    // BUILD THE ENHANCED URL HERE
    const score = coldEmailIntelligence.current?.calculateQualityScore() || 0;
    const city = enrichedData.city || 'unknown';
    const campaignName = campaign.campaign || 'unknown';
    
    const enhancedUrl = `https://app.speakerdrive.com/signup?ref=cold_email&score=${score}&city=${city}&campaign=${campaignName}`;
    
    // Navigate to the enhanced URL
    window.location.href = enhancedUrl;
  };

  const handleAccessListClick = () => {
    // Get campaign and enrichment data
    const campaignData = sessionStorage.getItem('cold_email_campaign');
    const campaign = campaignData ? JSON.parse(campaignData) : {};
    const enrichedData = coldEmailIntelligence.current?.sessionData || {};
    
    // Track the click
    trackButtonClick('access_the_list', { 
      location: 'video_popup',
      video_watched: videoRef.current ? videoRef.current.currentTime > 0 : false,
      videoWatchTime: videoRef.current ? Math.round(videoRef.current.currentTime) : 0,
      total_time_on_page: coldEmailIntelligence.current ? 
        Math.round((Date.now() - coldEmailIntelligence.current.startTime) / 1000) : 0,
      campaign: campaign.campaign || 'unknown',
      is_business_visitor: enrichedData.is_business_isp || false,
      city: enrichedData.city || 'unknown'
    });
    
    // Track conversion event for cold email
    if (window.posthog) {
      window.posthog.capture('cold_email_conversion', {
        conversion_type: 'accessed_list',
        ...campaign,
        ...enrichedData,
        video_watched_seconds: videoRef.current ? Math.round(videoRef.current.currentTime) : 0
      });
    }
    
    // Navigation happens via the anchor tag
  };

  const handleScreenshotClick = (screenshotName: string) => {
    // Get campaign data
    const campaignData = sessionStorage.getItem('cold_email_campaign');
    const campaign = campaignData ? JSON.parse(campaignData) : {};
    
    trackButtonClick('view_screenshot', { 
      screenshot: screenshotName,
      location: 'faq_section',
      campaign: campaign.campaign || 'unknown'
    });
    
    // Track high-intent signal
    if (window.posthog) {
      window.posthog.capture('cold_email_proof_viewed', {
        proof_type: 'success_screenshot',
        screenshot: screenshotName,
        ...campaign
      });
    }
    
    setScreenshotModal({ 
      src: `/${screenshotName}`, 
      alt: screenshotName.replace(/-/g, ' ').replace('.png', '') 
    });
  };

  const handlePopupClose = () => {
    // Pause video if playing
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      const watchTime = videoRef.current.currentTime;
      trackVideoEvent('abandon', { 
        watchTime: Math.round(watchTime),
        watchPercentage: Math.round((watchTime / 161) * 100)
      });
    }
    
    setIsPopupOpen(false);
    setVideoPlaying(false);
    setVideoStartTime(null);
  };

  // Handle video events
  useEffect(() => {
    if (!videoRef.current || !isPopupOpen) return;
    
    const video = videoRef.current;
    let progressTracked = new Set<number>();
    
    const handlePlay = () => {
      setVideoPlaying(true);
      if (!videoStartTime) {
        setVideoStartTime(Date.now());
      }
      trackVideoEvent('play');
    };
    
    const handlePause = () => {
      setVideoPlaying(false);
      trackVideoEvent('pause');
    };
    
    const handleEnded = () => {
      trackVideoEvent('complete', { watchPercentage: 100 });
    };
    
    const handleError = () => {
      console.error('Video failed to load');
      setVideoError(true);
      trackVideoEvent('error', { 
        error: 'Video failed to load',
        src: video.src 
      });
    };
    
    const handleTimeUpdate = () => {
      const percentage = Math.round((video.currentTime / video.duration) * 100);
      
      // Track progress milestones
      [25, 50, 75].forEach(milestone => {
        if (percentage >= milestone && !progressTracked.has(milestone)) {
          progressTracked.add(milestone);
          trackVideoEvent('progress', { 
            milestone: `${milestone}%`,
            watchPercentage: milestone 
          });
        }
      });
    };
    
    // Add event listeners
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    // Track that video was viewed
    trackVideoEvent('view', { source: 'popup_opened' });
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPopupOpen, videoStartTime]);

  // Track page load and page unload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLoadTime = Date.now();
      
      // Track initial page view
      trackEvent('page_view', {
        pageTitle: document.title,
        pageUrl: window.location.href
      });

      // Track when user leaves the page
      const handleBeforeUnload = () => {
        const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
        trackEvent('page_leave', {
          timeOnPage,
          finalScrollDepth: getScrollDepth()
        });
      };

      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, []);

  // Track scroll depth milestones
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const scrollMilestones = new Set<number>();
    const milestones = [25, 50, 75, 90, 100];

    const handleScroll = () => {
      const currentDepth = getScrollDepth();
      
      milestones.forEach(milestone => {
        if (currentDepth >= milestone && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          trackEvent('scroll_milestone', {
            depth: milestone,
            milestone: `${milestone}%`
          });
        }
      });
    };

    // Throttle scroll events
    let scrollTimer: NodeJS.Timeout | null = null;
    const throttledScroll = () => {
      if (scrollTimer) return;
      scrollTimer = setTimeout(() => {
        handleScroll();
        scrollTimer = null;
      }, 150);
    };

    window.addEventListener('scroll', throttledScroll);
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPopupOpen) {
          handlePopupClose();
        } else {
          setScreenshotModal(null);
        }
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isPopupOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isPopupOpen || screenshotModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen, screenshotModal]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={null}>
        <GetTheListTracking />
      </Suspense>
      <main>
        {/* Hero Section */}
        <section className="px-4 pt-12 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
          
          <div className="container mx-auto max-w-5xl relative">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-black mb-6 leading-tight max-w-4xl tracking-tight">
                Here's Your List of Event Planners Booking Speakers
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl font-normal leading-relaxed">
                Browse opportunities, find good matches, reach out directly. Here's how.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={handleGetListClick}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-1 group-hover:animate-bounce">📋</span>
                  <div className="text-left">
                    <div className="font-semibold uppercase tracking-wide text-base leading-tight">Get The List</div>
                    <div className="text-xs text-green-100 opacity-90">View the opportunities</div>
                  </div>
                </button>
                <a
                  href="https://app.speakerdrive.com/signup"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleTryFreeClick('hero');
                  }}
                  className="group inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 transform hover:-translate-y-1"
                >
                  <div className="text-left">
                    <div className="font-medium text-base leading-tight flex items-center">
                      Try SpeakerDrive Free
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <div className="text-xs text-gray-500">Instant access. No card needed.</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-center text-black mb-4">
              Frequently asked questions
            </h2>
            
            {/* Down Arrow */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gray-200/20 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  color: 'bg-green-500',
                  question: 'How is this list different from SpeakerDrive?',
                  answer: (
                    <>
                      <p>The list is a shared resource - great for getting started with direct outreach.</p>
                      <p className="mt-3">SpeakerDrive has thousands of opportunities, plus the tools to turn them into booked gigs: search filters, fee estimates, 1 click AI messaging and much more.</p>
                    </>
                  )
                },
                {
                  color: 'bg-blue-500',
                  question: 'Why are you giving this away?',
                  answer: 'Simple: we\'d rather show, not just tell. Once you get a feel for the approach, we think you\'ll want to take it to the next level with SpeakerDrive\'s full database, search filters, and AI messaging tools.'
                },
                {
                  color: 'bg-purple-500',
                  question: 'What kind of results are we talking about?',
                  answer: (
                    <>
                      <span>Real speakers, real results:</span>
                      <ul className="mt-3 space-y-2 ml-4">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>First meeting booked in 3 days using SpeakerDrive <button onClick={() => handleScreenshotClick('3rd_day-mh.png')} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>7 minutes from outreach to booking <button onClick={() => handleScreenshotClick('7mins_meeting-mh.png')} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>$45K corporate training budget approved <button onClick={() => handleScreenshotClick('45k_event-mh.png')} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>$12.5K-$15K conference keynote booked <button onClick={() => handleScreenshotClick('12k_keynote-mh.png')} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-500 mt-3 italic">*Screenshots shared with permission</p>
                      <p className="mt-3">Direct outreach means direct results.</p>
                    </>
                  )
                },
                {
                  color: 'bg-orange-500',
                  question: 'How much does it cost?',
                  answer: (
                    <>
                      <p>The list is free. SpeakerDrive is $99/month after a 7 day trial. 30 seconds to sign up. No credit card needed. No tricks, no contracts.</p>
                      <p className="mt-3">One $5K speaking gig covers 4 years of membership. Do the math.</p>
                    </>
                  )
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 ${faq.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-lg font-bold">?</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black mb-2">
                        {faq.question}
                      </h3>
                      {typeof faq.answer === 'string' ? (
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      ) : (
                        <div className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem/Solution + How It Works Combined Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            {/* Problem Setup */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold text-black mb-6">
                Stop Waiting. Start Booking.
              </h2>
              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
                <span className="font-semibold text-gray-900">The old way:</span> Wait for referrals. Hope for the phone to ring. Feast or famine.
              </p>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                <span className="font-semibold text-gray-900">The new way:</span> Direct access to decision-makers. <span className="font-semibold text-green-600">You're in control.</span>
              </p>
            </div>

            {/* Visual Transformation Arrow - Pointing Down */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* How It Works Title */}
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">Here's how it works</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                Three Steps to Transform Your Speaking Business
              </h3>
            </div>

            {/* Three Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Find Your Perfect Events',
                  video: 'https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21aa6244f61209f98b0.mp4',
                  description: 'Search thousands of opportunities by industry, location, and more',
                  color: 'from-green-400 to-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-200'
                },
                {
                  step: '2',
                  title: 'Get Decision Maker Contacts',
                  video: 'https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21a5f250c02e2dc236c.mp4',
                  description: 'Access verified emails and LinkedIn profiles of event organizers with budgets',
                  color: 'from-blue-400 to-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200'
                },
                {
                  step: '3',
                  title: 'Send Personalized Outreach',
                  video: 'https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d25922c810b65b2239ae.mp4',
                  description: 'AI crafts messages that reference specific event needs and highlight your expertise',
                  color: 'from-purple-400 to-purple-600',
                  bgColor: 'bg-purple-50',
                  borderColor: 'border-purple-200'
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  {/* Step Number with Gradient */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-xl font-bold text-black mb-3 text-center whitespace-nowrap">
                    {item.title}
                  </h4>
                  
                  {/* Video */}
                  <div className={`rounded-xl overflow-hidden shadow-md mb-4 ${item.bgColor} ${item.borderColor} border-2 group-hover:shadow-xl transition-all`}>
                    <video
                      className="w-full"
                      playsInline
                      muted
                      loop
                      autoPlay
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-gray-700 mb-6">
                <span className="font-semibold">The result?</span> You're in control. No more waiting. No more hoping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={() => {
                    trackButtonClick('start_free_list', { location: 'how_it_works' });
                    setIsPopupOpen(true);
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-1">📋</span>
                  Start with the Free List
                </button>
                <a
                  href="https://app.speakerdrive.com/signup"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleTryFreeClick('how_it_works');
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                >
                  Scale with SpeakerDrive
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="bg-white py-16 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative mb-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-black text-center max-w-3xl mx-auto">
                SpeakerDrive is Perfect&nbsp;For...
              </h2>
            </div>

            <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mb-12 text-center">
              Professional speakers & experts who deliver their expertise through keynotes, workshops, coaching, and consulting.
            </p>

            {/* Expert Types Grid with Scroll Animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 px-4 sm:px-8">
              {[
                {
                  title: 'Keynote Speakers',
                  img: '/Keynote Speaker.png',
                  description: 'Deliver powerful stage presentations',
                  order: 'order-1 md:order-3 lg:col-span-1 lg:transform lg:scale-105'
                },
                {
                  title: 'Coaches',
                  img: '/Coach.png',
                  description: 'Guide leaders to peak performance',
                  order: 'order-2 md:order-1'
                },
                {
                  title: 'Trainers',
                  img: '/Trainer Facilitator.png',
                  description: 'Build skills through workshops',
                  order: 'order-3 md:order-2'
                },
                {
                  title: 'Consultants',
                  img: '/Consultant.png',
                  description: 'Solve complex business challenges',
                  order: 'order-4 md:order-4'
                },
                {
                  title: 'Facilitators',
                  img: '/Expert Thought Leader.png',
                  description: 'Lead transformative group sessions',
                  order: 'order-5 md:order-5'
                }
              ].map((expert, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`text-center transition-all duration-700 ${expert.order} ${
                    visibleCards.has(index)
                      ? 'opacity-100 translate-y-0 md:hover:scale-105'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                    <img
                      src={expert.img}
                      alt={expert.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                  <div className="relative p-4 rounded-lg shadow-sm bg-white">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-50"></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{expert.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                      {expert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="container mx-auto max-w-4xl text-center relative">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to fill your calendar?
            </h2>
            <p className="text-xl mb-10 text-gray-300">
              Be among the first to transform your speaking business.
            </p>
            <a 
              href="https://app.speakerdrive.com/signup"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleTryFreeClick('final_cta');
              }}
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span className="mr-2">✨</span>
              Try SpeakerDrive Free
            </a>
            <p className="text-sm text-gray-400 mt-6">
              No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Simple Thin Footer */}
      <footer className="bg-gray-900 text-gray-400 py-4 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="mb-2 sm:mb-0">© 2025 SpeakerDrive. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Popup Modal with MP4 */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handlePopupClose}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden flex flex-col">
            <button
              onClick={handlePopupClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="overflow-y-auto flex-1 scroll-smooth">
              <div className="p-4 md:p-6 pb-2 md:pb-4 text-center bg-white">
                <h3 className="text-lg md:text-xl">
                  <strong>How To Use The List</strong> (🎬 2:41 seconds)
                </h3>
              </div>
              
              {/* Video container with HTML5 player */}
              <div className="w-full bg-gray-100 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                  {videoError ? (
                    // Error fallback
                    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 my-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Video couldn't load
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>There was an issue loading the video. Here's what it covers:</p>
                            <ul className="mt-2 list-disc list-inside space-y-1">
                              <li>How to browse event opportunities</li>
                              <li>Clicking events to reveal contact details</li>
                              <li>Using the emails for direct outreach</li>
                            </ul>
                            <p className="mt-3 font-semibold">You can still access the list below!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // HTML5 Video Player
                    <div className="relative rounded-lg overflow-hidden bg-black">
                      <video
                        ref={videoRef}
                        className="w-full"
                        controls
                        playsInline
                        preload="metadata"
                        poster="/video-thumbnail.png"
                      >
                        <source 
                          src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/689a09dfaf2898fb395ebce7.mp4" 
                          type="video/mp4" 
                        />
                        {/* Fallback for browsers that don't support MP4 */}
                        <p className="text-white text-center p-4">
                          Your browser doesn't support HTML5 video. 
                          <a 
                            href="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/689a09dfaf2898fb395ebce7.mp4" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            Click here to watch the video
                          </a>
                        </p>
                      </video>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="p-6 md:p-8 text-center bg-gradient-to-b from-white to-gray-50">
                <p className="text-base md:text-lg text-gray-700 mb-6">
                  Click The Button Below To Access Your List 🎉
                </p>
                
                <a
                  href="https://airtable.com/appnizVdwMfOgz1gT/shrZIOIYhYfjQdqli"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleAccessListClick}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ACCESS THE LIST
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                
                <p className="mt-4 text-sm text-gray-500">
                  The list opens in a new tab - come back here anytime!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setScreenshotModal(null)}
          />
          
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setScreenshotModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            <img 
              src={screenshotModal.src} 
              alt={screenshotModal.alt}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
            
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {screenshotModal.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}