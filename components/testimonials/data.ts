// Testimonials — the one place every customer quote on the site lives.
//
// Used by /reviews (all of it) and the slider under the calendar on /demo
// (the named ones). Add a name, title or headshot here and both pages pick it
// up; nothing in the layout files knows who is in the list.
//
// Rules (from the brain vault's testimonials bank, 2026-10-12):
//   - Quotes are verbatim. Do not tidy spelling, punctuation or dashes.
//   - A full name appears only with explicit permission (YES) or when the
//     words are already public under that name (a LinkedIn recommendation).
//   - Demo reviews (TidyCal) carry the first name only, as the booking page
//     shows them, until the person gives a full name.
//   - No photo until the person sends one. Drop the file in
//     public/testimonials/<id>.jpg and set `photo: "/testimonials/<id>.jpg"`.
//   - The page shows `shortName` ("Terri C."), never the full name.
//   - No invented stats: the rating numbers come from the entries below.

export type TestimonialSource = "email" | "linkedin" | "tidycal";

export type Testimonial = {
  id: string;
  /** Full name, for our records and the review markup. */
  name: string;
  /** What the page shows: first name + last initial, e.g. "Terri C.". */
  shortName?: string;
  /** Role / company line under the name. Leave out when we do not have one. */
  title?: string;
  /** Path under /public, e.g. "/testimonials/weston-brandon.jpg". */
  photo?: string;
  /** One paragraph per entry. Each is the person's exact words. */
  quotes: string[];
  /**
   * The cut the page shows when the full quote runs long: exact words from
   * `quotes`, with … where words are skipped. Leave out to show the full quote.
   */
  excerpt?: string[];
  /** Exact substrings of a quote to set in bold. Never new words. */
  emphasis?: string[];
  source: TestimonialSource;
  /** "YYYY-MM" — the month the words were written. */
  date: string;
  /** Stars left on TidyCal (demo reviews only). */
  rating?: 5;
};

/** Named customers, in the order they appear on /reviews and in the /demo slider. */
export const NAMED_TESTIMONIALS: Testimonial[] = [
  {
    id: "weston-brandon",
    photo: "/testimonials/weston-brandon.jpg",
    name: "Weston Brandon",
    shortName: "Weston B.",
    title: "Keynote speaker, Brandon Institute",
    quotes: [
      "I landed a breakout session for a conference (very modest honorarium but paid for a couple months worth of your platform) within the first 25 leads, and that session gets me in the room of the people I want to advertise to anyhow.",
      "By far my favorite part of this is that I can sit on my couch during commercial breaks of a college football game and set up outreach sequences for 5 to 10 organizations within the span of 5 minutes.",
    ],
    excerpt: [
      "I landed a breakout session for a conference … within the first 25 leads.",
      "I can sit on my couch during commercial breaks of a college football game and set up outreach sequences for 5 to 10 organizations within the span of 5 minutes.",
    ],
    emphasis: [
      "I landed a breakout session for a conference",
      "within the first 25 leads",
      "set up outreach sequences for 5 to 10 organizations within the span of 5 minutes",
    ],
    source: "email",
    date: "2026-08",
  },
  {
    id: "robert-siciliano",
    photo: "/testimonials/robert-siciliano.jpg",
    name: "Robert Siciliano, CSP",
    shortName: "Robert S.",
    title: "Cybersecurity keynote speaker",
    quotes: [
      "In my 30+ years in this business, I've seen countless companies pitch products and services to speakers—most are fly-by-night operations that lack real substance and deliver on false promises. I rarely engage with them. Speaker Drive is the rare exception. The quality of this platform is undeniable, and that is entirely due to Austin. He truly understands the nuances of a speaker's business—he gets it. He has assembled something that actually works, and I'm grateful to be a part of it. Thank you, Austin!",
    ],
    excerpt: [
      "In my 30+ years in this business, I've seen countless companies pitch products and services to speakers … Speaker Drive is the rare exception. The quality of this platform is undeniable, and that is entirely due to Austin.",
    ],
    emphasis: ["Speaker Drive is the rare exception."],
    source: "linkedin",
    date: "2026-09",
  },
  {
    id: "jared-kallen",
    photo: "/testimonials/jared-kallen.jpg",
    name: "Jared Kallen",
    shortName: "Jared K.",
    title: "Executive-functioning coach",
    quotes: [
      "I give Austin Benton my strongest recommendation. He's the visionary behind SpeakerDrive, a platform that is reshaping how speakers and experts find high-value opportunities. Instead of chasing gigs or living in the 'feast or famine' cycle, SpeakerDrive connects speakers directly with decision-makers and events—and the built-in outreach tools actually convert those connections into booked stages. Austin combines industry insight, innovation, and genuine care for the people he serves. He knows the challenges speakers face and has built a practical, effective solution that makes real results possible. If you're a speaker looking for more consistency, more opportunities, and more impact, you want Austin and SpeakerDrive in your corner.",
    ],
    excerpt: [
      "SpeakerDrive connects speakers directly with decision-makers and events—and the built-in outreach tools actually convert those connections into booked stages.",
    ],
    emphasis: [
      "the built-in outreach tools actually convert those connections into booked stages",
    ],
    source: "linkedin",
    date: "2025-09",
  },
  {
    id: "nigel-romany",
    photo: "/testimonials/nigel-romany.jpg",
    name: "Nigel Romany",
    shortName: "Nigel R.",
    title: "Student leadership and mental health speaker, Coach Romany Services",
    quotes: [
      "I absolutely love this service!! It needs to be a staple of anyone looking to generate leads and is serious about Prospecting.",
    ],
    source: "email",
    date: "2026-08",
  },
  {
    id: "terri-chrisman",
    photo: "/testimonials/terri-chrisman.jpg",
    name: "Terri Chrisman",
    shortName: "Terri C.",
    quotes: [
      "Omg! I got a reply!! Only sent out 4 outreaches yesterday. Whoo hoo!! Thanks Austin.",
      "I got a second reply after that.",
    ],
    emphasis: ["Only sent out 4 outreaches yesterday."],
    source: "email",
    date: "2026-09",
  },
];

/**
 * Demo reviews, exactly as tidycal.com/austinbenton/speakerdrive lists them
 * (newest first, checked 2026-10-12). Two have no text and are kept so the
 * count stays honest; the wall skips them.
 */
export const DEMO_REVIEWS: Testimonial[] = [
  { id: "tidycal-chris-2026-10", name: "Chris", quotes: ["Really great call. Austin has a very cool product that is very user-friendly. Fantastic technology that is intuitive and easy to use."], source: "tidycal", date: "2026-10", rating: 5 },
  { id: "tidycal-lisa-2026-10", name: "Lisa", quotes: ["Demo was very helpful. Always good to understand the nuances of a new platform. Austin is great."], source: "tidycal", date: "2026-10", rating: 5 },
  { id: "tidycal-mathew-2026-10", name: "Mathew", quotes: ["Great, super convo and very easy to use this system. Thank you."], source: "tidycal", date: "2026-10", rating: 5 },
  { id: "tidycal-albert-2026-09", name: "Albert", quotes: ["Great team to work with. The hours I was spending to research leads and do other admin items has been cut dramatically."], source: "tidycal", date: "2026-09", rating: 5 },
  { id: "tidycal-linda-2026-09", name: "Linda", quotes: ["great"], source: "tidycal", date: "2026-09", rating: 5 },
  { id: "tidycal-diane-2026-09", name: "Diane", quotes: ["Thank you again!"], source: "tidycal", date: "2026-09", rating: 5 },
  { id: "tidycal-bruce-2026-09", name: "Bruce", quotes: ["Thank you for your support. I have already started receiving responses!"], source: "tidycal", date: "2026-09", rating: 5 },
  { id: "tidycal-lisa-2026-09", name: "Lisa", quotes: ["Austin exceeded my expectation for our call!"], source: "tidycal", date: "2026-09", rating: 5 },
  { id: "tidycal-david-2026-08", name: "David", quotes: ["Austin is the absolute best! His patience and mentoring skills are unmatched, and he truly makes you feel like the most important person on the platform. Thank you Austin!"], source: "tidycal", date: "2026-08", rating: 5 },
  { id: "tidycal-matthew-2026-08", name: "Matthew", quotes: ["Very helpful meeting with Austin. Informative about the ins and outs of the SpeakerDrive platform. Highly recommend to others."], source: "tidycal", date: "2026-08", rating: 5 },
  { id: "tidycal-elaine-2026-08", name: "Elaine", quotes: ["This is an awesome system! Austin Benton has created a program that provides the types of leads every speaker wants and needs. It's easy to use, and it's affordable."], source: "tidycal", date: "2026-08", rating: 5 },
  { id: "tidycal-jeff-2026-08", name: "Jeff", quotes: ["Great conversation and demo. Thank you."], source: "tidycal", date: "2026-08", rating: 5 },
  { id: "tidycal-sam-2026-08", name: "Sam", quotes: ["Amazing! Austin is one of the real ones. Genuine guy that leads from a human approach and very trustworthy. Thank you!"], source: "tidycal", date: "2026-08", rating: 5 },
  { id: "tidycal-kelly-2026-07", name: "Kelly", quotes: ["Austin is a class act - down to Earth, willing to help in any and every way you need, and he has such confidence in his product. He knows it’s working for people, it’s working for me, and will work for you. Best platform out there for speakers! Saves me hours and hours of cold emailing!"], excerpt: ["Best platform out there for speakers! Saves me hours and hours of cold emailing!"], source: "tidycal", date: "2026-07", rating: 5 },
  { id: "tidycal-diane-2026-06", name: "Diane", quotes: ["FABULOUS - have a great weekend!"], source: "tidycal", date: "2026-06", rating: 5 },
  { id: "tidycal-stephen-2026-06", name: "Stephen", quotes: [], source: "tidycal", date: "2026-06", rating: 5 },
  { id: "tidycal-arthur-2026-06", name: "Arthur", quotes: ["Every question answered and some great starting tips to get moving."], source: "tidycal", date: "2026-06", rating: 5 },
  { id: "tidycal-karen-2026-06", name: "Karen", quotes: [], source: "tidycal", date: "2026-06", rating: 5 },
  { id: "tidycal-jenn-2026-05", name: "Jenn", quotes: ["Very informative!"], source: "tidycal", date: "2026-05", rating: 5 },
  { id: "tidycal-karen-2026-05", name: "Karen", quotes: ["Our session was exactly what I was hoping–a real genuine person who is smart and wants to help speakers!"], source: "tidycal", date: "2026-05", rating: 5 },
];

export const TIDYCAL_URL = "https://tidycal.com/austinbenton/speakerdrive";

/** The numbers on the page come from the list above, never typed by hand. */
export const DEMO_REVIEW_COUNT = DEMO_REVIEWS.length;
export const DEMO_REVIEW_AVERAGE = (() => {
  const rated = DEMO_REVIEWS.filter((r) => r.rating);
  if (rated.length === 0) return 0;
  const sum = rated.reduce((n, r) => n + (r.rating ?? 0), 0);
  return Math.round((sum / rated.length) * 10) / 10;
})();

/** Demo reviews that have words (the wall shows these). */
export const DEMO_REVIEWS_WITH_TEXT = DEMO_REVIEWS.filter(
  (r) => r.quotes.length > 0 && r.quotes[0].trim().length > 0,
);

/** The paragraphs the page shows: the excerpt when there is one, else the full quote. */
export function displayQuotes(t: Testimonial): string[] {
  return t.excerpt ?? t.quotes;
}

/** The name the page shows. */
export function displayName(t: Testimonial): string {
  return t.shortName ?? t.name;
}

export const SOURCE_LABEL: Record<TestimonialSource, string> = {
  email: "Sent by email",
  linkedin: "LinkedIn recommendation",
  tidycal: "Demo review on TidyCal",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-08" → "Aug 2026" */
export function formatMonth(date: string): string {
  const [y, m] = date.split("-");
  const idx = Number(m) - 1;
  return MONTHS[idx] ? `${MONTHS[idx]} ${y}` : date;
}
