import type { Metadata } from "next";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { TidyCalEmbed } from "@/components/testimonials/TidyCalEmbed";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";

export const metadata: Metadata = {
  title: "Book a Demo | SpeakerDrive",
  description:
    "Pick a time with Austin Benton, the founder of SpeakerDrive, and see how speakers find decision-makers and book more gigs.",
};

export default function DemoPage() {
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

      <main className="pt-24">
        {/* Demo Scheduling Section */}
        <section className="relative bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">
                Schedule a Demo
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Book a time to see how SpeakerDrive can help you find and book more speaking opportunities.
              </p>
            </div>

            {/* TidyCal Embed (shared with /reviews) */}
            <TidyCalEmbed className="min-h-[940px] lg:min-h-[1060px]" />
          </div>
        </section>

        {/* Named testimonials — the ones TidyCal's own review list does not show */}
        <section className="bg-white pb-16 pt-4 sm:pb-20">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                What customers say
              </h2>
            </div>
            <TestimonialCarousel />
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}
