import type { Metadata } from "next";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { Stars } from "@/components/testimonials/TestimonialCard";
import { TestimonialCarousel } from "@/components/testimonials/TestimonialCarousel";
import { DemoReviewsWall } from "@/components/testimonials/DemoReviewsWall";
import { TidyCalEmbed } from "@/components/testimonials/TidyCalEmbed";
import {
  DEMO_REVIEWS_WITH_TEXT,
  DEMO_REVIEW_AVERAGE,
  DEMO_REVIEW_COUNT,
  NAMED_TESTIMONIALS,
  displayName,
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
      reviewBody: t.quotes.join(" "),
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
        {/* Intro */}
        <section className="bg-white pb-10 pt-12 sm:pb-12 sm:pt-16">
          <div className="container mx-auto max-w-4xl px-4 text-center sm:px-6">
            <span className="mb-4 inline-block rounded-full bg-green-100 px-4 py-1 text-sm font-bold uppercase tracking-wide text-green-700">
              Reviews
            </span>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              What speakers say about SpeakerDrive
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Real customers, in their own words.
            </p>
            <a
              href="#demo-reviews"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm shadow-sm hover:border-gray-300"
            >
              <Stars size={16} />
              <span className="font-bold text-gray-900">
                {DEMO_REVIEW_AVERAGE.toFixed(1)}
              </span>
              <span className="text-gray-600">
                from {DEMO_REVIEW_COUNT} demo reviews
              </span>
            </a>
          </div>
        </section>

        {/* Named customers: one wide card, rotating */}
        <section className="bg-stone-50 py-12 sm:py-16">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <TestimonialCarousel />
          </div>
        </section>

        <DemoReviewsWall />

        {/* Calendar */}
        <section className="relative bg-stone-50 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-5xl">
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
