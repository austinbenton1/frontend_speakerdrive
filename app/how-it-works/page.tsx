import type { Metadata } from "next";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { ConversionBlock } from "@/components/cta/ConversionBlock";

export const metadata: Metadata = {
  title: "How It Works | SpeakerDrive",
  description:
    "See exactly how SpeakerDrive works: find events that book speakers, unlock decision-maker contact info, and send outreach that lands replies.",
};

export default function HowItWorksPage() {
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
        {/* Shared closer — hero pitch, proof, FAQ, ROI live in components/cta */}
        <ConversionBlock campaign="how-it-works" />
      </main>

      <div className="mt-6">
        <Footer5 />
      </div>
    </div>
  );
}
