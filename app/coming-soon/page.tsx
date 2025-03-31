"use client";
import { HeroSimple } from "@/components/sections/HeroSimple";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";

export default function ComingSoonPage() {
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

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="pb-0">
          <HeroSimple />
        </section>
      </main>

      <Footer5 />
    </div>
  );
}