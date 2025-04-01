"use client";
import { HeroSimple } from "@/components/sections/HeroSimple";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function WaitlistModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // Initialize AidaForm script
  useEffect(() => {
    const initializeForm = async () => {
      if (!isOpen || typeof window === "undefined") return;

      // Remove any existing instances
      const existingScript = document.getElementById("aidaform-app");
      if (existingScript) {
        existingScript.remove();
      }

      // Create and add new script
      const script = document.createElement("script");
      script.id = "aidaform-app";
      script.src = "https://widget.aidaform.com/embed.js";

      // Wait for script to load then initialize
      script.onload = () => {
        if (window.AidaForm) {
          window.AidaForm.embed();
        }
      };

      document.head.appendChild(script);
    };

    initializeForm();

    return () => {
      if (typeof window !== "undefined") {
        const script = document.getElementById("aidaform-app");
        if (script) {
          script.remove();
          // Clean up any existing form instances
          if (window.AidaForm) {
            window.AidaForm.reset();
          }
        }
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-[calc(100%-2rem)] sm:w-[90%] max-w-xl bg-white rounded-xl shadow-xl p-4 sm:p-6 m-4"
            >
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Join The Waitlist
                </h2>
                <p className="text-gray-600">Be the first to know when we launch.</p>
              </div>
              <div
                data-aidaform-app="form202405"
                data-url="https://thinkbiginbound.aidaform.com/speakerdrive-pre-launch"
                data-width="100%"
                data-height="500px"
                data-do-resize
              />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ComingSoonPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle modal close with cleanup
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
        hideNavigation={true}
      />

      <main className="pt-24">
        {/* Hero Section (Text first on mobile, 50/50 on desktop) */}
        <section className="container mx-auto max-w-5xl px-4 py-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column - Headline, Subheadline, CTA */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
              <HeroSimple onWaitlistClick={() => setIsModalOpen(true)} />
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <img
              src="/coming_soon_dashboard.png"
              alt="SpeakerDrive Dashboard Preview"
              className="w-full h-auto max-w-2xl object-contain"
            />
          </div>
        </section>

        {/* "Be Part of Our Launch Journey" Section */}
        <section className="container mx-auto max-w-3xl px-4 py-12 space-y-8 text-gray-700">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Be Part of Our Launch Journey
            </h2>
            <p className="leading-relaxed">
              SpeakerDrive is almost ready for launch, and we're inviting a select
              group of speakers and experts to join us in the final stretch.
            </p>
          </div>

          <div className="space-y-3 leading-relaxed">
            <p className="font-medium">Your early access includes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>First look at our platform features</li>
              <li>Input on final refinements</li>
              <li>30% lifetime discount as thanks for your participation</li>
              <li>Strategy session with the founder</li>
            </ul>
          </div>
        </section>

        {/* Quote & Founder Info at the Bottom */}
        <section className="container mx-auto max-w-3xl px-4 py-8">
          <div className="space-y-6 text-left text-gray-700 leading-relaxed">
            <p>
              The speaking landscape has become increasingly challenging — saturated
              markets, fierce competition, and the struggle to find quality, paying
              gigs.
            </p>
            <p>
              I can't wait to show you what we've built and hear how we can make it
              even better.
            </p>

            {/* Founder Profile (left-justified on mobile & desktop) */}
            <div className="mt-6 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              <img
                src="/austin_benton_head.png"
                alt="Austin Benton"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
              />
              <div>
                <p className="text-base font-semibold text-gray-900">Austin Benton</p>
                <p className="text-sm text-gray-600">Founder, SpeakerDrive</p>

                {/* LinkedIn link */}
                <div className="flex items-center gap-2 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-[#0A66C2]"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                  </svg>
                  <a
                    href="https://www.linkedin.com/in/austin-benton/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-[#0A66C2] hover:text-blue-800 transition-colors"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer5 />
      <WaitlistModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
