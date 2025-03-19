"use client";

import { ArrowRight, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { useRef, useEffect } from "react";

// Adjusted animations for dramatic fly-in for left/right images
const floatLeft = {
  hidden: { opacity: 0, x: -100, y: 50 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  float: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

const floatRight = {
  hidden: { opacity: 0, x: 100, y: 50 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  float: {
    y: [0, -8, 0],
    transition: { duration: 3.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Restored export cards animation with minimized float
const exportCardsAnimation = {
  hidden: {
    opacity: 0.6,
    y: 15,
    scale: 0.94,
  },
  visible: {
    opacity: 0.8,
    y: 0,
    scale: 0.94,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  float: {
    y: [0, -3, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
  },
};

export function Hero() {
  const MotionLink = motion(Link);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Adjusted scroll behavior: starts at 35° and ends fully upright (0°)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [35, 0]);

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = ["/Left Hero-mh.png", "/Right Hero-mh.png", "/new_hero_image.png"];
      imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
      });
    };
    preloadImages();
  }, []);

  return (
    <div className="px-4 pt-16 sm:pt-20 pb-0" ref={containerRef}>
      <div className="container mx-auto max-w-6xl">
        {/* Grid with left image / center text / right image */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] gap-4 relative">
          {/* LEFT FLOATING IMAGE (hidden below lg) */}
          <div className="hidden lg:flex lg:justify-center lg:items-center pt-6">
            <motion.div
              className="relative -mt-8"
              variants={floatLeft}
              initial="hidden"
              animate="visible"
              style={{ zIndex: 10 }}
            >
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
            {/* Export Cards SVG - shown only on mobile */}
            <motion.div
              className="block lg:hidden mx-auto mb-6 w-64 max-w-full relative transform-gpu"
              variants={exportCardsAnimation}
              initial="hidden"
              animate={["visible", "float"]}
              transition={{ delay: 0.1 }}
              style={{ zIndex: 5, willChange: "transform" }}
            >
              <img src="/export_cards.svg" alt="Export Cards" className="w-full h-auto" />
            </motion.div>

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
                  <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-0.5 sm:ml-1 text-gray-400" />
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
              href="https://app.speakerdrive.com/signup"
              className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-bold shadow-md"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Get started. It's FREE! <ArrowRight className="ml-2 h-5 w-5" />
            </motion.a>

            {/* No credit card text */}
            <p className="mt-3 text-neutral-600 text-sm">Start Free Trial. No credit card needed.</p>
          </div>

          {/* RIGHT FLOATING IMAGE (hidden below lg) */}
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

        {/* MAIN HERO IMAGE */}
        {/*
          UPDATED BELOW:
          Changed mt-10 sm:mt-16 to mt-4 sm:mt-8 so the hero image is closer to the cream
        */}
        <div className="mt-4 sm:mt-8 px-0 overflow-visible">
          <div className="relative mx-auto max-w-screen-lg [perspective:1000px]">
            <motion.div
              className="relative aspect-[4/3] sm:aspect-video w-full ml-0 sm:w-[120%] sm:-ml-[10%] lg:w-[110%] lg:-ml-[5%] sm:rounded-xl lg:rounded-2xl overflow-hidden"
              style={{
                rotateX,
                transformOrigin: "center bottom",
                willChange: "transform",
                backfaceVisibility: "hidden",
                contain: "paint layout",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1.0] }}
            >
              <img
                ref={imageRef}
                src="/new_hero_image.png"
                alt="SpeakerDrive dashboard overview"
                className="w-full h-full object-cover transform-gpu scale-[1.02]"
                width={1200}
                height={675}
                loading="eager"
                decoding="sync"
                style={{ contentVisibility: "auto" }}
              />
            </motion.div>
            {/* Extended Gradient Overlay */}
            <div
              className="absolute -bottom-0 w-full ml-0 sm:w-[120%] sm:-ml-[10%] lg:w-[110%] lg:-ml-[5%] h-2/4 bg-gradient-to-t from-white to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* MOBILE SCROLL INDICATOR */}
        <div className="lg:hidden flex justify-center mt-6">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown className="h-6 w-6 text-gray-500" />
          </motion.div>
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
