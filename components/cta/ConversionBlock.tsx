"use client";

// Conversion Block — the full lower-funnel closer designed in Claude Design
// ("Conversion Block" design component). Hero pitch panel → proof → FAQ →
// ROI calculator → sticky bottom bar. Appended below free resources, reply
// teardowns, and video pages to convert warm viewers into trial signups.
//
//   <ConversionBlock campaign="replies-01" />
//
// Markup and inline styles are a 1:1 port of the design export; the only
// intentional departures are the real reply screenshots in the proof grid
// (the design carried schematic placeholders) and the shared CtaButton.
// Render inline, never in an iframe — the sticky bar pins to the viewport.

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { CtaButton } from "./CtaSection";

// $99 × 12 — keep in sync with the "How much does it cost?" FAQ answer.
const ANNUAL_COST = 1188;

const BLUE_GREEN_GRADIENT =
  "linear-gradient(95deg, #3CB4FF 0%, #2A8FF0 42%, #00C853 100%)";

const bold: React.CSSProperties = { fontWeight: 700, color: "#111827" };

const CHECKLIST: React.ReactNode[] = [
  <>
    Every event hiring speakers, <b style={bold}>in one place</b>
  </>,
  <>
    Decision maker outreach <b style={bold}>in one click</b>
  </>,
  <>
    <b style={bold}>Verified emails</b> — no digging, no guessing
  </>,
  <>
    A <b style={bold}>full month of custom outreach</b> in one sitting
  </>,
  <>
    Break the <b style={bold}>feast-or-famine</b> referral cycle
  </>,
];

const RESULTS: React.ReactNode[] = [
  <>
    <b style={bold}>First meeting booked in 3 days</b> using SpeakerDrive
  </>,
  <>
    <b style={bold}>7 minutes</b> from outreach to booking
  </>,
  <>
    <b style={bold}>$45K corporate training budget</b> approved
  </>,
  <>
    <b style={bold}>$12.5K–$15K conference keynote</b> booked
  </>,
];

const SHOTS = [
  {
    href: "/replies/01",
    src: "/3rd_day-mh.png",
    chip: "3 days",
    alt: "First meeting — 3 days",
  },
  {
    href: "/replies/02",
    src: "/7mins_meeting-mh.png",
    chip: "7 min",
    alt: "Outreach to booking — 7 min",
  },
  {
    href: "/replies/03",
    src: "/45k_event-mh.png",
    chip: "$45K",
    alt: "$45K budget approved",
  },
  {
    href: "/replies/04",
    src: "/12k_keynote-mh.png",
    chip: "$12.5–15K",
    alt: "$12.5K–$15K keynote",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is SpeakerDrive?",
    answer:
      "SpeakerDrive is email outreach software that helps keynote speakers find the events and get hired to speak, on their terms.",
  },
  {
    question: "How does it work?",
    answer:
      "Pick your events, and let our Autopilot feature handle the rest. It sends customized emails per day with follow-ups included, and stops the moment someone replies.",
  },
  {
    question: "Won't the leads get saturated?",
    answer:
      "No. Unlock a lead and it's pulled from the platform for everyone else, three weeks minimum. The planner hears from you — not a crowd.",
  },
  {
    question: "Where do replies go?",
    answer:
      "Straight to your regular inbox — the one you already work in. When a planner responds, you just hit reply like any normal conversation.",
  },
  {
    question: "Is getting set up hard?",
    answer:
      "No. Connect your email, pick your first events, and you're sending in about 5 minutes. Nothing to install, nothing technical.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Most people start at $99/month — that's 200 leads, enough to keep you satisfyingly busy.",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00C853"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: 20, height: 20, flex: "none", marginTop: 2 }}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  );
}

export function ConversionBlock({
  campaign,
  utmSource = "free-resources",
  utmMedium = "embed",
}: {
  /** Per-page campaign slug, e.g. "replies-01" — lands in utm_campaign. */
  campaign: string;
  utmSource?: string;
  utmMedium?: string;
}) {
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const roiRef = useRef<HTMLElement>(null);
  const heroShotRef = useRef<HTMLDivElement>(null);
  const [fee, setFee] = useState(10000);
  const [showSticky, setShowSticky] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Same tilt-up-on-scroll as the homepage hero shot (Hero.tsx), retargeted
  // to this panel: leans back 35° entering the viewport, upright by center.
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroShotRef,
    offset: ["start end", "end center"],
  });
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [35, 0],
  );

  // Same slug cleanup the design's setUtmCampaign() applied.
  const slug =
    campaign
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_ ]/g, "")
      .replace(/\s+/g, "-") || "resource";
  const signupUrl = `https://app.speakerdrive.com/signup?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${slug}`;

  useEffect(() => {
    try {
      if (sessionStorage.getItem("sd_sticky_dismissed") === "1") {
        setDismissed(true);
        return;
      }
    } catch {}

    const evalSticky = () => {
      const heroBottom =
        heroCtaRef.current?.getBoundingClientRect().bottom ?? 600;
      const roiTop = roiRef.current?.getBoundingClientRect().top ?? Infinity;
      setShowSticky(heroBottom < 0 && roiTop > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", evalSticky, { passive: true });
    window.addEventListener("resize", evalSticky);
    evalSticky();
    return () => {
      window.removeEventListener("scroll", evalSticky);
      window.removeEventListener("resize", evalSticky);
    };
  }, []);

  const dismissSticky = () => {
    setDismissed(true);
    setShowSticky(false);
    try {
      sessionStorage.setItem("sd_sticky_dismissed", "1");
    } catch {}
  };

  const fmt = (n: number) => "$" + n.toLocaleString("en-US");
  const years = fee / ANNUAL_COST;
  const yearStr = years >= 10 ? String(Math.round(years)) : years.toFixed(1);
  const yearsLabel = `${yearStr} ${parseFloat(yearStr) === 1 ? "year" : "years"}`;
  const costW =
    Math.max(4, Math.min(100, (ANNUAL_COST / fee) * 100)).toFixed(1) + "%";
  const stickyVisible = showSticky && !dismissed;

  return (
    <div className="sdcb" style={{ background: "#ffffff", color: "#111827" }}>
      {/* Hover states, slider chrome, and reduced-motion — ported from the
          design export's stylesheet, scoped under .sdcb. */}
      <style>{`
        .sdcb .shot:hover > .shot-frame { border-color: #b9dcfb; box-shadow: 0 6px 16px -10px rgba(15,23,42,0.25); }
        .sdcb .li-link:hover { text-decoration: underline !important; }
        .sdcb .sb-btn { transition: transform .25s cubic-bezier(0.17,0.67,0.35,1.25), box-shadow .25s cubic-bezier(0.17,0.67,0.35,1.25); }
        .sdcb .sb-btn:hover { transform: translateY(-2px) scale(1.02); }
        .sdcb .close-x:hover { color: #ffffff; background: rgba(255,255,255,0.08); }
        .sdcb input[type="range"].roi-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 7px; border-radius: 999px; background: #E5E7EB; outline: none; margin: 18px 0 6px; }
        .sdcb input[type="range"].roi-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 24px; height: 24px; border-radius: 50%; background: #ffffff; border: 3px solid #3CB4FF; cursor: pointer; box-shadow: 0 3px 10px rgba(42,143,240,0.4); transition: transform .15s; }
        .sdcb input[type="range"].roi-slider::-webkit-slider-thumb:hover { transform: scale(1.1); }
        .sdcb input[type="range"].roi-slider::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: #ffffff; border: 3px solid #3CB4FF; cursor: pointer; }
        @media (prefers-reduced-motion: reduce) { .sdcb, .sdcb * { animation: none !important; } }
      `}</style>

      {/* ================================================== HERO */}
      <section style={{ padding: "64px 0 8px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
          <p
            style={{
              margin: "0 auto 18px",
              textAlign: "center",
              fontSize: "clamp(19px, 2.1vw, 22px)",
              fontWeight: 600,
              color: "#1F2937",
              letterSpacing: "-0.01em",
              maxWidth: 620,
            }}
          >
            How to land more keynotes with SpeakerDrive{" "}
            <span aria-hidden="true">👇</span>
          </p>

          <h1
            style={{
              margin: "0 auto 24px",
              maxWidth: 980,
              textAlign: "center",
              fontWeight: 800,
              fontSize: "clamp(38px, 5.2vw, 60px)",
              lineHeight: 1.06,
              letterSpacing: "-0.025em",
              textWrap: "balance",
            }}
          >
            Stop Waiting on Referrals.
            <span
              style={{
                display: "block",
                background: BLUE_GREEN_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Go Get the Gig.
            </span>
          </h1>

          <p
            style={{
              margin: "0 auto",
              textAlign: "center",
              fontSize: "clamp(20px, 2.4vw, 25px)",
              fontWeight: 600,
              color: "#1F2937",
              letterSpacing: "-0.015em",
              maxWidth: 760,
            }}
          >
            Referrals are great (until the calendar goes quiet).
          </p>

          <div
            style={{
              marginTop: 44,
              background: "#FAFAF9",
              border: "1px solid #E5E7EB",
              borderRadius: 20,
              padding: "clamp(28px, 4.5vw, 56px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "40px 48px",
            }}
          >
            <div style={{ flex: "9 1 340px", minWidth: 0 }}>
              <p
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  color: "#111827",
                  margin: "0 0 16px",
                }}
              >
                Why Use SpeakerDrive?
              </p>
              <div style={{ display: "grid", gap: 12, textAlign: "left" }}>
                {CHECKLIST.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 11,
                      alignItems: "flex-start",
                      fontSize: 16.5,
                      lineHeight: 1.5,
                      color: "#374151",
                    }}
                  >
                    <CheckIcon />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div
                ref={heroCtaRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 11,
                  marginTop: 26,
                }}
              >
                {/* design gives CTAs white-space: nowrap; inherits into the <a> */}
                <span style={{ whiteSpace: "nowrap" }}>
                  <CtaButton href={signupUrl} slot={`${slug}-block-hero`} />
                </span>
                <p
                  style={{
                    fontSize: 14,
                    color: "#6B7280",
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  <strong style={{ color: "#374151", fontWeight: 600 }}>
                    30 seconds to sign up.
                  </strong>{" "}
                  No credit card.
                </p>
              </div>
            </div>

            <div
              ref={heroShotRef}
              style={{ flex: "11 1 400px", minWidth: 0, perspective: 1000 }}
            >
              <motion.div
                style={{
                  rotateX,
                  transformOrigin: "center bottom",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/new_hero_image.png"
                  alt="SpeakerDrive dashboard overview"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 12,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  }}
                />
              </motion.div>
            </div>

            <div
              style={{
                flex: "1 1 100%",
                minWidth: 0,
                borderTop: "1px solid #E5E7EB",
                paddingTop: 28,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div style={{ maxWidth: 620, minWidth: 0 }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: "#4B5563",
                  }}
                >
                  &ldquo;Over my career, I&apos;ve generated leads that became
                  $6M+ in booked and paid keynotes. I&apos;ve simplified
                  everything I know into one platform.&rdquo;
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginTop: 16,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/austin_benton_head.png"
                    alt="Austin Benton"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      objectFit: "cover",
                      display: "block",
                      flex: "none",
                    }}
                  />
                  <div style={{ display: "grid", gap: 3 }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#111827",
                        lineHeight: 1.2,
                      }}
                    >
                      Austin Benton
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: "#6B7280",
                        lineHeight: 1.2,
                      }}
                    >
                      Founder, SpeakerDrive
                    </span>
                    <a
                      className="li-link"
                      href="https://www.linkedin.com/in/austin-benton/"
                      target="_blank"
                      rel="noopener"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#0A66C2",
                        textDecoration: "none",
                        lineHeight: 1.2,
                        marginTop: 2,
                      }}
                    >
                      <svg
                        width={12}
                        height={12}
                        viewBox="0 0 24 24"
                        fill="#0A66C2"
                        aria-hidden="true"
                      >
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                      </svg>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== PROOF */}
      <section style={{ padding: "56px 0 8px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 32px" }}>
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              margin: "0 0 14px",
              color: "#111827",
            }}
          >
            SpeakerDrive customers are landing keynotes RIGHT NOW:
          </p>
          <div style={{ display: "grid", gap: 11 }}>
            {RESULTS.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "#374151",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#9CA3AF",
                    flex: "none",
                    marginTop: 9,
                  }}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 10,
            }}
          >
            {SHOTS.map((s) => (
              <a
                key={s.href}
                className="shot"
                href={s.href}
                target="_blank"
                rel="noopener"
                style={{ textDecoration: "none", display: "block" }}
              >
                <span
                  className="shot-frame"
                  style={{
                    display: "block",
                    height: 110,
                    border: "1px solid #E5E7EB",
                    borderRadius: 8,
                    background: "#ffffff",
                    overflow: "hidden",
                    transition: "border-color .15s, box-shadow .15s",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.src}
                    alt={s.alt}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </span>
                <span
                  style={{
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: "#1F2937",
                      background: "#F3F4F6",
                      border: "1px solid #E5E7EB",
                      borderRadius: 999,
                      padding: "2px 9px",
                    }}
                  >
                    {s.chip}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#2563EB",
                      whiteSpace: "nowrap",
                    }}
                  >
                    View reply →
                  </span>
                </span>
              </a>
            ))}
          </div>

          <p
            style={{
              margin: "14px 0 0",
              fontSize: 13,
              color: "#9CA3AF",
              fontStyle: "italic",
            }}
          >
            *Screenshots shared with permission
          </p>
        </div>
      </section>

      {/* ================================================== FAQ */}
      <section style={{ padding: "56px 0 8px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              textAlign: "center",
              margin: "0 0 8px",
              fontWeight: 800,
              fontSize: "clamp(26px, 3.2vw, 34px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Frequently Asked Questions
          </h2>

          <div
            style={{
              marginTop: 32,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
              columnGap: 52,
              rowGap: 30,
            }}
          >
            {FAQS.map((faq) => (
              <div key={faq.question}>
                <h4
                  style={{
                    margin: "0 0 8px",
                    fontSize: 16.5,
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: "#111827",
                  }}
                >
                  {faq.question}
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "#4B5563",
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================== ROI */}
      <section ref={roiRef} style={{ padding: "56px 0 64px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>
          <h2
            style={{
              textAlign: "center",
              margin: "0 auto",
              maxWidth: 720,
              fontWeight: 800,
              fontSize: "clamp(26px, 3.4vw, 36px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              textWrap: "balance",
            }}
          >
            One <span style={{ whiteSpace: "nowrap" }}>{fmt(fee)}</span> gig
            pays for{" "}
            <span
              style={{
                whiteSpace: "nowrap",
                background: BLUE_GREEN_GRADIENT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {yearsLabel}
            </span>{" "}
            of SpeakerDrive.
          </h2>
          <p
            style={{
              textAlign: "center",
              margin: "12px auto 0",
              maxWidth: 520,
              fontSize: 16,
              lineHeight: 1.6,
              color: "#4B5563",
            }}
          >
            Drag your average speaking fee — the headline does the math.
          </p>

          <div
            style={{
              margin: "28px auto 0",
              maxWidth: 680,
              border: "1px solid #E5E7EB",
              borderRadius: 14,
              background: "#ffffff",
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: "#4B5563" }}>
                Your average speaking fee
              </span>
              <span
                style={{
                  fontSize: 19,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#111827",
                }}
              >
                {fmt(fee)}
              </span>
            </div>
            <input
              className="roi-slider"
              type="range"
              min={1000}
              max={25000}
              step={500}
              value={fee}
              onChange={(e) => setFee(parseInt(e.target.value, 10))}
              aria-label="Your average speaking fee"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#9CA3AF",
              }}
            >
              <span>$1K</span>
              <span>$25K</span>
            </div>

            <div
              style={{
                marginTop: 22,
                display: "grid",
                gap: 12,
                textAlign: "left",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13.5,
                    fontWeight: 600,
                    marginBottom: 5,
                  }}
                >
                  <span>SpeakerDrive — one year</span>
                  <span style={{ color: "#6B7280" }}>$1,188</span>
                </div>
                <div
                  style={{
                    height: 14,
                    borderRadius: 999,
                    background: "#F3F4F6",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      background: "#9CA3AF",
                      transition: "width .35s cubic-bezier(0.16,1,0.3,1)",
                      width: costW,
                    }}
                  />
                </div>
              </div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 13.5,
                    fontWeight: 600,
                    marginBottom: 5,
                  }}
                >
                  <span>One booking</span>
                  <span>{fmt(fee)}</span>
                </div>
                <div
                  style={{
                    height: 14,
                    borderRadius: 999,
                    background: "#F3F4F6",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 999,
                      background: BLUE_GREEN_GRADIENT,
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 11,
              marginTop: 30,
            }}
          >
            <span style={{ whiteSpace: "nowrap" }}>
              <CtaButton href={signupUrl} slot={`${slug}-block-roi`} />
            </span>
            <p
              style={{
                fontSize: 14,
                color: "#6B7280",
                textAlign: "center",
                maxWidth: 440,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              7-day free trial.{" "}
              <strong style={{ color: "#374151", fontWeight: 600 }}>
                No credit card needed.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* ================================================== STICKY BAR */}
      <div
        aria-hidden={!stickyVisible}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          transform: `translateY(${stickyVisible ? "0%" : "120%"})`,
          transition: "transform .4s cubic-bezier(0.16,1,0.3,1)",
          background: "rgba(15,23,42,0.97)",
          backdropFilter: "blur(8px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 -8px 30px rgba(15,23,42,0.2)",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{ color: "#ffffff", fontWeight: 600, fontSize: 15, flex: 1 }}
          >
            Ready to fill your calendar?{" "}
            <span style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
              7-day free trial · no credit card
            </span>
          </div>
          <a
            className="sb-btn"
            href={signupUrl}
            data-cta-placement={`${slug}-block-sticky`}
            tabIndex={stickyVisible ? 0 : -1}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 9,
              fontWeight: 700,
              fontSize: 15,
              color: "#ffffff",
              textDecoration: "none",
              whiteSpace: "nowrap",
              padding: "10px 20px",
              borderRadius: 10,
              background: BLUE_GREEN_GRADIENT,
              backgroundSize: "160% 160%",
              boxShadow: "0 8px 22px -6px rgba(42,143,240,0.5)",
              cursor: "pointer",
            }}
          >
            Start Free Trial
          </a>
          <button
            className="close-x"
            onClick={dismissSticky}
            aria-label="Dismiss"
            tabIndex={stickyVisible ? 0 : -1}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.5)",
              cursor: "pointer",
              padding: 6,
              lineHeight: 0,
              borderRadius: 6,
            }}
          >
            <svg
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
