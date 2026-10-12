// The card wall on /reviews: the named customers first (photo, "Terri C.",
// title), then every TidyCal demo review that has words (stars, first name,
// month). Server-safe. Everything comes from data.ts.

import { cn } from "@/lib/utils";
import {
  DEMO_REVIEWS_WITH_TEXT,
  NAMED_TESTIMONIALS,
  displayName,
  displayQuotes,
  formatMonth,
  type Testimonial,
} from "./data";
import { Emphasized, Stars } from "./TestimonialCard";

function Tile({ t }: { t: Testimonial }) {
  const quotes = displayQuotes(t);
  const demo = t.source === "tidycal";
  return (
    <figure className="mb-5 break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      {t.rating && <Stars size={16} />}
      <blockquote className={cn("leading-relaxed text-gray-700", t.rating && "mt-3")}>
        {quotes.map((q, i) => (
          <p key={i} className={i > 0 ? "mt-2" : undefined}>
            {i === 0 && <>&ldquo;</>}
            <Emphasized text={q} emphasis={t.emphasis} />
            {i === quotes.length - 1 && <>&rdquo;</>}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        {t.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.photo}
            alt={displayName(t)}
            className="h-10 w-10 flex-none rounded-full object-cover"
          />
        )}
        <div className="min-w-0 text-sm">
          <div className="font-bold text-gray-900">
            {displayName(t)}
            {demo && (
              <span className="font-normal text-gray-500"> · {formatMonth(t.date)}</span>
            )}
          </div>
          {t.title && <div className="text-gray-600">{t.title}</div>}
        </div>
      </figcaption>
    </figure>
  );
}

export function ReviewsWall({
  items = [...NAMED_TESTIMONIALS, ...DEMO_REVIEWS_WITH_TEXT],
}: {
  items?: Testimonial[];
}) {
  return (
    <section id="reviews" className="bg-white py-8 sm:py-10">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((t) => (
            <Tile key={t.id} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
