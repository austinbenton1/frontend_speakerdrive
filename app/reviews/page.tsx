import type { Metadata } from "next";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { Stars } from "@/components/testimonials/TestimonialCard";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { ReviewsWall } from "@/components/testimonials/ReviewsWall";
import { TidyCalEmbed } from "@/components/testimonials/TidyCalEmbed";
import {
  DEMO_REVIEWS_WITH_TEXT,
  DEMO_REVIEW_AVERAGE,
  DEMO_REVIEW_COUNT,
  NAMED_TESTIMONIALS,
  displayName,
  displayQuotes,
} from "@/components/testimonials/data";

const PAGE_URL = "https://speakerdrive.com/reviews";
const TITLE = "SpeakerDrive Reviews | What Speakers Say";
const DESCRIPTION = `Rated ${DEMO_REVIEW_AVERAGE.toFixed(1)} out of 5 across ${DEMO_REVIEW_COUNT} demo reviews. Read what keynote speakers, coaches and experts say about finding and booking gigs with SpeakerDrive.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  // Nested keys replace the root layout's, so the share image is repeated here.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "SpeakerDrive",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "SpeakerDrive",
        secureUrl: "https://speakerdrive.com/og-image.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", alt: "SpeakerDrive", width: 1200, height: 630 }],
    site: "@speakerdrive",
    creator: "@austinbenton",
  },
};

// Review markup for search engines. Every value is read from data.ts.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SpeakerDrive",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://speakerdrive.com",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: DEMO_REVIEW_AVERAGE,
    bestRating: 5,
    worstRating: 1,
    ratingCount: DEMO_REVIEW_COUNT,
  },
  review: [
    ...NAMED_TESTIMONIALS.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: displayName(t) },
      reviewBody: displayQuotes(t).join(" "),
      datePublished: t.date,
    })),
    ...DEMO_REVIEWS_WITH_TEXT.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quotes.join(" "),
      datePublished: t.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
    })),
  ],
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        {/* Header */}
        <section className="bg-white pb-6 pt-8 sm:pb-8 sm:pt-10">
          <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6">
            <Stars size={28} className="mb-4" />
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Reviews from SpeakerDrive customers
            </h1>
            <p className="mt-3 text-gray-600">
              {DEMO_REVIEW_AVERAGE.toFixed(1)} out of 5 from {DEMO_REVIEW_COUNT}{" "}
              demo reviews
            </p>
          </div>
        </section>

        {/* Named customers, one card that rotates */}
        <section className="bg-white pb-4">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <TestimonialCarousel />
          </div>
        </section>

        {/* Every review, the named ones first */}
        <ReviewsWall />

        {/* Calendar */}
        <section className="relative bg-white py-12 sm:py-16">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                See it for yourself
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Pick a time below. Austin walks you through SpeakerDrive in 30
                minutes.
              </p>
            </div>
            <TidyCalEmbed />
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}
