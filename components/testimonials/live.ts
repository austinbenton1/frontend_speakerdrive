// Live reviews from the speakerdrive.com/review form.
//
// The form posts to the app (app.speakerdrive.com), which decides what goes
// live: 4 or 5 stars from a SpeakerDrive account, right away; anything else
// waits for Austin, and 1 to 3 stars never show. This file only reads the
// live list, refreshed about once a minute. If the app does not answer, the
// page renders without them.

import type { Testimonial } from "./data";

/** The app's functions. Override with NEXT_PUBLIC_SITE_REVIEWS_API to test elsewhere. */
export const SITE_REVIEWS_API =
  process.env.NEXT_PUBLIC_SITE_REVIEWS_API ?? "https://app.speakerdrive.com/.netlify/functions";

type LiveReview = {
  id: string;
  date: string;
  stars: number;
  name: string;
  review: string;
  photo: string | null;
};

const isLiveReview = (r: unknown): r is LiveReview => {
  const x = r as LiveReview;
  return (
    !!x &&
    typeof x.id === "string" &&
    typeof x.date === "string" &&
    typeof x.name === "string" &&
    typeof x.review === "string" &&
    Number.isInteger(x.stars) &&
    x.stars >= 1 &&
    x.stars <= 5
  );
};

export async function fetchLiveReviews(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${SITE_REVIEWS_API}/site-reviews`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = (await res.json()) as { reviews?: unknown[] };
    return (json.reviews ?? []).filter(isLiveReview).map((r) => ({
      id: `form-${r.id}`,
      name: r.name,
      // One paragraph per block of text the person wrote.
      quotes: r.review.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
      source: "form" as const,
      date: r.date.slice(0, 7),
      rating: r.stars,
    }));
  } catch {
    return [];
  }
}
