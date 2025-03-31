"use client";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">
              You're In!
            </h1>
            
            <h2 className="text-2xl font-bold text-gray-800">
              Thank You For Securing Your Early Access
            </h2>
            
            <p className="text-lg text-gray-600">
              You're now among the first 50 people who will get access to SpeakerDrive when we launch. 
              We'll notify you as soon as we're ready.
            </p>
            
            {/* Founder's Message Section */}
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
                  <path d="M6 13a4 4 0 0 1-4 4h4V9H2a4 4 0 0 1 4 4zm10 0a4 4 0 0 1-4 4h4V9h-4a4 4 0 0 1 4 4z"/>
                </svg>

                <h3 className="text-2xl font-bold text-gray-900">A Personal Message From Our Founder</h3>
                <h4 className="text-xl font-semibold text-gray-800">The Speaking Industry Needs a Better Way</h4>

                <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>
                    When I started in the speaking industry, I quickly discovered that talent alone doesn't book gigs. 
                    The most successful speakers aren't just great on stage - they have systems for consistently finding 
                    and securing the right opportunities.
                  </p>
                  
                  <p>Look at what we're all facing today:</p>
                  
                  <ul className="list-disc pl-8 space-y-3">
                    <li>An increasingly saturated market with incredibly talented individuals</li>
                    <li>Speakers all competing for the SAME limited opportunities</li>
                    <li>New thought leaders emerging daily on social media and elsewhere</li>
                    <li>Event planners overwhelmed with options and harder to reach than ever</li>
                  </ul>
                  
                  <p>And you don't just need more gigs—you need higher-quality, better-paying ones.</p>
                </div>

                <h4 className="text-xl font-semibold text-gray-800">Your Feedback Will Shape SpeakerDrive</h4>
                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>
                    As one of our first early adopters, you're not just getting exclusive perks - you're helping build 
                    the future of how experts connect with opportunities.
                  </p>
                  <p>
                    Your feedback will directly influence our development. You'll have a direct line to our team, and 
                    your input will help us create the exact platform that speakers and experts have been waiting for.
                  </p>
                  <p>
                    I can't wait to show you what we've built and to hear your thoughts on how we can make it even better.
                  </p>
                </div>

                <h4 className="text-xl font-semibold text-gray-800">What Happens Next?</h4>
                <ul className="list-disc pl-8 space-y-3 text-base sm:text-lg text-gray-700">
                  <li>Check your inbox - We've sent you a confirmation email with important details</li>
                  <li>Add us to your contacts - Make sure to add support@speakerdrive.com to your contacts</li>
                  <li>Get ready - We'll be in touch soon with exclusive pre-launch content and updates</li>
                </ul>

                <div className="flex items-center mt-8">
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
          </motion.div>
        </div>
      </main>

      <Footer5 />
    </div>
  );
}