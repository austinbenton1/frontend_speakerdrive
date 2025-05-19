"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const bannerState = localStorage.getItem('notificationBannerVisible');
    if (bannerState !== null) {
      setIsVisible(JSON.parse(bannerState));
    }

    const handleScroll = () => {
      // Show banner after scrolling just a bit (50px)
      const shouldShow = window.scrollY > 50;
      setShowBanner(shouldShow);
    };

    handleScroll(); // Check initial scroll position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('notificationBannerVisible', 'false');
  };

  return (
    isVisible && showBanner && (
      <div 
        className="fixed top-0 left-0 right-0 z-[999] bg-[#3B82F6] transition-all duration-300"
        style={{
          transform: `translateY(${showBanner ? '0' : '-100%'})`,
          opacity: showBanner ? 1 : 0
        }}
      >
        <div className="relative flex items-center justify-center px-4 py-1.5 sm:py-2 min-h-[36px] sm:min-h-[42px]">
            {/* Regular text for larger screens */}
            <p className="hidden sm:block text-white text-center text-sm md:text-base font-medium">
              🚀 SpeakerDrive launches soon! Secure early access + lifetime discount.{' '}
              <Link 
                href="/coming-soon"
                className="inline-flex items-center text-white hover:text-white/90 underline underline-offset-2"
              >
                Learn More →
              </Link>
            </p>

            {/* Condensed text for mobile */}
            <p className="block sm:hidden text-white text-center text-sm">
              🚀 SpeakerDrive launches soon!{' '}
              <Link 
                href="/coming-soon"
                className="inline-flex items-center text-white hover:text-white/90 underline underline-offset-2"
              >
                Learn More →
              </Link>
            </p>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-2 p-1.5 text-white/80 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
        </div>
      </div>
    )
  );
}