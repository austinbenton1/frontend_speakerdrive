// Mark as client component
"use client"

import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { useEffect } from "react";

export default function ContactPage() {
  // Initialize AidaForm script
  useEffect(() => {
    if (typeof window !== 'undefined') {
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
        {/* Contact Form Section */}
        <section className="relative bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* AidaForm Embed */}
            <div 
              className="relative min-h-[700px]"
              data-aidaform-app="form202405" 
              data-url="https://speakerdrive.aidaform.com/speakerdrive-main-website" 
              data-width="100%" 
              data-height="500px" 
              data-do-resize>
            </div>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}