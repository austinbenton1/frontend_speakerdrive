// One customer quote as a wide card: photo on the left (when we have one),
// the quote on the right, name and title under it. Used by the carousel on
// /reviews and /demo, the only place a photo shows. Server-safe.
//
// Everything on the card comes from components/testimonials/data.ts. The card
// never invents a title or a photo: no `title`, no title line; no `photo`, no
// picture and the quote takes the full width.

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { displayName, displayQuotes, type Testimonial } from "./data";

export function Stars({
  count = 5,
  className,
  size = 18,
}: {
  count?: number;
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          width={size}
          height={size}
          className="text-amber-400"
          fill="currentColor"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function TestimonialCard({
  t,
  className,
}: {
  t: Testimonial;
  className?: string;
}) {
  const name = displayName(t);
  const quotes = displayQuotes(t);

  return (
    <figure
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6",
        className,
      )}
    >
      {t.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={t.photo}
          alt={name}
          className="h-20 w-20 flex-none rounded-2xl object-cover sm:h-24 sm:w-24"
        />
      )}
      <div className="min-w-0 flex-1">
        <Stars size={16} className="mb-3" />
        <blockquote>
          {quotes.map((q, i) => (
            <p
              key={i}
              className={cn(
                "text-base font-medium leading-snug text-gray-900 sm:text-lg sm:leading-snug",
                i > 0 && "mt-2",
              )}
            >
              {i === 0 && <>&ldquo;</>}
              {q}
              {i === quotes.length - 1 && <>&rdquo;</>}
            </p>
          ))}
        </blockquote>
        <figcaption className="mt-4">
          <div className="font-bold text-gray-900">{name}</div>
          {t.title && <div className="text-sm text-gray-600">{t.title}</div>}
        </figcaption>
      </div>
    </figure>
  );
}
