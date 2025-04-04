"use client";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FeatureTwoItem } from "@/components/sections/features/FeatureTwoItem";
import { FAQ } from "@/components/sections/FAQ";
import { Footer5 } from "@/components/layout/Footer";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { FeatureAccordion } from "@/components/sections/FeatureAccordion";
import { ArrowDownIcon } from "lucide-react";
import { EventExamples } from "@/components/sections/EventExamples";
import { TheProspectingEffect } from "@/components/sections/TheProspectingEffect";
import { GeneralFAQ } from "@/components/sections/GeneralFAQ";
import { MessageComposerFormula } from "@/components/sections/MessageComposerFormula";
import { MessageComposer } from "@/components/sections/MessageComposer";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { NotificationBanner } from "@/components/ui/NotificationBanner";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <NotificationBanner />
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

        {/* "How It Works" and Steps 1-3 */}
        {/*
          UPDATED BELOW:
          Changed pt-0 to pt-12 so there's more padding at the top of the cream section
        */}
        <section id="how-it-works" className="bg-stone-50 pt-12 pb-12">
          <div className="relative px-4 mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <img
                  src="/SpeakerDrive Logo - Short.png"
                  alt="SpeakerDrive"
                  className="w-9 h-9 object-contain flex-shrink-0 mt-1"
                />
                
                <div className="flex-1 text-left relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-50 via-blue-100/10 to-transparent blur-xl opacity-50 -z-10"></div>
                  <h2 className="text-xl sm:text-3xl font-extrabold mb-5 text-gray-900 tracking-tight">
                    What is SpeakerDrive?
                  </h2>
                  
                  <div className="space-y-8">
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                      SpeakerDrive is a specialized prospecting platform for experts with direct access to verified decision-makers and diverse event opportunities like conferences, training workshops, and consulting engagements.
                    </p>
                    
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                      SpeakerDrive is your one-stop shop to escape the feast-or-famine referral cycle and build a steady, profitable sales pipeline—on your terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual separator */}
              <div className="mt-24 mb-12 relative">
                <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <div className="flex justify-center">
                  <div className="bg-stone-50 px-6 py-1 relative -top-3 rounded-full border border-gray-200">
                    <span className="text-gray-500 text-sm font-medium">How It Works</span>
                  </div>
                </div>
              </div>
            </div>
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
                  description:
                    "All contact information is verified and up-to-date.",
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
                  description: "Personalized outreach based on the event, contact, and your specific expertise.",
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
          <MessageComposer />
        </section>

        {/* Tools Section */}
        <ToolsSection />

        {/* Perfect For */}
        <section className="bg-white py-16 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative mb-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-black text-center max-w-3xl mx-auto">
                SpeakerDrive is Perfect&nbsp;For...
              </h2>
            </div>

            <p className="text-center text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mt-4 mb-12">
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
            
        {/* Founder Quote Section */}
        <div className="max-w-2xl mx-auto px-6 sm:px-8 mb-20 mt-12">
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

            {/* Smaller on mobile */}
            <p className="text-base sm:text-xl font-normal text-gray-900 leading-relaxed">
              SpeakerDrive combines what I know works: relationship-building systems that grew my previous
              businesses, and authentic connections that have directly led to millions in speaker
              bookings. I've simplified everything I know into one platform.
            </p>

            <div className="flex items-center mt-2">
              <img
                src="/austin_benton_head.png"
                alt="Austin Benton"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 mr-4"
              />
              <div className="flex flex-col">
                <p className="text-base font-semibold text-gray-900">Austin Benton</p>
                <p className="text-sm text-gray-600">Founder, SpeakerDrive</p>
                {/* Keep LinkedIn link from before */}
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

        <GeneralFAQ />
      </main>

      <Footer5 />
    </div>
  );
}