"use client";

// The named testimonials as one wide card that rotates on its own: every
// `interval` ms the next quote fades in. Dots jump to a quote and restart the
// clock. It pauses while the mouse is over it or a dot has focus, and it does
// not rotate at all for people who asked their system for reduced motion.
//
// Every slide stays in the page (the current one in flow, the others laid on
// top of it, invisible), so search engines see every quote. The card's height
// follows the current quote and eases between heights, so a short quote after
// a long one does not leave a hole. Lives in the tan band on /reviews and
// under the calendar on /demo.

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { NAMED_TESTIMONIALS, displayName, type Testimonial } from "./data";
import { TestimonialCard } from "./TestimonialCard";

export function TestimonialCarousel({
  items = NAMED_TESTIMONIALS,
  interval = 8000,
}: {
  items?: Testimonial[];
  /** Milliseconds each quote stays up before the next one. */
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Measured height of the current slide; undefined until mounted (auto).
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Follow the current slide's height (and re-measure when the window resizes).
  useEffect(() => {
    const el = slideRefs.current[index];
    if (!el) return;
    const measure = () => setHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index]);

  // `index` is a dependency on purpose: a click on a dot restarts the clock.
  useEffect(() => {
    if (paused || reducedMotion || items.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, items.length, interval, index]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden transition-[height] duration-500 ease-out"
        style={{ height }}
      >
        {items.map((t, i) => {
          const active = i === index;
          return (
            <div
              key={t.id}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${items.length}`}
              aria-hidden={!active}
              className={cn(
                "top-0 left-0 w-full transition-opacity duration-500 ease-out",
                active
                  ? "relative opacity-100"
                  : "pointer-events-none absolute opacity-0",
              )}
            >
              <TestimonialCard t={t} />
            </div>
          );
        })}
      </div>

      {items.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2 sm:justify-end"
          role="group"
          aria-label="Choose a testimonial"
        >
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${displayName(t)}`}
              aria-current={i === index ? "true" : undefined}
              className={cn(
                "h-2.5 rounded-full transition-all",
                i === index
                  ? "w-6 bg-gray-900"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
