"use client";

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

export function NotificationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerState = localStorage.getItem('notificationBannerVisible');
    if (bannerState !== null) {
      setIsVisible(JSON.parse(bannerState));
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('notificationBannerVisible', 'false');
  };

  return (
    isVisible && (
      <div className="sticky top-0 z-50 bg-[#3B82F6]">
        <div className="relative flex items-center justify-center px-4 py-2 min-h-[40px] md:min-h-[50px]">
            {/* Regular text for larger screens */}
            <p className="hidden sm:block text-white text-center text-sm md:text-base font-medium">
              🚀 SpeakerDrive launches soon! Secure early access + lifetime discount.{' '}
              <Link 
                href="/coming-soon"
                className="inline-flex items-center text-white hover:text-white/90 underline underline-offset-2 min-h-[44px] items-center"
              >
                Learn More →
              </Link>
            </p>

            {/* Condensed text for mobile */}
            <p className="block sm:hidden text-white text-center text-sm">
              🚀 SpeakerDrive: Early access + lifetime discount.{' '}
              <Link 
                href="/coming-soon"
                className="inline-flex items-center text-white hover:text-white/90 underline underline-offset-2 min-h-[44px] items-center"
              >
                Learn More →
              </Link>
            </p>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-2 p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
        </div>
      </div>
    )
  );
}