"use client";

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Suspense } from 'react'

// Type definitions
type EventData = Record<string, any>;

export default function FiveKVideoPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStartTime, setVideoStartTime] = useState<number | null>(null);
  const [screenshotModal, setScreenshotModal] = useState<{src: string; alt: string} | null>(null);

  // Generate or retrieve session ID
  const getSessionId = () => {
    if (typeof window === 'undefined') return 'ssr-placeholder';
    
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'pending-client-init';
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const realId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', realId);
        return realId;
      }
    }
    return sessionId;
  };

  // Initialize session ID after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem('sessionId')) {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem('sessionId', sessionId);
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
      if (typeof window === 'undefined') return;
      
      const payload = {
        event: eventType,
        timestamp: new Date().toISOString(),
        sessionId: getSessionId(),
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        scrollDepth: getScrollDepth(),
        ...eventData
      };

      fetch('https://n8n.speakerdrive.com/webhook/lander', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(err => {
        // Silently fail
      });
    } catch (error) {
      // Silently fail
    }
  };

  // Wrapper for button clicks
  const trackButtonClick = (buttonName: string, additionalData: EventData = {}) => {
    trackEvent('button_click', {
      button: buttonName,
      ...additionalData
    });
  };

  // Video tracking
  const trackVideoEvent = (action: string, additionalData: EventData = {}) => {
    const currentTime = videoRef.current?.currentTime || 0;
    const duration = videoRef.current?.duration || 316; // 5:16 = 316 seconds
    
    trackEvent('video_event', {
      videoAction: action,
      videoType: 'mp4',
      currentTime: Math.round(currentTime),
      duration: Math.round(duration),
      percentage: Math.round((currentTime / duration) * 100),
      ...additionalData
    });
  };

  // Button click handlers
  const handleTryFreeClick = (location: string) => {
    trackButtonClick('try_speakerdrive_free', { 
      location,
      page: '5k_video'
    });
    
    window.location.href = 'https://app.speakerdrive.com/signup';
  };

  const handleScreenshotClick = (screenshotName: string) => {
    trackButtonClick('view_screenshot', { 
      screenshot: screenshotName,
      location: 'faq_section',
      page: '5k_video'
    });
    
    setScreenshotModal({ 
      src: `/${screenshotName}`, 
      alt: screenshotName.replace(/-/g, ' ').replace('.png', '') 
    });
  };

  // Handle video events
  useEffect(() => {
    if (!videoRef.current) return;
    
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
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [videoStartTime]);

  // Track page load and unload
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pageLoadTime = Date.now();
      
      trackEvent('page_view', {
        pageTitle: document.title,
        pageUrl: window.location.href,
        page: '5k_video'
      });

      const handleBeforeUnload = () => {
        const timeOnPage = Math.round((Date.now() - pageLoadTime) / 1000);
        trackEvent('page_leave', {
          timeOnPage,
          finalScrollDepth: getScrollDepth(),
          page: '5k_video'
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
            milestone: `${milestone}%`,
            page: '5k_video'
          });
        }
      });
    };

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

  // Handle ESC key for screenshot modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setScreenshotModal(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (screenshotModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [screenshotModal]);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section with Video */}
        <section className="px-4 pt-12 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
          
          <div className="container mx-auto max-w-4xl relative">
            <div className="flex flex-col items-center text-center">
              {/* Custom Headline for this video */}
              <h1 className="text-3xl sm:text-5xl font-bold text-black mb-6 leading-tight max-w-3xl tracking-tight">
                How I Turned "I'll Keep You on File" Into Multiple $5K Speaking Gigs
              </h1>

              {/* Custom Subheadline for this video */}
              <p className="text-xl text-gray-600 mb-8 max-w-2xl font-normal leading-relaxed">
                Watch the exact email thread that transformed a rejection into steady bookings
              </p>

              {/* Video Container */}
              <div className="w-full max-w-3xl mb-10 rounded-xl overflow-hidden shadow-2xl bg-black">
                {videoError ? (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Video couldn't load</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>Try refreshing the page or watch directly on YouTube.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <video
                    ref={videoRef}
                    className="w-full"
                    controls
                    playsInline
                    preload="metadata"
                  >
                    <source 
                      src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/68d29b6e26b7f73f9629c573.mp4" 
                      type="video/mp4" 
                    />
                    <p className="text-white text-center p-4">
                      Your browser doesn't support HTML5 video. 
                      <a 
                        href="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/68d29b6e26b7f73f9629c573.mp4" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        Click here to watch the video
                      </a>
                    </p>
                  </video>
                )}
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href="https://app.speakerdrive.com/signup"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                    e.preventDefault();
                    handleTryFreeClick('hero');
                  }}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <div className="text-left">
                    <div className="font-medium text-base leading-tight flex items-center">
                      Try SpeakerDrive Free
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <div className="text-xs text-green-100">Instant access. No card needed.</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Same as original */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-center text-black mb-4">
              Frequently asked questions
            </h2>
            
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
                  question: 'What is SpeakerDrive?',
                  answer: (
                    <>
                      <p>SpeakerDrive is the discovery platform for professional speakers.</p>
                      <p className="mt-3">Search thousands of speaking opportunities, get verified contact info for decision-makers, and use AI-powered tools to craft personalized outreach that gets responses.</p>
                    </>
                  )
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
                      <p>SpeakerDrive is $99/month after a 7 day trial. 30 seconds to sign up. No credit card needed. No tricks, no contracts.</p>
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

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="container mx-auto max-w-4xl text-center relative">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to fill your calendar?
            </h2>
            <p className="text-xl mb-10 text-gray-300">
              Join thousands of speakers taking control of their speaking business.
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

      {/* Footer */}
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