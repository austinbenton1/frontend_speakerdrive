"use client";
import { HeroSimple } from "@/components/sections/HeroSimple";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Import FAQ items
const PRICING_FAQ_ITEMS = [
  {
    question: "Is SpeakerDrive in Beta?",
    answer:
      "Yes, SpeakerDrive is currently in beta. Early adopters lock in our special introductory rates which will increase after official launch. Beta users also help shape our roadmap, receive priority support, and get access to new features as they're released."
  },
  {
    question: "What is a Lead Cool-Off Period?",
    answer:
      "We've built in an automatic rest period for contacts, temporarily removing them from the SpeakerDrive pool to prevent over-exposure to outreach attempts. This protects both the recipients' experience and ensures your messages maintain their impact and effectiveness."
  },
  {
    question: "How does the Lead Quality Guarantee work?",
    answer:
      "If you discover a lead has invalid contact information or substantially inaccurate data, simply rate it as \"Poor\" with the specific reason. We'll automatically refund your credit. Subject to our fair use policy to prevent abuse while maintaining data quality for all users."
  },
  {
    question: "What are Recently Added Leads?",
    answer:
      "Newly discovered opportunities added to our database. This feature is designed to give premium users exclusive access to the freshest opportunities."
  },
  {
    question: "How do Bulk Exports work?",
    answer:
      "While basic users can download leads one at a time, Bulk Exports allow you to select and export multiple leads simultaneously in CSV or Excel format with a single click."
  },
  {
    question: "What integrations do you offer?",
    answer:
      "SpeakerDrive provides webhook functionality that allows you to push leads to most CRMs, email tools or marketing automation platforms. If you have specific integration questions, please reach out to our support team."
  }
];

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
                  Get Early Access
                </h2>
                <p className="text-gray-600">And help shape the future of SpeakerDrive</p>
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
        <section className="container mx-auto max-w-4xl px-4 py-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
          {/* Left Column - Headline, Subheadline, CTA */}
          <div className="w-full lg:w-1/2">
            <div className="max-w-lg">
              <div>
                {/* Line 1: SpeakerDrive is coming very soon! [no icon] */}
                <motion.p
                  className="text-lg text-green-700 font-semibold mb-2"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  SpeakerDrive is coming very soon!
                </motion.p>

                {/* Line 2: Join Our Pre-Launch Group */}
                <motion.h1
                  className="text-3xl sm:text-4xl font-extrabold text-black leading-[1.2] mb-4"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  Join Our Pre-Launch Group 🚀
                </motion.h1>

                {/* Line 3: Shape the future... */}
                <motion.p
                  className="text-base sm:text-lg font-medium text-neutral-700 mb-6"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Shape the future of SpeakerDrive
                </motion.p>

                {/* CTA Button */}
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300"
                  style={{ cursor: 'pointer' }}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span>Reserve My Spot</span>
                  <svg
                    className="ml-2 w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </motion.button>

                {/* Minor note below the CTA */}
                <motion.p
                  className="mt-3 text-sm text-neutral-600"
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  And lock in a lifetime discount
                </motion.p>
              </div>
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
              Help Shape Our Future
            </h2>
            <p className="leading-relaxed max-w-2xl">
              We're looking for a small group of people to join us in the final stretch before our official launch. As a pre-launch member, you'll get early access to all features, a lifetime discount, and a personal strategy session with our founder. Spots are limited!
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="max-w-2xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-blue-100/30 to-blue-50/20 blur-3xl -z-10 opacity-70"></div>
              <div className="relative">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                  Common questions we get
                </p>
              </div>
            </div>

            {/* FAQ Accordion */}
            <Accordion className="space-y-3" transition={{ duration: 0.2, ease: "easeInOut" }}>
              {PRICING_FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
                >
                  <AccordionTrigger className="w-full">
                    <div className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center gap-3 px-5 py-4 w-full hover:bg-gray-50/80 transition-colors">
                        <div className="flex-1">
                          <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-900 transition-colors pr-6">
                            {item.question}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                            <svg
                              className="w-4 h-4 text-gray-500 transform transition-transform group-data-[state=open]:rotate-180"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <div className="relative">
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent rounded-lg blur-md opacity-0 group-data-[state=open]:opacity-100 transition-opacity"></div>
                      <p className="relative text-gray-600 leading-relaxed text-sm">
                        {item.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Founder Message */}
          <div className="max-w-2xl mx-auto mt-16 px-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="/austin_benton_head.png"
                    alt="Austin Benton"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Austin Benton</h3>
                    <p className="text-base text-gray-600">Founder, SpeakerDrive</p>
                  </div>
                </div>
                <div className="text-base text-gray-700 leading-relaxed">
                  I'd love to personally show you what we've built and discuss how it can help you book more premium speaking engagements.
                </div>
                <a
                  href="https://www.linkedin.com/in/austin-benton/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0A66C2] text-white rounded-lg font-semibold hover:bg-[#004182] transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                  Connect with me on LinkedIn
                </a>
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
