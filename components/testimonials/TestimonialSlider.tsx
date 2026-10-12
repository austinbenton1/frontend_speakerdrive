"use client";

// A horizontal, swipeable row of the named testimonials. Lives under the
// calendar on /demo. Same cards and the same data as /reviews; this file
// only adds the scrolling, the arrows and the dots.

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAMED_TESTIMONIALS, type Testimonial } from "./data";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialSlider({
  items = NAMED_TESTIMONIALS,
  moreHref = "/reviews",
  moreLabel = "Read all reviews",
}: {
  items?: Testimonial[];
  moreHref?: string;
  moreLabel?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  // The card closest to the left edge is "current" (drives the dots/arrows).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cards = Array.from(track.children) as HTMLElement[];
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const d = Math.abs(card.offsetLeft - track.scrollLeft);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setIndex(best);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(items.length - 1, i));
      const card = track.children[clamped] as HTMLElement | undefined;
      if (!card) return;
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    },
    [items.length],
  );

  const atStart = index <= 0;
  const atEnd = index >= items.length - 1;

  return (
    <div>
      <div
        ref={trackRef}
        className="scrollbar-hide relative flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 sm:gap-6"
        aria-label="Customer testimonials"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className="w-[88%] flex-none snap-start sm:w-[520px] lg:w-[560px]"
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2" role="group" aria-label="Slide controls">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            disabled={atStart}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            disabled={atEnd}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <div className="ml-2 flex items-center gap-1.5">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1} of ${items.length}: ${t.name}`}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-6 bg-brand-blue" : "w-2.5 bg-gray-300 hover:bg-gray-400",
                )}
              />
            ))}
          </div>
        </div>

        <Link
          href={moreHref}
          className="text-sm font-semibold text-brand-blue hover:underline"
        >
          {moreLabel}
        </Link>
      </div>
    </div>
  );
}
