"use client";

import { ContactFeaturePanel } from "@/components/sections/features/ContactFeaturePanel";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderFinal 
        companyName="SpeakerDrive"
        logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
        links={[
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "#contact" },
        ]}
      />

      <main className="pt-24">
        {/* Message Composer Section */}
        <ContactFeaturePanel />

        {/* Tools Section */}
        <ToolsSection />
      </main>

      <Footer5 />
    </div>
  );
}