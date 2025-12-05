"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";

export default function AutopilotPage() {
  // Affiliate tracking (matching pricing page logic)
  const [ctaUrl, setCtaUrl] = useState('https://app.speakerdrive.com/signup');

  useEffect(() => {
    const updateCtaUrl = () => {
      const baseUrl = 'https://app.speakerdrive.com/signup';
      if (typeof window !== 'undefined' && window.affiliateId) {
        setCtaUrl(`${baseUrl}?ref=${window.affiliateId}`);
      } else {
        setCtaUrl(baseUrl);
      }
    };

    updateCtaUrl();
    const interval = setInterval(updateCtaUrl, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col">
        {/* Header */}
        <HeaderFinal
          companyName="SpeakerDrive"
          logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
        />

        <main className="pt-16">
          {/* Hero Section */}
          <section className="pt-4 pb-8 md:pt-6 md:pb-12">
            <div className="mx-auto max-w-4xl px-4">

              {/* Eyebrow */}
              <p className="text-center text-sm font-semibold tracking-widest text-gray-500 uppercase mb-4">
                Autopilot Is Live!
              </p>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-4 text-gray-900 tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">1 Month</span> Of Outreach
                <br />
                In 2 Minutes
              </h1>

              {/* Subhead */}
              <p className="text-lg md:text-xl text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                Load your leads. Autopilot does the rest.
              </p>

              {/* Video Container */}
              <div className="relative mb-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-black">
                <div className="aspect-video">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/69331c5f1ec8833a5bc83316.png"
                    preload="metadata"
                  >
                    <source
                      src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/69331b3ec9bfbb0a790c0e85.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <Link
                  href={ctaUrl}
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-all font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  Try Autopilot Free 🚀
                </Link>
                <p className="text-gray-500 text-sm mt-4">
                  No credit card required
                </p>
              </div>

            </div>
          </section>
        </main>

        <Footer5 />
      </div>
    </div>
  );
}