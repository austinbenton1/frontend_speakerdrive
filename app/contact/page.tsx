// Mark as client component
"use client"

import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
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
        <section className="relative bg-white py-12 sm:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
              {/* Decorative gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-transparent"></div>
              
              <div className="p-8 sm:p-12">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Contact Us
                  </h2>
                  <p className="mt-4 text-gray-600 max-w-2xl">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                {/* AidaForm Embed */}
                <div 
                  className="relative z-10"
                  data-aidaform-app="form202405" 
                  data-url="https://speakerdrive.aidaform.com/speakerdrive-main-website" 
                  data-width="100%" 
                  data-height="500px" 
                  data-do-resize>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview Section */}
        <section className="bg-gray-50 py-16 sm:py-24 border-t border-gray-100">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center relative">
              {/* Decorative background element */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-100/20 via-blue-500/10 to-purple-100/20 rounded-lg blur-3xl opacity-50 -z-10"></div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Can't find the answer you're looking for?{' '}
                <a 
                  href="mailto:support@speakerdrive.com" 
                  className="inline-flex items-center text-brand-blue hover:text-blue-700 font-medium transition-colors"
                >
                  Contact our support team
                  <svg 
                    className="ml-1 h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}