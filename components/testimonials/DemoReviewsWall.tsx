// The TidyCal demo reviews: the 5.0 / N stat, then every review that has
// words, as a wall. Server-safe. Numbers are derived in data.ts.

import {
  DEMO_REVIEWS_WITH_TEXT,
  DEMO_REVIEW_AVERAGE,
  DEMO_REVIEW_COUNT,
  TIDYCAL_URL,
  formatMonth,
} from "./data";
import { Stars } from "./TestimonialCard";

export function DemoReviewsWall() {
  return (
    <section id="demo-reviews" className="bg-stone-50 py-16 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <Stars size={26} className="mb-3" />
          <p className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            {DEMO_REVIEW_AVERAGE.toFixed(1)}
          </p>
          <p className="mt-1 text-base font-semibold text-gray-700">
            out of 5 · {DEMO_REVIEW_COUNT} demo reviews
          </p>
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900 sm:text-3xl">
            Left right after a demo call with Austin
          </h2>
          <p className="mt-3 text-gray-600">
            Collected by TidyCal, our booking tool. First names only, the way
            TidyCal shows them.{" "}
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue hover:underline"
            >
              See them on TidyCal
            </a>
          </p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {DEMO_REVIEWS_WITH_TEXT.map((r) => (
            <figure
              key={r.id}
              className="mb-5 break-inside-avoid rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
            >
              <Stars size={16} />
              <blockquote className="mt-3 text-gray-700 leading-relaxed">
                &ldquo;{r.quotes[0]}&rdquo;
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                {r.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.photo}
                    alt={r.name}
                    className="h-9 w-9 flex-none rounded-full object-cover"
                  />
                )}
                <div className="text-sm">
                  <span className="font-bold text-gray-900">{r.name}</span>
                  {r.title && <span className="text-gray-600">, {r.title}</span>}
                  <span className="text-gray-500"> · {formatMonth(r.date)}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
