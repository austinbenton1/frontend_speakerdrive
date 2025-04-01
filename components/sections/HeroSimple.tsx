"use client";

import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function HeroSimple({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [35, 0]);

  return (
    <div ref={containerRef}>
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

      {/* Line 2: Join Our Early Access Group */}
      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-black leading-[1.2] mb-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        Join Our Early Access Group
      </motion.h1>

      {/* Line 3: Shape the future... */}
      <motion.p
        className="text-base sm:text-lg font-medium text-neutral-700 mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        Shape the future of SpeakerDrive + lock in 30% off forever. Limited spots available.
      </motion.p>

      {/* CTA Button */}
      <motion.button
        onClick={onWaitlistClick}
        className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-semibold shadow-md hover:shadow-xl transition-all duration-300"
        style={{ cursor: 'pointer' }}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Reserve Your Access
        <ArrowRight className="ml-2 h-5 w-5" />
      </motion.button>

      {/* Minor note below the CTA */}
      <motion.p
        className="mt-3 text-neutral-600 text-sm"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        And be the first to know when we launch.
      </motion.p>
    </div>
  );
}
