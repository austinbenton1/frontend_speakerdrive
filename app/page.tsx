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
                        SpeakerDrive is a prospecting database built exclusively for speakers, coaches, and experts. Access contact data for events, speaker opportunities, and decision-makers who book professionals, like you.
                      </p>
                      
                      <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
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
        <section id="cta" className="relative bg-gradient-to-b from-white to-blue-50/50 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent"></div>
          
          <div className="container relative mx-auto max-w-4xl px-4 py-24 text-center">
            {/* Content */}
            <div className="relative inline-block mb-2">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-blue/10 via-blue-400/10 to-transparent blur-xl"></div>
              <h2 className="relative text-3xl md:text-4xl font-extrabold text-gray-900">
              Find and Book Your Next Engagement
              </h2>
            </div>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Escape the referral trap and predictably control your OWN client acquisition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="group inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 px-8 py-3.5 text-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                View Pricing
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-400 group-hover:text-gray-500 transition-colors" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="/signup"
                className="group relative inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-blue to-blue-500 text-white px-10 py-3.5 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-[400ms] ease-out"></div>
                Start Free Trial
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No credit card required
            </p>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}