// Reusable CTA sections — closers, not explainers. They sit below demo videos,
// at the bottom of free resources, and at other warm-traffic moments. One job:
// kill the last three objections (cost, effort, saturation) and produce one click.
//
//   <CtaSection variant="primary" slot="replies-01" />
//   <CtaSection variant="slim" placement="resource" slot="guide-followup" />
//
// All numbers/strings come from components/cta/config.ts — never hardcode
// counts in instances. `slot` lands in data-cta-placement on the button so
// each placement's conversion can be compared.

import { CTA_CONFIG, USE_REPLY_RATE_STAT } from "./config";

type CommonProps = {
  /** Page-or-slot name for click tracking (data-cta-placement). */
  slot: string;
  /** Override the signup URL, e.g. to carry per-page UTM params. */
  href?: string;
};

type PrimaryProps = CommonProps & {
  variant: "primary";
  imageSrc?: string;
  imageAlt?: string;
  /** Small caption under the visual. Only pass when it matches the image
   *  (e.g. "A real reply, from a real planner. This is the whole point."
   *  once the reply screenshot exists). */
  imageCaption?: string;
  /** Green "Replied" pill on the visual — only with a reply screenshot. */
  showRepliedBadge?: boolean;
  /** Founder strip for lower-trust pages (free resources). Omit below demos. */
  founderStrip?: boolean;
};

type SlimProps = CommonProps & {
  variant: "slim";
  placement?: "demo" | "resource" | "generic";
};

export type CtaSectionProps = PrimaryProps | SlimProps;

const { EVENT_COUNT, REPLY_RATE, FREE_UNLOCKS, CTA_URL } = CTA_CONFIG;

const STATS: { big: string; label: string }[] = [
  {
    big: EVENT_COUNT,
    label:
      "Vetted events & decision-makers, with fee estimates. New opportunities added daily.",
  },
  USE_REPLY_RATE_STAT
    ? {
        big: REPLY_RATE,
        label: "Average reply rate across outreach sent on the platform.",
      }
    : {
        big: "$3K–$20K+",
        label:
          "Fee-potential estimates on every event, so you pitch where the budget is.",
      },
  {
    big: "1 speaker per lead",
    label:
      "Unlock a lead and it leaves the platform. You're never pitching alongside 50 other speakers.",
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

function CtaButton({
  label,
  href,
  slot,
  fullWidthMobile,
}: {
  label: string;
  href: string;
  slot: string;
  fullWidthMobile?: boolean;
}) {
  return (
    <a
      href={href}
      data-cta-placement={slot}
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 ${
        fullWidthMobile ? "w-full min-[960px]:w-auto" : ""
      }`}
    >
      {label}
    </a>
  );
}

export function CtaSection(props: CtaSectionProps) {
  const href = props.href ?? CTA_URL;

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
            <CtaButton
              label={copy.button}
              href={href}
              slot={props.slot}
              fullWidthMobile
            />
            <p className="mt-2 text-xs text-gray-400">{copy.micro}</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    imageSrc = CTA_CONFIG.PRIMARY_IMAGE,
    imageAlt = CTA_CONFIG.PRIMARY_IMAGE_ALT,
    imageCaption,
    showRepliedBadge,
    founderStrip,
  } = props;

  const visual = (
    <div>
      <div className="relative -rotate-[1.5deg]">
        {showRepliedBadge && (
          <span className="absolute -right-2 -top-2 z-10 rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white shadow-md">
            Replied
          </span>
        )}
        {/* Simple email-client frame */}
        <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-gray-100 bg-gray-50 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageSrc} alt={imageAlt} className="w-full" />
        </div>
      </div>
      {imageCaption && (
        <p className="mt-4 text-center text-xs text-white/50">{imageCaption}</p>
      )}
    </div>
  );

  return (
    <section className="bg-[#0F172A] text-white">
      <div className="mx-auto max-w-[1100px] px-6 py-14 min-[960px]:py-24">
        <div className="grid grid-cols-1 items-center gap-10 min-[960px]:grid-cols-[55fr_45fr] min-[960px]:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-blue">
              Free Trial · No Credit Card
            </p>
            <h2 className="mt-4 text-[32px] font-bold leading-[1.1] min-[960px]:text-[44px]">
              A Month of Outreach. One Sitting.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-white/80">
              Search {EVENT_COUNT} speaking opportunities. Unlock the
              decision-maker&apos;s verified email. SpeakerDrive writes bespoke
              outreach — their event, your expertise, your voice — and sends it
              on autopilot. You just pick up the conversations that come back.
            </p>

            {/* Visual sits here on mobile, right column on desktop */}
            <div className="mt-8 min-[960px]:hidden">{visual}</div>

            {/* Stat row — the numbers are the design */}
            <div className="mt-9 flex flex-col divide-y divide-white/15 min-[960px]:flex-row min-[960px]:divide-x min-[960px]:divide-y-0">
              {STATS.map((stat, i) => (
                <div
                  key={stat.big}
                  className={`py-4 min-[960px]:py-0 ${
                    i === 0
                      ? "min-[960px]:pr-6"
                      : i === STATS.length - 1
                        ? "min-[960px]:pl-6"
                        : "min-[960px]:px-6"
                  }`}
                >
                  <p
                    className={`text-[28px] font-bold leading-tight ${
                      stat.big.includes(" ") ? "" : "whitespace-nowrap"
                    }`}
                  >
                    {stat.big}
                  </p>
                  <p className="mt-1.5 text-sm leading-snug text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-9 text-[15px] text-white/80">
              Search your exact niche first. If your events aren&apos;t in
              there, you&apos;ve spent ten minutes and zero dollars.
            </p>

            <div className="mt-5">
              <CtaButton
                label="Start Free →"
                href={href}
                slot={props.slot}
                fullWidthMobile
              />
              <p className="mt-3 text-sm text-white/60">
                No credit card · {FREE_UNLOCKS} free lead unlocks · Set up in
                ~5 minutes
              </p>
            </div>

            {founderStrip && (
              <div className="mt-9 flex items-center gap-3 border-t border-white/10 pt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/austin_benton_headshot.png"
                  alt="Austin Benton"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <p className="text-sm leading-snug text-white/70">
                  Built by Austin Benton. I&apos;ve run lead generation for a
                  speaker bureau for 5+ years — SpeakerDrive is that entire
                  system, productized.
                </p>
              </div>
            )}
          </div>

          <div className="hidden min-[960px]:block">{visual}</div>
        </div>
      </div>
    </section>
  );
}
