"use client"

import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { useEffect } from "react";

export default function DemoPage() {
  // Initialize TidyCal script
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement("script");
      script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      if (typeof window !== 'undefined') {
        const script = document.querySelector('script[src="https://asset-tidycal.b-cdn.net/js/embed.js"]');
        if (script) {
          script.remove();
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <HeaderFinal
        companyName="SpeakerDrive"
        logo={
          <img
            src="/SpeakerDrive Logo - Long.png"
            alt="SpeakerDrive"
            className="h-8"
          />
        }
      />

      <main className="pt-24">
        {/* Demo Scheduling Section */}
        <section className="relative bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                Schedule a Demo
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Book a time to see how SpeakerDrive can help you find and book more speaking opportunities.
              </p>
            </div>

            {/* TidyCal Embed */}
            <div className="tidycal-embed" data-path="austinbenton/speakerdrive"></div>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}