"use client";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FeatureTwoItem } from "@/components/sections/features/FeatureTwoItem";
import { FAQ } from "@/components/sections/FAQ";
import { Footer5 } from "@/components/layout/Footer";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { FeatureAccordion } from "@/components/sections/FeatureAccordion";
import { ArrowDownIcon, SearchIcon, SendIcon, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { EventExamples } from "@/components/sections/EventExamples";
import { TheProspectingEffect } from "@/components/sections/TheProspectingEffect";
import { GeneralFAQ } from "@/components/sections/GeneralFAQ";
import { MessageComposerFormula } from "@/components/sections/MessageComposerFormula";
import Globe from "@/app/globe/page";
import { ScrollArrows } from "@/components/ui/ScrollArrows"; // 1. Import the new component

export default function LandingPage() {
  // 2. Add the scroll handler function
  const handleScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <HeaderFinal
          companyName="SpeakerDrive"
          logo={
            <img
              src="/SpeakerDrive Logo - Long.png"
              alt="SpeakerDrive"
              className="h-8"
            />
          }
        />
      </div>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="pb-0">
          <Hero />
        </section>

        {/* What Is SpeakerDrive */}
        <section id="what-is" className="bg-white pt-14 pb-6 px-4">
          <div className="mx-auto max-w-4xl">
            {/* Heading + Short Logo, centered */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <img
                src="/SpeakerDrive Logo - Short.png"
                alt="SpeakerDrive"
                className="w-9 h-9 object-contain"
              />
              <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                What Is SpeakerDrive?
              </h2>
            </div>

            {/* Definition + two-activities framing */}
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg sm:text-2xl font-semibold text-gray-900 leading-snug mb-3">
                SpeakerDrive is a speaker prospecting tool that streamlines the outreach process.
              </p>
              <p className="text-base sm:text-lg text-gray-600 font-medium mb-8">
                It all boils down to two simple activities:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-left">
                <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
                  <span className="flex-none w-11 h-11 rounded-lg bg-blue-100 text-brand-blue flex items-center justify-center">
                    <SearchIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    Finding the right events and opportunities
                  </h3>
                </div>

                <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 shadow-sm px-6 py-5">
                  <span className="flex-none w-11 h-11 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
                    <SendIcon className="w-5 h-5" />
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                    Contacting the decision-makers who can hire you
                  </h3>
                </div>
              </div>

              {/* Bouncing scroll indicator into the globe section */}
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-8 w-8 text-gray-400" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Globe Section - UPDATED */}
        <section id="globe" className="bg-white py-12">
          {/* Globe intro copy */}
          <div className="container mx-auto max-w-6xl px-4 text-center pb-10">
            <motion.p
              className="text-gray-600 text-base sm:text-lg font-semibold tracking-wide uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Stop Searching The Web For Gigs
            </motion.p>

            <motion.h2
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-500 to-green-500 animate-gradient">$10K</span> Speaking Gig{" "}
              <br className="hidden sm:block" />
              Is One Click Away
            </motion.h2>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Every dot is an opportunity. We&apos;ve done the work for you.
            </motion.p>
          </div>

          {/* This container constrains the globe's height and acts as a positioning
              parent for the fixed-position arrows. */}
          <div className="relative max-h-[600px] overflow-hidden">
            <Globe />
            <ScrollArrows
              onScrollUp={() => handleScroll("hero")}
              onScrollDown={() => handleScroll("how-it-works")}
            />
          </div>
        </section>

        {/* "How It Works" and Steps 1-3 */}
        <section id="how-it-works" className="bg-stone-50 pt-14 pb-12">
          <div className="mx-auto max-w-4xl px-4 mb-10 text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              How It Works
            </h2>
            <div className="mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-brand-blue to-green-500"></div>
          </div>

          {/* Step 1: Find Qualified Leads */}
          <div className="mt-4">
            <FeatureTwoItem
              stepNumber={1}
              title="Find Qualified Leads"
              description=""
              features={[
                {
                  title: "Find Events And Contacts",
                  description: "11 advanced search filters for granular targeting.",
                },
                {
                  title: "Opportunities Added Daily",
                  description: "Fresh engagements and decision-makers added as they emerge.",
                },
              ]}
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21aa6244f61209f98b0.mp4"
              captionText="Search by events or contacts"
            />
          </div>

          {/* Step 2: Unlock Contact Info */}
          <div className="mt-10">
            <FeatureTwoItem
              stepNumber={2}
              title="Unlock Contact Info"
              description="Skip the research and go straight to connecting"
              features={[
                {
                  title: "Email Verification",
                  description: "All contact information is verified and up-to-date.",
                },
                {
                  title: "Direct Links",
                  description: "Apply directly without intermediaries.",
                },
                {
                  title: "LinkedIn Profiles",
                  description: "Connect with decision-makers on LinkedIn.",
                },
              ]}
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21a5f250c02e2dc236c.mp4"
              captionText="Find detailed info. Then, unlock the contact channel."
            />
          </div>

          {/* Step 3: Craft Outreach */}
          <div className="mt-10">
            <FeatureTwoItem
              stepNumber={3}
              title="Start Prospecting"
              description=""
              features={[
                {
                  title: "Smart Message Composer",
                  description:
                    "Personalized outreach based on the event, contact, and your specific expertise.",
                },
                {
                  title: "Multi-Channel Options",
                  description: "Connect via email, LinkedIn, or application forms—optimized for each opportunity.",
                },
              ]}
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d25922c810b65b2239ae.mp4"
              captionText="Generate outreach in 1 click"
            />
          </div>
        </section>

        {/* Event Examples */}
        <EventExamples />

        {/* Message Composer sections */}
        <section className="bg-white pt-16 pb-16 px-4">
          <MessageComposerFormula />
        </section>

        {/* Autopilot */}
        <section className="bg-stone-50 py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="inline-block bg-green-100 text-green-700 text-sm font-bold tracking-wide uppercase rounded-full px-4 py-1 mb-4">
                New
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-black mb-5">
                Or Put Your Outreach On{" "}
                <span className="text-green-600">Autopilot</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium mb-4">
                Load your leads. Autopilot writes every email, sends on a steady daily
                drip, handles the follow-ups, and pauses the moment someone replies. You
                only show up for the conversations that matter.
              </p>
              <p className="text-lg sm:text-xl font-semibold text-gray-900">
                Do an entire month&apos;s outreach in one sitting.
              </p>
            </div>

            <img
              src="/autopilot-for-website.png"
              alt="The SpeakerDrive Autopilot dashboard, showing leads moving from On Deck to Queued to In Autopilot, with replies collected automatically"
              className="w-full rounded-xl border border-gray-200 shadow-lg mb-10"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <svg className="flex-none w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Sends from your own Gmail — replies land in your inbox
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="flex-none w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Every message is logged, so you always know what went out
                </p>
              </div>
              <div className="flex items-start gap-3">
                <svg className="flex-none w-5 h-5 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  Edit or remove any lead before it sends — you stay in control
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For */}
        <section className="bg-white py-16 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative mb-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-black text-center max-w-3xl mx-auto">
                SpeakerDrive is Perfect&nbsp;For...
              </h2>
            </div>

            <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mb-12 text-center">
              Professional speakers & experts who deliver their expertise through keynotes, workshops, coaching, and consulting.
            </p>

            {/* Expert Types Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 px-4 sm:px-8">
              {/* Keynote Speakers */}
              <div className="text-center md:hover:scale-105 transition-transform duration-300 order-1 md:order-3 lg:col-span-1 lg:transform lg:scale-105">
                <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                  <img
                    src="/Keynote Speaker.png"
                    alt="Keynote Speakers"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Keynote Speakers</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Impactful mainstage presentations
                  </p>
                </div>
              </div>

              {/* Leadership Development */}
              <div className="text-center md:hover:scale-105 transition-transform duration-300 order-2 md:order-1">
                <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                  <img
                    src="/Coach.png"
                    alt="Leadership Development"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Skill Development</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Executive growth programs
                  </p>
                </div>
              </div>

              {/* Interactive Workshops */}
              <div className="text-center md:hover:scale-105 transition-transform duration-300 order-3 md:order-2">
                <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                  <img
                    src="/Trainer Facilitator.png"
                    alt="Interactive Workshops"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Workshops</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Skill-building interactive sessions
                  </p>
                </div>
              </div>

              {/* Strategic Advisory */}
              <div className="text-center md:hover:scale-105 transition-transform duration-300 order-4 md:order-4">
                <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                  <img
                    src="/Consultant.png"
                    alt="Strategic Advisory"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Strategic Advisory</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Specialized expertise solutions
                  </p>
                </div>
              </div>

              {/* Big Ideas & Insights */}
              <div className="text-center md:hover:scale-105 transition-transform duration-300 order-5 md:order-5">
                <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                  <img
                    src="/Expert Thought Leader.png"
                    alt="Big Ideas & Insights"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Big Ideas & Insights</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Innovative thinking platforms
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual transition connector */}
        <div className="bg-white py-12">
          <div className="container mx-auto max-w-4xl px-4">
            {/* Top statement */}
            <div className="text-center mb-4">
              <h3 className="text-3xl sm:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent text-center max-w-3xl mx-auto">
                Opportunities for experts are everywhere in the&nbsp;market.
              </h3>
            </div>

            {/* Visual funnel */}
            <div className="relative flex flex-col items-center">
              <div className="w-full max-w-2xl mb-3 text-center">
                <p className="relative text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                  Yet talented professionals still struggle to fill their calendars
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 bg-gray-50/80 rounded-full px-6 py-2.5 border border-gray-200/50 mb-8">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-gray-500 font-bold text-lg">?</span>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  What's the disconnect?
                </p>
              </div>
            </div>

            {/* Decorative connector */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-[3px] bg-gradient-to-b from-gray-300/50 to-red-300/50"></div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 my-3">
                <ArrowDownIcon className="h-5 w-5 text-red-600" />
              </div>
              <div className="h-8 w-[3px] bg-gradient-to-b from-red-300/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* The Prospecting Effect */}
        <section id="referral-trap">
          <TheProspectingEffect />
        </section>

        <GeneralFAQ />
      </main>

      <Footer5 />
    </div>
  );
}