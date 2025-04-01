"use client";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderFinal
        companyName="SpeakerDrive"
        logo={
          <img
            src="/SpeakerDrive Logo - Long.png"
            alt="SpeakerDrive"
            className="h-8"
          />
        }
        hideNavigation={true}
      />

      <main className="flex-1">
        <div className="container mx-auto max-w-2xl px-4 py-24">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="w-16 h-16 mb-8 rounded-full bg-green-100 flex items-center justify-center mx-auto"
          >
            <span className="text-4xl" role="img" aria-label="celebration">
              🎉
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Updated Headings and Subtext */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
              Awesome!
            </h1>
            <h2 className="text-2xl font-bold text-gray-800">
              Thank You For Your Interest.
            </h2>
            <p className="text-lg text-gray-600">
              The next step is to book a call with our founder, Austin Benton.
            </p>

            {/* Primary Button for Demo */}
            <button
              onClick={() => (window.location.href = "https://www.speakerdrive.com/demo")}
              className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
            >
              Book A Demo
            </button>

            {/* Founder's Section */}
            <div className="mt-16 max-w-2xl">
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
                  <path d="M6 13a4 4 0 0 1-4 4h4V9H2a4 4 0 0 1 4 4zm10 0a4 4 0 0 1-4 4h4V9h-4a4 4 0 0 1 4 4z" />
                </svg>

                {/* Austin's Picture & Info (No LinkedIn) */}
                <div className="flex items-center">
                  <img
                    src="/austin_benton_head.png"
                    alt="Austin Benton"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="text-base font-semibold text-gray-900">
                      Austin Benton
                    </p>
                    <p className="text-sm text-gray-600">Founder, SpeakerDrive</p>
                  </div>
                </div>

                {/* Replaced Heading */}
                <h4 className="text-xl font-semibold text-gray-800">
                  “There must be a better way…”
                </h4>

                <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>
                    When I started in the speaking industry, I quickly discovered
                    that talent alone doesn't book gigs. The most successful
                    speakers aren't just great on stage — they have systems for
                    consistently finding and securing the right opportunities.
                  </p>
                  <p>Look at what we're all facing today:</p>
                  <ul className="list-disc pl-8 space-y-3">
                    <li>
                      An increasingly saturated market with incredibly talented
                      individuals
                    </li>
                    <li>Speakers all competing for the SAME limited opportunities</li>
                    <li>
                      New thought leaders emerging daily on social media and
                      elsewhere
                    </li>
                    <li>
                      Event planners overwhelmed with options and harder to reach
                      than ever
                    </li>
                  </ul>
                  <p>
                    And you don't just need more gigs — you need higher-quality,
                    better-paying ones.
                  </p>
                </div>

                <h4 className="text-xl font-semibold text-gray-800">
                  Your Feedback Will Shape SpeakerDrive
                </h4>
                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>
                    As one of our first early adopters, you're not just getting
                    exclusive perks — you're helping build the future of how
                    experts connect with opportunities.
                  </p>
                  <p>
                    Your feedback will directly influence our development. You'll
                    have a direct line to our team, and your input will help us
                    create the exact platform that speakers and experts have been
                    waiting for.
                  </p>
                  <p>
                    I can't wait to show you what we've built and to hear your
                    thoughts on how we can make it even better.
                  </p>
                </div>

                {/* Updated "What Happens Next?" Section */}
                <h4 className="text-xl font-semibold text-gray-800">
                  What Happens Next?
                </h4>
                <ul className="list-disc pl-8 space-y-3 text-base sm:text-lg text-gray-700">
                  <li>Book a call via the button above</li>
                  <li>
                    Add us to your contacts — Make sure to add{" "}
                    <span className="font-medium">support@speakerdrive.com</span>{" "}
                    to your contacts
                  </li>
                  <li>Get ready — exciting stuff is in the works!</li>
                </ul>
              </div>

              {/* Secondary Button at the Bottom */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => (window.location.href = "https://www.speakerdrive.com/demo")}
                  className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Book A Demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer5 />
    </div>
  );
}
