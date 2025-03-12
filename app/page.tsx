"use client";
import { useState } from 'react';
import { Hero } from "@/components/sections/Hero";
import { FeatureBigItem } from "@/components/sections/features/FeatureBigItem";
import { FeatureTwoItem } from "@/components/sections/features/FeatureTwoItem";
import { FAQ } from "@/components/sections/FAQ";
import { Footer5 } from "@/components/layout/Footer";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { FeatureAccordion } from "@/components/sections/FeatureAccordion";
import { ProspectingSection } from "@/components/sections/ProspectingSection";
import { TheProspectingEffect } from "@/components/sections/TheProspectingEffect";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderFinal
        companyName="SpeakerDrive"
        logo={
          <img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />
        }
        links={[
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "#contact" }
        ]}
      />

      <main className="pt-24">
        <section id="hero">
          <Hero />
        </section>
        
        <section id="features">
          <FeatureAccordion />
        </section>

        <section id="find-leads">
          <FeatureTwoItem
            title="Find Qualified Leads"
            stepNumber={1}
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
        </section>

        <section id="unlock-info" className="bg-neutral-50">
          <FeatureTwoItem
            title="Unlock Contact Info"
            stepNumber={2}
            description="Get verified email addresses and direct application links to reach decision-makers without the gatekeepers."
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
            externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee03d10887974dc27c8.mp4"
            captionText="Unlock contact info"
          />
        </section>

        <section id="craft-outreach">
          <FeatureTwoItem
            title="Craft Outreach"
            stepNumber={3}
            description="Our message composer creates personalized messages designed to start meaningful conversations."
            features={[
              {
                title: "AI-Powered Templates",
                description: "Start with proven templates that convert.",
              },
              {
                title: "Personalization Engine",
                description: "Automatically personalize messages to each recipient.",
              },
              {
                title: "Performance Tracking",
                description: "See what messages perform best.",
              },
            ]}
            externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee004d659631e395f35.mp4"
            captionText="Generate outreach in 1 click"
          />
        </section>

        <section id="prospecting">
          <ProspectingSection />
        </section>

        <section id="referral-trap">
          <TheProspectingEffect />
        </section>

        <section id="cta" className="bg-white">
          <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to grow your speaking business?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of speakers who use SpeakerDrive to find more
              opportunities and grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 px-6 py-3 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                View pricing
              </a>
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-brand-blue text-white px-6 py-3 text-base font-medium shadow-md hover:bg-blue-600 transition-colors"
              >
                Start free trial
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">No credit card required</p>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}
