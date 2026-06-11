import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConversionBlock } from "@/components/cta/ConversionBlock";
import { Footer5 } from "@/components/layout/Footer";
import {
  getReplyEntry,
  REPLY_ENTRIES,
  templateAsPlainText,
} from "../data";
import { CopyTemplateButton, ScreenshotLightbox } from "../ui";

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

      </article>

      {/* Shared closer — hero pitch, proof, FAQ, ROI live in components/cta */}
      <div className="mt-16">
        <ConversionBlock campaign={`replies-${entry.slug}`} />
      </div>

      <div className="mt-6">
        <Footer5 />
      </div>
    </div>
  );
}
