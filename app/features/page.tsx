"use client";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { MessageComposer } from "@/components/sections/MessageComposer";

export default function FeaturesPage() {
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

      <main className="pt-24">
        {/* Hero Section */}
        <div className="container mx-auto max-w-4xl px-4 text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
            Features
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to find opportunities and book more gigs.
          </p>
        </div>

        {/* Message Composer Section */}
        <section id="message-composer" className="bg-white">
          <MessageComposer />
        </section>
      </main>

      <Footer5 />
    </div>
  );
}