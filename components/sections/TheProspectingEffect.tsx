"use client";

import { motion } from "framer-motion";

export function TheProspectingEffect() {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Main headline */}
        <motion.h2
          className="text-center text-3xl sm:text-4xl font-extrabold text-black max-w-3xl mx-auto mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Prospecting Effect
        </motion.h2>

        {/* Center + sub-headline style for "Relying on word-of-mouth..." */}
        <motion.p
          className="text-center text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Relying on word-of-mouth alone puts your business growth at the mercy of others.
        </motion.p>

        {/* Example content area */}
        <motion.div
          className="bg-gray-100 rounded-lg p-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-gray-600">
            [Imagine a graphic or short explanation here...]
          </p>
        </motion.div>

        {/* Final hyperlink to /signup */}
        <div className="text-center mt-10">
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-800 text-lg font-medium underline"
          >
            Start your SpeakerDrive free trial today.
          </a>
        </div>
      </div>
    </section>
  );
}
