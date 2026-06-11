"use client";

// Reusable CTA sections — closers, not explainers. They sit below demo videos,
// at the bottom of free resources, and at other warm-traffic moments.
//
//   <CtaSection variant="primary" slot="replies-01" />
//   <CtaSection variant="slim" placement="resource" slot="guide-xyz" />
//
// Shared numbers come from components/cta/config.ts — never hardcode counts in
// instances. `slot` lands in data-cta-placement on the button so each
// placement's conversion can be compared.

import { useEffect, useState } from "react";
import { CTA_CONFIG } from "./config";

type CommonProps = {
  /** Page-or-slot name for click tracking (data-cta-placement). */
  slot: string;
  /** Override the signup URL, e.g. to carry per-page UTM params. */
  href?: string;
};

type PrimaryProps = CommonProps & {
  variant: "primary";
  /** The "Are you looking for paid speaking engagements? 👇" transition line.
   *  On by default — disable if the page provides its own lead-in. */
  leadIn?: boolean;
};

type SlimProps = CommonProps & {
  variant: "slim";
  placement?: "demo" | "resource" | "generic";
};

export type CtaSectionProps = PrimaryProps | SlimProps;

const { EVENT_COUNT, FREE_UNLOCKS, CTA_URL } = CTA_CONFIG;

const RESULTS = [
  {
    label: "First meeting booked in 3 days using SpeakerDrive",
    src: "/3rd_day-mh.png",
  },
  { label: "7 minutes from outreach to booking", src: "/7mins_meeting-mh.png" },
  { label: "$45K corporate training budget approved", src: "/45k_event-mh.png" },
  { label: "$12.5K-$15K conference keynote booked", src: "/12k_keynote-mh.png" },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is SpeakerDrive?",
    answer:
      "Events actively booking speakers, the decision-maker's verified email, and outreach that gets replies — one platform.",
  },
  {
    question: "Won't the leads get saturated?",
    answer:
      "No. Unlock a lead and it's pulled from the platform for everyone else, three weeks minimum. The planner hears from you — not a crowd.",
  },
  {
    question: "How does “a month of outreach in one sitting” work?",
    answer:
      "Pick your events, add them to Autopilot. It sends 25–30 personalized emails a day with automatic follow-ups — and stops the moment someone replies.",
  },
  {
    question: "What's the actual ROI?",
    answer:
      "The most popular plan is $99/month. One $5,000 keynote covers four years of it.",
  },
  {
    question: "Am I signing a contract?",
    answer:
      "No. Month-to-month, cancel anytime. The trial doesn't even ask for a card.",
  },
];

const SLIM_COPY = {
  demo: {
    headline: "That was a demo account. Your events are in there too.",
    sub: `Search your niche free — ${EVENT_COUNT} opportunities, fee estimates included.`,
    button: "See For Yourself →",
    micro: `Free · no credit card · ${FREE_UNLOCKS} unlocks included`,
  },
  resource: {
    headline: "You've got the playbook. SpeakerDrive runs it.",
    sub: "Everything you just read — finding events, reaching decision-makers, following up — done in one sitting.",
    button: "Start Free →",
    micro: `No credit card · ${FREE_UNLOCKS} free unlocks`,
  },
  generic: {
    headline: "Find the event. Contact the event. Get booked.",
    sub: "SpeakerDrive handles the first two. The stage is yours.",
    button: "Start Free →",
    micro: `No credit card · ${FREE_UNLOCKS} free unlocks`,
  },
} as const;

export function ScreenshotModal({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 cursor-zoom-out overflow-auto bg-black/80 p-3 backdrop-blur-sm sm:p-8"
    >
      <button
        onClick={onClose}
        aria-label="Close screenshot"
        className="fixed right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="mx-auto my-auto min-h-full w-full max-w-3xl rounded-lg object-contain sm:min-h-0"
      />
    </div>
  );
}

export function CtaButton({
  href,
  slot,
  label = "Get Started. It's FREE",
  emoji = "🚀",
}: {
  href: string;
  slot: string;
  label?: string;
  emoji?: string;
}) {
  return (
    <a
      href={href}
      data-cta-placement={slot}
      className="cta-button animated-gradient inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
    >
      {label} {emoji && <span className="ml-2">{emoji}</span>}
    </a>
  );
}

export function CtaSection(props: CtaSectionProps) {
  const href = props.href ?? CTA_URL;
  const [modal, setModal] = useState<{ src: string; alt: string } | null>(null);

  if (props.variant === "slim") {
    const copy = SLIM_COPY[props.placement ?? "generic"];
    return (
      <div className="rounded-2xl border border-gray-200 bg-blue-50/40 p-8">
        <div className="flex flex-col items-start gap-6 min-[960px]:flex-row min-[960px]:items-center min-[960px]:justify-between">
          <div>
            <p className="text-[24px] font-bold leading-snug text-gray-900">
              {copy.headline}
            </p>
            <p className="mt-1.5 text-[15px] text-gray-500">{copy.sub}</p>
          </div>
          <div className="w-full flex-shrink-0 text-center min-[960px]:w-auto">
            <a
              href={href}
              data-cta-placement={props.slot}
              className="cta-button animated-gradient inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 px-6 py-3 text-lg font-bold text-white shadow-md min-[960px]:w-auto"
            >
              {copy.button}
            </a>
            <p className="mt-2 text-xs text-gray-400">{copy.micro}</p>
          </div>
        </div>
      </div>
    );
  }

  const { leadIn = true } = props;

  return (
    <section className="container mx-auto max-w-6xl px-4 text-center">
      {/* Lead-in — rolls the page content into the pitch */}
      {leadIn && (
        <p className="text-xl font-semibold text-gray-900">
          Are you looking for paid speaking engagements?{" "}
          <span aria-hidden="true">👇</span>
        </p>
      )}

      {/* Header — same treatment as the homepage map section */}
      <div className={leadIn ? "mt-12" : ""}>
        <p className="mb-4 text-base font-semibold uppercase tracking-wide text-gray-600 sm:text-lg">
          Free Trial · No Credit Card
        </p>
        <h2 className="mb-6 text-3xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
          Stop Waiting on Referrals.
          <br className="hidden sm:block" />{" "}
          <span className="bg-gradient-to-r from-brand-blue via-blue-500 to-green-500 bg-clip-text text-transparent">
            Go Get the Gig.
          </span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg font-medium text-gray-600 sm:text-xl">
          Referrals are great, until the calendar goes quiet.
        </p>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-600">
          SpeakerDrive puts you directly in front of the decision-makers with
          real budgets, writes the outreach, and follows up automatically. You
          just pick up the conversations that come back.
        </p>
      </div>

      {/* Results — same block as the get-the-list page */}
      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm sm:p-7">
        <p className="font-semibold text-gray-900">Real speakers, real results:</p>
        <ul className="ml-1 mt-3 space-y-2 text-gray-600">
          {RESULTS.map((r) => (
            <li key={r.src} className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                {r.label}{" "}
                <button
                  onClick={() => setModal({ src: r.src, alt: r.label })}
                  className="font-medium text-purple-600 underline hover:text-purple-700"
                >
                  [view screenshot →]
                </button>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm italic text-gray-500">
          *Screenshots shared with permission
        </p>
        <p className="mt-3 text-gray-600">
          Direct outreach means direct results.
        </p>
      </div>

      {/* CTA — homepage hero button */}
      <div className="mt-9 text-center">
        <CtaButton href={href} slot={props.slot} />
        <div className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-gray-600">
          <p>
            SpeakerDrive is $99/month after a 7 day trial. 30 seconds to sign
            up. No credit card needed. No tricks, no contracts.
          </p>
          <p className="mt-3 font-medium text-gray-800">
            One $5K speaking gig covers 4 years of membership. Do the math.
          </p>
        </div>
      </div>

      {/* FAQ — two plain columns, easy to read */}
      <div className="mx-auto mt-16 grid max-w-4xl gap-x-14 gap-y-10 text-left sm:grid-cols-2">
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <h3 className="text-[17px] font-semibold text-gray-900">
              {faq.question}
            </h3>
            <p className="mt-2 leading-relaxed text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      {modal && (
        <ScreenshotModal
          src={modal.src}
          alt={modal.alt}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
