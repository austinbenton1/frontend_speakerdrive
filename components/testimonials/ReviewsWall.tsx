// The card wall on /reviews. The named customers fan out across the top
// (one row of uniform cards, left to right), then the live reviews from the
// speakerdrive.com/review form (newest first) and every TidyCal demo review
// that has words flow below in columns. Every card: stars, the quote,
// the name. No photos here; the slider above is the only place a photo
// shows. Server-safe. Everything comes from data.ts.

import {
  DEMO_REVIEWS_WITH_TEXT,
  NAMED_TESTIMONIALS,
  displayName,
  formatMonth,
  wallQuotes,
  type Testimonial,
} from "./data";
import { Stars } from "./TestimonialCard";

function Tile({ t, className }: { t: Testimonial; className?: string }) {
  const quotes = wallQuotes(t);
  const dated = t.source === "tidycal" || t.source === "form";
  return (
    <figure
      className={
        "flex flex-col rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 " +
        (className ?? "")
      }
    >
      <Stars size={16} count={t.rating ?? 5} />
      <blockquote className="mt-3 flex-1 leading-relaxed text-gray-700">
        {quotes.map((q, i) => (
          <p key={i} className={i > 0 ? "mt-2" : undefined}>
            {i === 0 && <>&ldquo;</>}
            {q}
            {i === quotes.length - 1 && <>&rdquo;</>}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-4 min-w-0 text-sm">
        <div className="font-bold text-gray-900">
          {displayName(t)}
          {dated && (
            <span className="font-normal text-gray-500"> · {formatMonth(t.date)}</span>
          )}
        </div>
        {t.title && <div className="text-gray-600">{t.title}</div>}
      </figcaption>
    </figure>
  );
}

export function ReviewsWall({
  featured = NAMED_TESTIMONIALS,
  items = DEMO_REVIEWS_WITH_TEXT,
}: {
  featured?: Testimonial[];
  items?: Testimonial[];
}) {
  return (
    <section id="reviews" className="bg-white py-8 sm:py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Named customers: one row, left to right (wraps, last row centred) */}
        <div className="mb-5 flex flex-wrap justify-center gap-5">
          {featured.map((t) => (
            <Tile
              key={t.id}
              t={t}
              className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.34px)]"
            />
          ))}
        </div>

        {/* Demo reviews: flow down in columns */}
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((t) => (
            <Tile key={t.id} t={t} className="mb-5 break-inside-avoid" />
          ))}
        </div>
      </div>
    </section>
  );
}
