"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSimple({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  const MotionLink = motion(Link);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [35, 0]);

  return (
    <div className="px-4 pt-16 sm:pt-20 pb-0" ref={containerRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Center content */}
        <div className="flex flex-col items-center justify-start relative">
          {/* Small label/pill */}
          <motion.a
            href="#"
            className="group inline-flex items-center overflow-hidden rounded-full border-2 border-gray-300 shadow-md mx-auto mb-8 bg-white whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            style={{ zIndex: 20 }}
          >
            <span className="flex-none flex h-full items-center font-medium text-green-600 px-1.5 sm:px-3 py-1 sm:py-1.5 text-[12px] sm:text-sm border-r-2 border-gray-300 bg-white">
              New!
            </span>
            <span className="flex items-center gap-1 px-1.5 sm:px-3 py-1 sm:py-1.5 text-[12px] sm:text-sm font-medium text-gray-700 bg-white">
              For Speakers, Coaches &amp; Experts
              <div className="flex-none flex items-center">
                <span className="text-[11px] sm:text-xs ml-1">🎉</span>
              </div>
            </span>
          </motion.a>

          {/* Animated Headline */}
          <div className="relative mb-4">
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-transparent via-brand-blue/5 to-transparent blur-lg" />
            <TextEffect
              as="h1"
              className="text-balance text-center text-3xl sm:text-5xl font-extrabold text-black max-w-3xl"
              speedReveal={1.2}
              speedSegment={0.6}
              delay={0.2}
              per="char"
            >
              Find Premium Events And Book More Gigs
            </TextEffect>
          </div>

          {/* Subheading */}
          <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-lg max-w-xl mx-auto mb-6 text-center">
            Discover the{" "}
            <span className="relative inline-block handwritten-underline">fastest</span> way to book your next engagement
          </p>

          {/* Enhanced CTA Button */}
          <motion.a
            onClick={onWaitlistClick}
            className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-bold shadow-md"
            style={{ cursor: 'pointer' }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Join The Waitlist <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>

          {/* No credit card text */}
          <p className="mt-3 text-neutral-600 text-sm">Be the first to know when we launch.</p>
        </div>
      </div>

      {/* CSS for the handwritten underline effect */}
      <style jsx global>{`
        .handwritten-underline {
          display: inline-block;
          position: relative;
          font-weight: 600;
          color: #3a3a3a;
        }
        .handwritten-underline::after {
          content: "";
          position: absolute;
          left: -1px;
          right: -1px;
          bottom: -1px;
          height: 4px;
          background-color: #696969;
          border-radius: 1px;
          transform: rotate(0deg);
          opacity: 0.75;
          background-image: repeating-linear-gradient(
            90deg,
            #696969,
            #696969 2px,
            #7a7a7a 2px,
            #7a7a7a 4px
          );
        }
      `}</style>
    </div>
  );
}