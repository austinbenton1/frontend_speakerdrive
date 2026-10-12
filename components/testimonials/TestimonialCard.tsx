// One customer quote. Used on /reviews (every named entry) and inside the
// /demo slider. Server-safe: no hooks, no browser APIs.
//
// Everything on the card comes from components/testimonials/data.ts. The card
// never invents a title, a photo or a number: if the entry has no `title`
// there is no title line, if it has no `photo` there is no picture.

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SOURCE_LABEL, formatMonth, type Testimonial } from "./data";

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** The quote, with the entry's `emphasis` substrings set in bold. */
export function Emphasized({
  text,
  emphasis,
}: {
  text: string;
  emphasis?: string[];
}) {
  const hits = (emphasis ?? []).filter((e) => e && text.includes(e));
  if (hits.length === 0) return <>{text}</>;
  const re = new RegExp(`(${hits.map(escapeRegExp).join("|")})`, "g");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        hits.includes(part) ? (
          <strong key={i} className="font-semibold text-gray-900">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

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
  variant = "default",
  className,
}: {
  t: Testimonial;
  /** `spotlight` = the big one at the top of /reviews. */
  variant?: "default" | "spotlight";
  className?: string;
}) {
  const spotlight = variant === "spotlight";
  const meta = `${SOURCE_LABEL[t.source]} · ${formatMonth(t.date)}`;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border bg-white",
        spotlight
          ? "border-brand-blue/40 p-7 shadow-[0_18px_50px_-30px_rgba(60,180,255,0.6)] sm:p-10"
          : "border-gray-200 p-6 sm:p-7",
        className,
      )}
    >
      {spotlight && (
        <span
          aria-hidden="true"
          className="mb-2 block font-serif text-6xl leading-none text-brand-blue"
        >
          &ldquo;
        </span>
      )}
      <blockquote className="flex-1">
        {t.quotes.map((q, i) => (
          <p
            key={i}
            className={cn(
              "text-gray-700",
              spotlight
                ? "text-lg leading-relaxed sm:text-2xl sm:leading-relaxed"
                : "text-base leading-relaxed",
              i > 0 && "mt-4",
            )}
          >
            {i === 0 && !spotlight && <>&ldquo;</>}
            <Emphasized text={q} emphasis={t.emphasis} />
            {i === t.quotes.length - 1 && !spotlight && <>&rdquo;</>}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
        {t.photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.photo}
            alt={t.name}
            className="h-12 w-12 flex-none rounded-full object-cover"
          />
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="font-bold text-gray-900">{t.name}</span>
            {t.rating && <Stars size={14} />}
          </div>
          {t.title && <div className="text-sm text-gray-600">{t.title}</div>}
          <div className="text-xs text-gray-500">{meta}</div>
        </div>
      </figcaption>
    </figure>
  );
}
