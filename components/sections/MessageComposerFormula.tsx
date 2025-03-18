"use client";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

// Subtle fade-in animation
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const downArrowAnimation = {
  y: [0, 5, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut",
  },
};

export function MessageComposerFormula() {
  return (
    <section className="py-20 pb-0 bg-stone-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Main heading */}
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">
            Ultra Personalized Messaging
          </h2>
          {/* Updated text here */}
          <p className="text-left md:text-center text-lg sm:text-xl font-medium text-gray-700 leading-relaxed max-w-lg md:mx-auto">
            Craft conversation-starting messages
          </p>
        </motion.div>

        {/* White box for “Smart, Real-Time Matching” */}
        <div className="max-w-[900px] mx-auto mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-8">
          <div className="flex items-center text-left md:justify-center md:text-center mb-4">
            <div className="w-7 h-7 mr-3 flex items-center justify-center">
              <Zap className="w-5 h-5 text-brand-blue" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Smart, Real‑Time Matching
            </h3>
          </div>
          <p className="text-left md:text-center text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg md:mx-auto">
            We meticulously analyze your expertise, event specifics, and
            decision‑maker priorities to find the perfect connection.
          </p>

          <div className="mt-6">
            <video
              className="w-full h-auto rounded-2xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d8a3ab2782387e0db8bb22.mp4"
                type="video/mp4"
              />
              <p>Your browser doesn’t support HTML5 video.</p>
            </video>
          </div>
        </div>

        {/* Arrow pointing down to next section */}
        <div className="flex flex-col items-center pb-6">
          <motion.div
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg mt-6 mb-4"
            animate={downArrowAnimation}
          >
            <ArrowRight className="transform rotate-90 h-7 w-7 text-white" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
