"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const FEATURES = [
  {
    id: 'item1',
    title: 'Find Qualified Leads',
    content: 'Discover events and decision-makers actively looking for speakers and experts.',
    image: '/FIND LEADS-mh.png',
  },
  {
    id: 'item2',
    title: 'Unlock Contact Info',
    content: 'Get verified email addresses and direct application links to reach decision-makers without the gatekeepers.',
    image: '/UNLOCK INFO-mh.png',
  },
  {
    id: 'item3',
    title: 'Craft Perfect Outreach',
    content: 'Our message composer creates personalized messages designed to start meaningful conversations.',
    image: '/CRAFT OUTREACH-mh.png',
  },
];

export function FeatureAccordion() {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0].id);

  return (
    <div className="px-4 py-16 sm:py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto max-w-screen-lg">
        <div className="mx-auto mb-10 text-left">
          <h2 className="text-2xl md:text-3xl font-medium text-black mb-4">How SpeakerDrive Works</h2>
          <p className="text-neutral-700 max-w-3xl mb-6">
            SpeakerDrive streamlines your business development process with our powerful three-step system that helps you find opportunities, connect directly with decision-makers, and secure more bookings.
          </p>
        </div>
        
        <div className="mx-auto flex flex-col lg:flex-row gap-8 lg:gap-20">
          {/* Left side - Accordion buttons */}
          <div className="w-full lg:w-2/5">
            <div className="space-y-5">
              {FEATURES.map((feature) => (
                <div key={feature.id} className="overflow-hidden rounded-xl shadow-sm">
                  <button
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-6 py-5 text-left transition-all duration-300",
                      activeFeature === feature.id
                        ? "bg-brand-blue text-white"
                        : "bg-white hover:bg-neutral-100 text-black border border-neutral-200"
                    )}
                  >
                    <span className="text-base font-medium">{feature.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-300",
                        activeFeature === feature.id ? "rotate-180" : ""
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {activeFeature === feature.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden px-6 py-4 bg-white border border-t-0 border-neutral-200 rounded-b-lg text-neutral-800"
                      >
                        {feature.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Feature image */}
          <div className="w-full lg:w-3/5 mt-6 lg:mt-0">
            <div className="relative h-[450px] sm:h-[500px] overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-md">
              {FEATURES.map((feature) => (
                <AnimatePresence key={feature.id} initial={false}>
                  {activeFeature === feature.id && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center p-2"
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-full object-contain object-center"
                          style={{ filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))" }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}