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
    const initializeForm = async () => {
      if (!isOpen || typeof window === 'undefined') return;

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
      if (typeof window !== 'undefined') {
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Join The Waitlist</h2>
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

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="pb-0">
          <HeroSimple onWaitlistClick={() => setIsModalOpen(true)} />
        </section>
      </main>

      <Footer5 />
      <WaitlistModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}