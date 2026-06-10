import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/cta/CtaSection";
import { Footer5 } from "@/components/layout/Footer";
import {
  getReplyEntry,
  REPLY_ENTRIES,
  templateAsPlainText,
} from "../data";
import { CopyTemplateButton, ScreenshotLightbox } from "../ui";

// Section 5 is constant across weekly entries.
const BRACKET_ROWS: { chip: string; fill: React.ReactNode }[] = [
  {
    chip: "[Event Name]",
    fill: "A living database of events actively booking speakers — new opportunities added and verified daily",
  },
  {
    chip: "[First Name]",
    fill: "The person behind the event — scored by how close they sit to the booking decision",
  },
  {
    chip: "their email",
    fill: "Verified before it ever reaches you — and auto-refunded if one ever bounces",
  },
  {
    chip: "[what their audience worries about]",
    fill: null, // rendered inline so the ③ marker can be embedded
  },
];

const serif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

// Single accent for markers + CTA (matches ui.tsx)
const ACCENT = "#0B82DD";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return REPLY_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const entry = getReplyEntry((await params).slug);
  if (!entry) return {};
  return {
    title: `${entry.headline} | SpeakerDrive`,
    description: entry.sub,
  };
}

function MarkerCircle({
  n,
  size = "sm",
}: {
  n: number;
  size?: "sm" | "lg";
}) {
  return (
    <span
      aria-label={`Point ${n}`}
      style={{ color: ACCENT, borderColor: ACCENT }}
      className={
        size === "lg"
          ? "flex h-7 w-7 flex-shrink-0 select-none items-center justify-center rounded-full border-2 text-sm font-bold"
          : "flex h-5 w-5 flex-shrink-0 select-none items-center justify-center rounded-full border text-[11px] font-bold"
      }
    >
      {n}
    </span>
  );
}

export default async function ReplyTeardownPage({
  params,
}: {
  params: Params;
}) {
  const entry = getReplyEntry((await params).slug);
  if (!entry) notFound();

  const ctaHref = `https://app.speakerdrive.com/signup?utm_source=linkedin&utm_medium=template-comment&utm_campaign=${entry.slug}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <div className="flex justify-center pt-10 pb-8">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/SpeakerDrive Logo - Long.png"
            alt="SpeakerDrive"
            className="h-9"
          />
        </Link>
      </div>

      <article className="mx-auto max-w-[640px] px-5 pb-4">
        {/* ============ Section 1 — Header ============ */}
        <header>
          <p
            style={{ color: ACCENT }}
            className="text-[13px] font-bold uppercase tracking-[0.08em]"
          >
            {entry.eyebrow}
          </p>
          <h1
            className={`${serif.className} mt-3 text-[2.1rem] font-bold leading-[1.12] text-gray-900 sm:text-[2.6rem]`}
          >
            {entry.headline}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-gray-600">
            {entry.sub}
          </p>

          {/* Byline */}
          <div className="mt-6 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/austin_benton_headshot.png"
              alt="Austin Benton"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-gray-900">
                Austin Benton
              </p>
              <p className="text-sm text-gray-500">Founder, SpeakerDrive</p>
            </div>
          </div>
        </header>

        {/* ============ Section 2 — Proof ============ */}
        <section className="mt-8">
          <ScreenshotLightbox
            src={entry.screenshot}
            alt={entry.screenshotAlt}
            caption={entry.caption}
          />
        </section>

        {/* ============ Section 3 — The Template ============ */}
        <section className="mt-14">
          <h2
            className={`${serif.className} text-[1.65rem] font-bold leading-tight text-gray-900 sm:text-3xl`}
          >
            The template
          </h2>
          <p className="mt-2 text-gray-600">{entry.templateIntro}</p>

          <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Cold email · 4 sentences
              </span>
              <CopyTemplateButton text={templateAsPlainText(entry)} />
            </div>
            <div className="px-4 py-5 font-mono text-[13px] leading-[1.7] text-gray-800 sm:px-5 sm:text-sm">
              {entry.template.map((para, pi) => (
                <div key={pi} className={pi > 0 ? "mt-4" : undefined}>
                  {para.map((seg, si) => (
                    <div key={si} className="flex gap-2.5 sm:gap-3">
                      <span className="mt-[3px] w-5 flex-shrink-0">
                        {seg.marker ? <MarkerCircle n={seg.marker} /> : null}
                      </span>
                      <span className="min-w-0 flex-1">{seg.text}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ Section 4 — The Teardown ============ */}
        <section className="mt-14">
          <h2
            className={`${serif.className} text-[1.65rem] font-bold leading-tight text-gray-900 sm:text-3xl`}
          >
            Why it worked
          </h2>

          <div className="mt-7 space-y-9">
            {entry.teardown.map((item) => (
              <div key={item.marker} className="flex gap-3.5 sm:gap-4">
                <div className="pt-0.5">
                  <MarkerCircle n={item.marker} size="lg" />
                </div>
                <div className="min-w-0 flex-1">
                  {item.badge && (
                    <p
                      style={{ color: ACCENT }}
                      className="mb-1 text-xs font-bold uppercase tracking-wide"
                    >
                      ← {item.badge}
                    </p>
                  )}
                  <h3 className="text-lg font-bold leading-snug text-gray-900">
                    {item.title}
                  </h3>
                  {item.quote && (
                    <p
                      style={{ borderColor: ACCENT }}
                      className={`${serif.className} mt-2 border-l-2 pl-3 text-[17px] italic leading-snug text-gray-700`}
                    >
                      “{item.quote}”
                    </p>
                  )}
                  {item.paragraphs.map((p, i) => (
                    <p key={i} className="mt-2.5 leading-relaxed text-gray-600">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* What it leaves out */}
          <div className="mt-10 rounded-xl bg-gray-50 px-5 py-4">
            <p className="leading-relaxed text-gray-700">
              <strong className="font-bold text-gray-900">
                What it leaves out:
              </strong>{" "}
              {entry.leavesOut}
            </p>
          </div>
        </section>

        {/* ============ Section 5 — The Pivot (shared) ============ */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <h2
            className={`${serif.className} text-[1.65rem] font-bold leading-tight text-gray-900 sm:text-3xl`}
          >
            The template is the easy part
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            Look back at the brackets. Every one of them is research the
            template can&apos;t do for you — and per send, it&apos;s the
            difference between 30 seconds and 30 minutes of digging. It&apos;s
            where outreach quietly dies.
          </p>

          {/* Bracket chips → what fills them */}
          <div className="mt-6 divide-y divide-gray-100 rounded-xl border border-gray-200 bg-gray-50 px-4 sm:px-5">
            {BRACKET_ROWS.map((row) => (
              <div
                key={row.chip}
                className="flex flex-col gap-1.5 py-3.5 sm:flex-row sm:items-baseline sm:gap-3"
              >
                <span className="flex flex-shrink-0 items-baseline gap-2 sm:w-[200px]">
                  <code className="rounded-md border border-gray-200 bg-white px-1.5 py-0.5 font-mono text-[12px] leading-relaxed text-gray-800">
                    {row.chip}
                  </code>
                  <span aria-hidden="true" className="text-gray-400">
                    →
                  </span>
                </span>
                <span className="text-[15px] leading-relaxed text-gray-600">
                  {row.fill ?? (
                    <>
                      Event and audience context pulled from the web — so the
                      hardest line,{" "}
                      <span className="inline-flex translate-y-[3px]">
                        <MarkerCircle n={3} />
                      </span>
                      , writes itself
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 leading-relaxed text-gray-600">
            <p>
              Here&apos;s the part you couldn&apos;t see in the screenshot:
              that email wasn&apos;t written by hand. SpeakerDrive drafted it —
              the event, the planner, the verified email, the audience context,
              all four sentences — and the speaker reviewed it and hit approve.
              The teardown you just read isn&apos;t a writing lesson. It&apos;s
              the spec the product runs on.
            </p>
            <p>
              One more thing, since you&apos;re holding the template now: when
              a lead gets unlocked in SpeakerDrive, it comes off the board for
              every other user — for a minimum of three full weeks (21 days).
              Kelly got one email, not the same pitch from forty speakers.
            </p>
          </div>

        </section>
      </article>

      {/* Shared closer — results, pricing, FAQ live in components/cta */}
      <div className="mt-16">
        <CtaSection
          variant="primary"
          slot={`replies-${entry.slug}`}
          href={ctaHref}
        />
      </div>

      <p className="mx-auto max-w-[640px] px-5 pt-10 text-sm italic leading-relaxed text-gray-500">
        P.S. Before SpeakerDrive, I spent years booking speakers at a bureau —
        doing this exact research by hand. This product is that work,
        automated. — Austin
      </p>

      <div className="mt-6">
        <Footer5 />
      </div>
    </div>
  );
}
