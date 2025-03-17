"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { useRef } from "react";

// Basic fade/slide for single elements
const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Left image float in
const floatLeft = {
  hidden: { opacity: 0, x: -60, y: 20 }, // Start from below but not too far
  visible: {
    opacity: 1,
    x: 0, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

// Right image float in
const floatRight = {
  hidden: { opacity: 0, x: 60, y: 20 }, // Start from below but not too far
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  float: {
    y: [0, -8, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

// Export cards animation - reduced size and opacity
const exportCardsAnimation = {
  hidden: { 
    opacity: 0.6, 
    y: 15, 
    scale: 0.94, // Made smaller
  },
  visible: { 
    opacity: 0.8, // More transparent
    y: 0, 
    scale: 0.94, // Kept small in visible state
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
  float: {
    y: [0, -3, 0], // Reduced motion range further
    transition: {
      duration: 3, 
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    }
  }
};

export function Hero() {
  const MotionLink = motion(Link);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  const rotateX = useTransform(scrollYProgress, [0.75, 1], [15, 0]);

  return (
    <div className="px-4 pb-6 pt-16 sm:pb-12 sm:pt-20" ref={containerRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Grid with left image / center text / right image */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] gap-4 relative">
          {/* LEFT FLOATING IMAGE - hidden below lg */}
          <div className="hidden lg:flex lg:justify-center lg:items-center pt-6">
            <motion.div
              className="relative -mt-8"
              variants={floatLeft}
              initial="hidden"
              animate="visible"
              style={{ zIndex: 10 }}
            >
              {/* Once visible, do the float animation. */}
              <motion.div variants={floatLeft} animate="float">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-full blur-xl" />
                <img
                  src="/Left Hero-mh.png"
                  alt="Speaker contact cards"
                  className="max-w-full h-auto w-10/12 mx-auto"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* CENTER CONTENT */}
          <div className="flex flex-col items-center justify-start relative">
            {/* Export Cards SVG - Made smaller */}
            <motion.div
              className="mx-auto mb-6 w-64 max-w-full relative"
              variants={exportCardsAnimation}
              initial="hidden"
              animate={["visible", "float"]}
              whileHover="hover"
              transition={{ delay: 0.1 }}
              style={{ zIndex: 5 }}
            >
              {/* Add subtle shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/20 to-transparent"
                animate={{
                  x: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 3,
                  ease: "linear",
                  repeat: Infinity,
                }}
              />
              <img 
                src="/export_cards.svg" 
                alt="Export Cards" 
                className="w-full h-auto"
              />
              
              {/* No overlay - removed the white box outline */}
            </motion.div>

            {/* Small label/pill - Now with ENHANCED borders and shadow */}
            <motion.a
              href="#"
              className="group flex items-center overflow-hidden rounded-full border-2 border-gray-300 shadow-md mx-auto mb-8 w-auto bg-white"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ zIndex: 20 }}
            >
              <span className="flex h-full items-center font-medium text-green-600 px-3 py-1.5 text-sm border-r-2 border-gray-300 bg-white">
                New!
              </span>
              <span className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white">
                For Speakers, Coaches &amp; Experts
                <span className="text-xs ml-1">🎉</span>
                <ChevronRight className="h-4 w-4 ml-1 text-gray-400" />
              </span>
            </motion.a>

            {/* Animated Headline */}
            <div className="relative mb-4">
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-transparent via-brand-blue/5 to-transparent blur-lg" />
              <TextEffect
                as="h1"
                // Now uses default preset="fade-in-blur" unless you override
                className="text-balance text-center text-3xl sm:text-5xl font-extrabold text-black max-w-3xl"
                speedReveal={1.2}
                speedSegment={0.6}
                delay={0.2}
                per="char"
              >
                Find Premium Events And Book More Gigs
              </TextEffect>
            </div>

            {/* Subheading with custom handwritten underline */}
            <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-lg max-w-xl mx-auto mb-6 text-center">
              Discover the <span className="relative inline-block handwritten-underline">fastest</span> way to book your next engagement
            </p>

            {/* Enhanced CTA Button with more "clickable" feel */}
            <MotionLink
              href="/"
              className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-bold shadow-md"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Get started. It's FREE! <ArrowRight className="ml-2 h-5 w-5" />
            </MotionLink>
            
            {/* No credit card text */}
            <p className="mt-3 text-neutral-600 text-sm">
              Start Free Trial. No credit card needed.
            </p>
          </div>

          {/* RIGHT FLOATING IMAGE - hidden below lg */}
          <div className="hidden lg:flex lg:justify-center lg:items-center pt-6">
            <motion.div
              className="relative -mt-8"
              variants={floatRight}
              initial="hidden"
              animate="visible"
              style={{ zIndex: 10 }}
            >
              <motion.div variants={floatRight} animate="float">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-bl from-brand-blue/20 to-transparent rounded-full blur-xl" />
                <img
                  src="/Right Hero-mh.png"
                  alt="Speaker contact cards"
                  className="max-w-full h-auto w-10/12 mx-auto"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* NEW HERO IMAGE BELOW */}
        <div className="mt-10 sm:mt-16">
          <div className="relative mx-auto max-w-screen-lg [perspective:1000px]">
            <motion.div
              className="relative aspect-video w-full rounded-xl lg:rounded-2xl overflow-hidden"
              style={{ rotateX }}
            >
              <img
                src="/new_hero_image.png"
                alt="SpeakerDrive dashboard overview"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div
              className="absolute inset-x-0 -bottom-0 -mx-10 h-2/4 bg-gradient-to-t from-white to-transparent"
              aria-hidden="true"
            />
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
          /* Add pencil-like texture with a light, subtle pattern */
          background-image: repeating-linear-gradient(
            90deg,
            #696969,
            #696969 2px,
            #7A7A7A 2px,
            #7A7A7A 4px
          );
        }
      `}</style>
    </div>
  );
}