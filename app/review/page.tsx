import type { Metadata } from "next";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { ReviewForm } from "@/components/review/ReviewForm";

// The link we send customers to leave a review. Not for search results.
export const metadata: Metadata = {
  title: "Leave a Review | SpeakerDrive",
  description: "Tell other speakers how SpeakerDrive is working for you.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://speakerdrive.com/review" },
};

export default function ReviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
      <main className="px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-xl">
          <ReviewForm />
        </div>
      </main>
      <Footer5 />
    </div>
  );
}
