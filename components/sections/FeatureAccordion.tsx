"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export function FeatureAccordion() {
  return (
    <div
      className="bg-stone-50 px-4 py-12 sm:py-16"
      /* We'll let this container set the background color for "How It Works" */
    >
      <div className="container mx-auto max-w-screen-lg">
        {/* Main headline */}
        <div className="max-w-3xl mx-auto text-center mb-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-black mb-4">
            How It Works
          </h2>
          <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto">
            SpeakerDrive helps speakers, coaches and experts escape the referral trap
            and predictably control their own client acquisition.
          </p>
        </div>
      </div>
    </div>
  );
}
