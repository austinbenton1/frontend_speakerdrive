// Single source of truth for every CTA section instance across the site.
// Update here, never in individual pages.

export const CTA_CONFIG = {
  /** Confirm current live count before big launches */
  EVENT_COUNT: "16,000+",
  /** Platform-wide average. If we stop publishing it, flip USE_REPLY_RATE_STAT below. */
  REPLY_RATE: "4.5–6.5%",
  FREE_UNLOCKS: "6",
  CTA_URL: "https://app.speakerdrive.com/signup",
  /** Until the anonymized planner-reply asset exists, instances fall back to the
   *  fee-band card — money on screen is the next-best proof. */
  PRIMARY_IMAGE: "/Opportunity Profile-mh.png",
  PRIMARY_IMAGE_ALT:
    "SpeakerDrive opportunity profile showing an estimated fee range of $7,500–$20,000",
} as const;

/** Stat 2 fallback: set false to swap the reply-rate stat for the fee-potential stat. */
export const USE_REPLY_RATE_STAT = true;
