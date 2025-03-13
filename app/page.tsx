"use client";
import { Hero } from "@/components/sections/Hero";
import { FeatureTwoItem } from "@/components/sections/features/FeatureTwoItem";
import { FAQ } from "@/components/sections/FAQ";
import { Footer5 } from "@/components/layout/Footer";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { FeatureAccordion } from "@/components/sections/FeatureAccordion";
import { ArrowDownIcon } from 'lucide-react';
import { EventExamples } from "@/components/sections/EventExamples";
import { TheProspectingEffect } from "@/components/sections/TheProspectingEffect";
import { GeneralFAQ } from "@/components/sections/GeneralFAQ";

export default function LandingPage() {
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
      />

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/*
          "How It Works" and Steps 1-3 combined into a single
          section to eliminate gaps & unify design.
        */}
        <section id="how-it-works" className="bg-stone-50 pt-16 pb-12">
          <div className="relative">
            {/* Content */}
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
                        SpeakerDrive is a prospecting database built exclusively for speakers, coaches, and experts. Access contact data for events, speaker opportunities, and decision-makers who book professionals, like you.
                      </p>
                      
                      <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
                        SpeakerDrive lets you build a predictable booking pipeline—on your terms.
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
          </div>

          {/* STEP 1: Find Qualified Leads */}
          <div className="mt-4">
            <FeatureTwoItem
              stepNumber={1}
              title="Find Qualified Leads"
              description=""
              features={[
                {
                  title: "Find Events And Contacts",
                  description: "Search opportunities all in one place with 11 advanced filters.",
                },
                {
                  title: "Always Current Data",
                  description: "Fresh engagements and decision-makers added to our system daily.",
                },
              ]}
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21aa6244f61209f98b0.mp4"
              captionText="Search by events or contacts"
            />
          </div>

          {/* STEP 2: Unlock Contact Info */}
          <div className="mt-10">
            <FeatureTwoItem
              stepNumber={2}
              title="Unlock Contact Info"
              description=""
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

          {/* STEP 3: Craft Outreach */}
          <div className="mt-10">
            <FeatureTwoItem
              stepNumber={3}
              title="Start Prospecting"
              description=""
              features={[
                {
                  title: "Smart Message Composer",
                  description: "Hyper personalized outreach based on the event, contact, and your specific expertise.",
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

        {/* Event Examples Section */}
        <EventExamples />

        {/* Who We Serve */}
        <section className="bg-white py-16 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative mb-2 text-center">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-black max-w-3xl mx-auto">
                SpeakerDrive is Perfect For...
              </h2>
            </div>

            <p className="text-center text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mt-4 mb-12">
              Professionals who speak, train, and consult who want to take control of their business development.
            </p>

            {/* Expert Types Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 -mx-8 px-8">
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Coach.png" alt="Coaches" className="w-full h-full object-contain" />
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Coaches</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Reach organizations seeking leadership, development and transformation.
                  </p>
                </div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Trainer Facilitator.png" alt="Trainers" className="w-full h-full object-contain" />
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Trainers</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Find companies looking for skill-building and educational workshops.
                  </p>
                </div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Keynote Speaker.png" alt="Keynote Speakers" className="w-full h-full object-contain" />
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Keynote Speakers</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Discover events searching for impactful mainstage presentations.
                  </p>
                </div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Consultant.png" alt="Consultants" className="w-full h-full object-contain" />
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Consultants</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Access decision-makers who need specialized expertise and solutions.
                  </p>
                </div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Expert Thought Leader.png" alt="Thought Leaders" className="w-full h-full object-contain" />
                </div>
                <div className="relative p-4 rounded-lg shadow-sm bg-white">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-50"></div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Thought Leaders</h3>
                  <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                    Identify platforms eager to showcase innovative ideas and insights.
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
              <h3 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 bg-clip-text text-transparent leading-tight">
                Opportunities for experts are everywhere in the market.
              </h3>
            </div>
            
            {/* Visual funnel */}
            <div className="relative flex flex-col items-center">
              {/* Second statement - narrower with enhanced styling */}
              <div className="w-full max-w-2xl mb-3 text-center">
                <p className="relative text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent">
                  Yet talented professionals still struggle to fill their calendars
                </p>
              </div>
              
              {/* Question - most narrow */}
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