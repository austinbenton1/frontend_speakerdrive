"use client";

import { Hero } from "@/components/sections/Hero";
import { FeatureTwoItem } from "@/components/sections/features/FeatureTwoItem";
import { FAQ } from "@/components/sections/FAQ";
import { Footer5 } from "@/components/layout/Footer";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { FeatureAccordion } from "@/components/sections/FeatureAccordion";
import { ProspectingSection } from "@/components/sections/ProspectingSection";
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
          SECTION 1 (Colored background):
          - "How It Works" heading (FeatureAccordion)
          - Steps 1, 2, 3
        */}
        <section className="bg-stone-50">
          {/* "How It Works" main heading */}
          <FeatureAccordion />

          {/* STEP 1: Find Qualified Leads */}
          <div className="pt-0 pb-0">
            <FeatureTwoItem
              stepNumber={1}
              title="Find Qualified Leads"
              description="Find Your Ideal Opportunities"
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
          <div className="pt-4 pb-0">
            <FeatureTwoItem
              stepNumber={2}
              title="Unlock Contact Info"
              description="Find Your Ideal Opportunities"
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
          <div className="pt-4 pb-6">
            <FeatureTwoItem
              stepNumber={3}
              title="Craft Outreach"
              description="Find Your Ideal Opportunities"
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

        {/*
          SECTION 2 (White background):
          - "We dig for gold..." (ProspectingSection)
          - extends downward
        */}
        <section className="bg-white">
          <ProspectingSection />
        </section>

        {/* The Prospecting Effect (including “Relying on word-of-mouth…” text) */}
        <section id="referral-trap" className="bg-white">
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
            <p className="mt-4 text-sm text-gray-500">No credit card required</p>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}
