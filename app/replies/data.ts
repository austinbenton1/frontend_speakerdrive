// Template Teardown entries — one per weekly LinkedIn "TEMPLATE" post.
//
// To add a week:
//   1. Drop the thread screenshot in /public/replies/<slug>.png
//   2. Add an entry below (sections 1–4 of the page). Section 5 (the
//      SpeakerDrive pivot + CTA) is shared and lives in the page itself.
//   3. Send people to speakerdrive.com/replies/<slug>
//
// Anonymity check, every entry:
//   - Neutral numbered slug (01, 02, ...) — never event-identifying
//   - No org/event identifiers in page copy
//   - Screenshot blur covers org name, subject line, sender details, and
//     exact dates. The copy and the image have to agree — one leak undoes
//     the other.

export type TemplateSegment = {
  /** 1–4 → renders ①–④ in the gutter, matching the teardown */
  marker?: 1 | 2 | 3 | 4;
  text: string;
};

/** A paragraph is a group of segments with no blank line between them. */
export type TemplateParagraph = TemplateSegment[];

export type TeardownItem = {
  marker: 1 | 2 | 3 | 4;
  title: string;
  /** The line from the real email, shown as a pull-quote */
  quote?: string;
  /** Small accent badge, e.g. "The line that earned the reply" */
  badge?: string;
  paragraphs: string[];
};

export type ReplyEntry = {
  slug: string;
  /** Section 1 */
  eyebrow: string;
  headline: string;
  sub: string;
  /** Section 2 — path under /public */
  screenshot: string;
  screenshotAlt: string;
  caption: string;
  /** Section 3 */
  templateIntro: string;
  template: TemplateParagraph[];
  /** Section 4 */
  teardown: TeardownItem[];
  leavesOut: string;
};

export const REPLY_ENTRIES: ReplyEntry[] = [
  {
    slug: "01",
    eyebrow: "You commented “TEMPLATE” — here it is.",
    headline: "The 4-sentence email that got a yes",
    sub: "Sent cold to a senior event planner. Here's the email — and a quick breakdown of why it worked.",
    screenshot: "/replies/01.png",
    screenshotAlt:
      "Email thread: an event planner replying “Yes, please send over a clip” to a four-sentence cold email",
    caption: "The actual thread.",
    templateIntro:
      "Brackets are where your research goes. (More on that in a minute — it matters.)",
    template: [
      [{ text: "Hello [First Name]," }],
      [
        { marker: 1, text: "I just saw [Event Name] (looks [compliment])." },
        {
          marker: 2,
          text: "I'm a speaker in this space, and have a talk that'd fit your [their audience].",
        },
        {
          marker: 3,
          text: "[One line naming the real problem that audience faces.]",
        },
      ],
      [
        {
          text: "I know your audience [what's at stake for them]. [One short line on why you're credible on exactly that.]",
        },
      ],
      [
        {
          marker: 4,
          text: "If you're still open to ideas for the event, can I send over a quick clip?",
        },
      ],
      [{ text: "– [Your Name]" }],
    ],
    teardown: [
      {
        marker: 1,
        title: "It opens in their world, not yours.",
        quote: "I just saw [Event Name] (looks [compliment]).",
        paragraphs: [
          "So many speaker pitches open with credentials — that's about you. This opens with their event, plus a small compliment. It doesn't need to be clever: even a one-word “(looks great)” takes the edge off a cold email. By the end of line one, it doesn't read like a pitch anymore.",
        ],
      },
      {
        marker: 2,
        title: "Relevance in one sentence. Then it stops.",
        quote: "…a talk that'd fit your workplace safety leaders.",
        paragraphs: [
          "A planner scanning their inbox is asking exactly one question: is this for my people? Answer it and move on. No logos, no “as seen on,” no bio paragraph.",
        ],
      },
      {
        marker: 3,
        title: "It names the room's real problem.",
        quote: "When the pressure is on, even experienced teams can lose their edge.",
        badge: "The line that earned the reply",
        paragraphs: [
          "Notice this isn't about the talk topic. It's about the people in the seats — and what the planner worries about on their behalf. This is the line that makes a planner think this person gets my event.",
          "It's also the one line you can't write without actually knowing the audience.",
        ],
      },
      {
        marker: 4,
        title: "The ask fits inside a five-second yes.",
        quote: "Can I send over a quick clip?",
        paragraphs: [
          "Not “book me.” Not “15 minutes this week?” A clip costs the planner nothing. And “if you're still open to ideas” hands them an easy out — which, counterintuitively, raises the yes rate.",
          "The entire email exists to set up this one small ask.",
        ],
      },
    ],
    leavesOut:
      "No fee. No attachments. No three-paragraph bio. No calendar link. Every line cut makes the yes easier. The restraint is the strategy.",
  },
];

export function getReplyEntry(slug: string): ReplyEntry | undefined {
  return REPLY_ENTRIES.find((e) => e.slug === slug);
}

/** Plain text of the template (no markers) for the copy button. */
export function templateAsPlainText(entry: ReplyEntry): string {
  return entry.template
    .map((para) => para.map((seg) => seg.text).join(" "))
    .join("\n\n");
}
