"use client";
import { HeroSimple } from "@/components/sections/HeroSimple";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Initialize AidaForm script
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const script = document.createElement("script");
      script.id = "aidaform-app";
      script.src = "https://widget.aidaform.com/embed.js";
      document.head.appendChild(script);
    }

    return () => {
      if (typeof window !== 'undefined') {
        const script = document.getElementById("aidaform-app");
        if (script) {
          script.remove();
        }
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] sm:w-[90%] max-w-xl z-50 bg-white rounded-xl shadow-xl p-4 sm:p-6 mx-4 sm:mx-0"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join The Waitlist</h2>
              <p className="text-gray-600">Be the first to know when we launch.</p>
            </div>
            <div 
              data-aidaform-app="form202405" 
              data-url="https://thinkbiginbound.aidaform.com/speakerdrive-pre-launch" 
              data-width="100%" 
              data-height="450px"
              data-do-resize
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function ComingSoonPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="pb-0">
          <HeroSimple onWaitlistClick={() => setIsModalOpen(true)} />
        </section>
      </main>

      <Footer5 />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}