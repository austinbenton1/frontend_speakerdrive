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
        links={[
          { label: "Features", href: "/features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "#contact" },
        ]}
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
                    <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 text-gray-900 tracking-tight">
                      What is SpeakerDrive?
                    </h2>
                    
                    <div className="space-y-8">
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
                        SpeakerDrive is the only prospecting database built exclusively for speakers, coaches, and experts. Access contact data for events, speaker opportunities, and decision-makers who book professionals, like you.
                      </p>
                      
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
                        With SpeakerDrive, you predictably control your <span className="font-bold text-blue-500 relative">OWN<span className="absolute inset-x-0 -bottom-0.5 h-[3px] bg-blue-100 rounded-full"></span></span> client acquisition pipeline.
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
                  title: "Search Events and Contacts",
                  description: "All opportunities in one place.",
                },
                {
                  title: "Smart Discovery",
                  description: "Customize your search with 11 advanced filters.",
                },
                {
                  title: "Fresh Opportunities",
                  description: "New leads added daily.",
                },
              ]}
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee004d6591f37395f36.mp4"
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
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee03d10887974dc27c8.mp4"
              captionText="Unlock contact info"
            />
          </div>

          {/* STEP 3: Craft Outreach */}
          <div className="mt-10">
            <FeatureTwoItem
              stepNumber={3}
              title="Craft Outreach"
              description=""
              features={[
                {
                  title: "AI-Powered Templates",
                  description: "Start with proven templates that convert.",
                },
                {
                  title: "Personalization Engine",
                  description:
                    "Automatically personalize messages to each recipient.",
                },
                {
                  title: "Performance Tracking",
                  description: "See what messages perform best.",
                },
              ]}
              externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee004d659631e395f35.mp4"
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
                <h3 className="text-lg font-semibold text-gray-900">Coaches</h3>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Trainer Facilitator.png" alt="Trainers" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Trainers</h3>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Keynote Speaker.png" alt="Keynote Speakers" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Keynote Speakers</h3>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Consultant.png" alt="Consultants" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Consultants</h3>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-[3/4] mb-4">
                  <img src="/Expert Thought Leader.png" alt="Thought Leaders" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Thought Leaders</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Visual transition connector */}
        <div className="bg-white pt-8 pb-10"> 
          <div className="container mx-auto max-w-4xl px-4 flex flex-col items-center">
            <div className="text-center mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-blue-50/20 to-transparent rounded-xl -z-10"></div>
              <div className="p-6">
                <h3 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-xl md:text-2xl font-bold mb-3">
                  These opportunities are out there waiting for you.
                </h3>
                <p className="text-lg text-gray-700">
                  So why are so many talented experts still struggling to fill their calendars?
                </p>
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="h-24 w-1 bg-gradient-to-b from-brand-blue/50 to-red-300/70"></div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 my-3">
                <ArrowDownIcon className="h-5 w-5 text-red-600" />
              </div>
              <div className="h-8 w-px bg-gradient-to-b from-red-300 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* The Prospecting Effect */}
        <section id="referral-trap">
          <TheProspectingEffect />
        </section>

        {/* BOTTOM CTA */}
        <section id="cta" className="bg-white">
          <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Find and Book Your Next Engagement
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Escape the referral trap and predictably control your OWN client
              acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 px-6 py-3 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                View Pricing
              </a>
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 text-lg font-semibold shadow-md hover:opacity-90 transition-colors"
              >
                Start free trial
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required
            </p>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}