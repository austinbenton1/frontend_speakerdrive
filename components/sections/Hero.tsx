"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { useRef, useEffect, useState, type CSSProperties } from "react";

// Extend Window interface for affiliate tracking
declare global {
  interface Window {
    affiliateId?: string | null;
  }
}

// Adjusted animations for dramatic fly-in for left/right images
const floatLeft = {
  hidden: { opacity: 0, x: -100, y: 50 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.2, ease: "easeInOut" },
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
};

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Export cards entrance (the small float is the CSS .sd-float class)
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
};

// Up-and-down float, run by the browser instead of JS (see .sd-float in globals.css)
const floatStyle = (distance: string, seconds: number) =>
  ({ "--float-y": distance, "--float-time": `${seconds}s` }) as CSSProperties;

export function Hero() {
  const MotionLink = motion(Link);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [signupUrl, setSignupUrl] = useState('https://app.speakerdrive.com/signup');

  // Adjusted scroll behavior: starts at 35° and ends fully upright (0°).
  // Same range framer's ["start start", "end end"] gave (hero top at screen top
  // -> hero bottom at screen bottom), measured here so it can have a 120px
  // floor. Without it, once the hero is about as tall as the screen the range
  // collapses or runs backwards: 1080p monitors flipped the shot flat in a few
  // pixels, and bigger monitors and big phones tilted it back as you scrolled.
  const { scrollY } = useScroll();
  const tiltRange = useRef<[number, number]>([0, 1]);
  const tiltAt = (y: number) => {
    const [start, end] = tiltRange.current;
    const progress = Math.min(1, Math.max(0, (y - start) / (end - start)));
    return 35 * (1 - progress);
  };
  const rotateX = useTransform(scrollY, tiltAt);

  useEffect(() => {
    const hero = containerRef.current;
    if (!hero) return;
    const measure = () => {
      const start = hero.getBoundingClientRect().top + window.scrollY;
      const end = start + hero.offsetHeight - document.documentElement.clientHeight;
      tiltRange.current = [start, Math.max(end, start + 120)];
      rotateX.set(tiltAt(window.scrollY));
    };
    measure();
    // Re-measure when the hero's own size changes (images, fonts) or the window resizes
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);
    window.addEventListener("resize", measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for affiliate ID changes and update signup URL
  useEffect(() => {
    const updateSignupUrl = () => {
      const baseUrl = 'https://app.speakerdrive.com/signup';
      if (typeof window !== 'undefined' && window.affiliateId) {
        setSignupUrl(`${baseUrl}?ref=${window.affiliateId}`);
      } else {
        setSignupUrl(baseUrl);
      }
    };

    // Check immediately
    updateSignupUrl();

    // Set up interval to check for changes
    const interval = setInterval(updateSignupUrl, 100);

    return () => clearInterval(interval);
  }, []);

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
    // overflow-x-clip: the hero shot is wider than the screen on purpose (sm:w-[120%]),
    // which let iPads scroll the whole page sideways. Clip trims the spill at the
    // screen edge without making a scroll box.
    <div className="px-4 pt-16 sm:pt-20 pb-0 overflow-x-clip" ref={containerRef}>
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
              <div className="sd-float" style={floatStyle("-8px", 3)}>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-full blur-xl" />
                <img
                  src="/Left Hero-mh.png"
                  alt="Speaker contact cards"
                  className="max-w-full h-auto w-10/12 mx-auto"
                />
              </div>
            </motion.div>
          </div>

          {/* CENTER CONTENT */}
          <div className="flex flex-col items-center justify-start relative">
            {/* Export Cards SVG - shown only on mobile */}
            <motion.div
              className="block lg:hidden mx-auto mb-6 w-64 max-w-full relative transform-gpu"
              variants={exportCardsAnimation}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
              style={{ zIndex: 5 }}
            >
              <div className="sd-float" style={floatStyle("-3px", 3)}>
                {/* export_cards.svg drawn once at 3x phone size: 15 KB instead of 3.5 MB */}
                <img
                  src="/export-cards.webp"
                  alt="Export Cards"
                  width={768}
                  height={222}
                  className="w-full h-auto"
                />
              </div>
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
                For Speakers &amp; Experts
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
                Find Events And Get Booked To Speak
              </TextEffect>
            </div>

            {/* Subheading */}
            <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-lg max-w-xl mx-auto mb-6 text-center">
              Every gig in one place. Go straight to the decision-makers with real budgets. {" "}
              <span className="relative inline-block handwritten-underline">Authentic</span> outreach in one click.
            </p>

            {/* Enhanced CTA Button */}
            <motion.a
              href={signupUrl}
              className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-bold shadow-md"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Get Started. It's FREE <span className="ml-2">🚀</span>
            </motion.a>

            {/* No credit card text */}
            <p className="mt-3 text-neutral-600 text-sm">No credit card needed.</p>
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
              <div className="sd-float" style={floatStyle("-8px", 3.5)}>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-bl from-brand-blue/20 to-transparent rounded-full blur-xl" />
                <img
                  src="/Right Hero-mh.png"
                  alt="Speaker contact cards"
                  className="max-w-full h-auto w-10/12 mx-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* MAIN HERO IMAGE */}
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

        {/* MOBILE SCROLL INDICATOR - Removed as we'll have content below now */}
      </div>

      {/* CSS for the handwritten underline effect and gradient animation */}
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
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}