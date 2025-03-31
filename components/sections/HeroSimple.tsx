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
              SpeakerDrive Is Coming Soon
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
              Secure Your Early Access And Get Exclusive Perks
            </TextEffect>
          </div>

          {/* Subheading */}
          <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-lg max-w-xl mx-auto mb-6 text-center">
            Get 30% off forever when we go live + early access to the BEST opportunities. Limited to first 50 early adopters.
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
            Secure Your Spot <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>

          {/* No credit card text */}
          <p className="mt-3 text-neutral-600 text-sm">And be the first to know when we launch.</p>

          {/* Founder's Message Section */}
          <div className="mt-20 max-w-2xl mx-auto px-6 sm:px-8">
            <div className="flex flex-col gap-6">
              {/* Clearer quote icon */}
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-[#0A66C2]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 13a4 4 0 0 1-4 4h4V9H2a4 4 0 0 1 4 4zm10 0a4 4 0 0 1-4 4h4V9h-4a4 4 0 0 1 4 4z"/>
              </svg>

              <h3 className="text-2xl font-bold text-gray-900">Why I Created SpeakerDrive</h3>

              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>
                  I built SpeakerDrive to help experts book high-paying stages consistently and with confidence.
                </p>
                <p>
                  The speaking landscape has become increasingly challenging - a saturated market, fierce competition for limited opportunities, and the constant struggle to find quality, well-paying engagements.
                </p>
                <p>
                  Join our early access group to get a systematic approach to finding decision-makers and premium opportunities - without relying on random referrals, social media algorithms, or writing another book.
                </p>
              </div>

              <div className="flex items-center mt-2">
                <img
                  src="/austin_benton_head.png"
                  alt="Austin Benton"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 mr-4"
                />
                <div className="flex flex-col">
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
          </div>
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