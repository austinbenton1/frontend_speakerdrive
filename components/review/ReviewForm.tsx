"use client";

// The review form on speakerdrive.com/review (Austin 2026-10-13).
//
// Stars, a name ("John D." is fine), the review, an email we never show, an
// optional photo. Under the box, "Shuffle" offers half sentences that name
// SpeakerDrive; tapping one drops it into the box so the person finishes it
// in their own words (never a finished line: twenty people tapping the same
// praise would make the wall look fake).
//
// It posts to the app, which decides what goes live (see live.ts). The answer
// is the same either way, so the thank-you never says whether it went live.

import { useRef, useState } from "react";
import { Shuffle, Star, Upload } from "lucide-react";
import { SITE_REVIEWS_API } from "@/components/testimonials/live";

const STARTERS = [
  "Before SpeakerDrive, I",
  "The part of SpeakerDrive I like most is",
  "Since I started using SpeakerDrive, I've",
  "If a speaker friend asked me about SpeakerDrive, I'd say",
  "What surprised me about SpeakerDrive was",
  "SpeakerDrive saves me",
  "My first reply with SpeakerDrive came from",
  "Before SpeakerDrive, I used to spend hours",
  "The leads in SpeakerDrive are",
  "With SpeakerDrive, I finally",
];

const MESSAGES = {
  stars: "Tap a star to rate.",
  name: "Add your name.",
  review: "Write a few words.",
  email: "Add your email.",
  photo: "That photo did not work. Try a JPG or PNG.",
  failed: "Something went wrong. Try again.",
};

type Field = "stars" | "name" | "review" | "email" | "photo" | "form";

const FIELD_IDS = { stars: "review-stars", name: "review-name", review: "review-text", email: "review-email" } as const;

/** Three starters, never the same three as now. */
function pickThree(current: string[]): string[] {
  const rest = STARTERS.filter((s) => !current.includes(s));
  const pool = rest.length >= 3 ? rest : STARTERS;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
}

/** Shrink a picked photo to 600 px on the long side, as a JPEG data URL. */
function shrinkPhoto(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 600 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas"));
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("not an image"));
    };
    img.src = url;
  });
}

const label = "mb-1.5 block text-sm font-medium text-gray-700";
const input =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

function FieldError({ text }: { text?: string }) {
  if (!text) return null;
  return <p className="mt-1.5 text-sm text-red-600">{text}</p>;
}

export function ReviewForm() {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [chips, setChips] = useState<string[]>(STARTERS.slice(0, 3));
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const box = useRef<HTMLTextAreaElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const clear = (f: Field) => setErrors((e) => ({ ...e, [f]: undefined, form: undefined }));

  const addStarter = (s: string) => {
    const next = review.trim() ? `${review.trim()} ${s} ` : `${s} `;
    setReview(next);
    clear("review");
    requestAnimationFrame(() => {
      const el = box.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(next.length, next.length);
    });
  };

  const pickPhoto = async (file: File | undefined) => {
    clear("photo");
    if (!file) return;
    try {
      setPhoto(await shrinkPhoto(file));
    } catch {
      setPhoto(null);
      setErrors((e) => ({ ...e, photo: MESSAGES.photo }));
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Partial<Record<Field, string>> = {};
    if (stars < 1) next.stars = MESSAGES.stars;
    if (!name.trim()) next.name = MESSAGES.name;
    if (review.trim().length < 3) next.review = MESSAGES.review;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = MESSAGES.email;
    setErrors(next);
    if (Object.keys(next).length) {
      // Bring the first problem into view (a missing star sits far above the button).
      const first = (["stars", "name", "review", "email"] as const).find((f) => next[f]);
      const el = first ? document.getElementById(FIELD_IDS[first]) : null;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      if (el && first !== "stars") el.focus({ preventScroll: true });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(`${SITE_REVIEWS_API}/site-review-submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars, name, review, email, photo, company }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (res.ok && json.success) {
        setSent(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setErrors({ form: json.message || MESSAGES.failed });
      }
    } catch {
      setErrors({ form: MESSAGES.failed });
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center sm:p-8">
        <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Thank you!</h1>
        <p className="mt-3 text-gray-600">We got your review.</p>
        <a href="/reviews" className="mt-6 inline-block font-medium text-primary hover:underline">
          See all reviews
        </a>
      </div>
    );
  }

  const shown = hover || stars;

  return (
    <form onSubmit={submit} noValidate className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">How is SpeakerDrive working for you?</h1>

      <div
        id="review-stars"
        className="mt-4 flex gap-1 scroll-mt-24"
        role="radiogroup"
        aria-label="Your rating"
        onMouseLeave={() => setHover(0)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={stars === n}
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            onClick={() => {
              setStars(n);
              clear("stars");
            }}
            onMouseEnter={() => setHover(n)}
            className="rounded p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <Star
              width={34}
              height={34}
              strokeWidth={0}
              fill="currentColor"
              className={n <= shown ? "text-amber-400" : "text-gray-200"}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      <FieldError text={errors.stars} />

      <div className="mt-6">
        <label htmlFor="review-name" className={label}>
          Your name
        </label>
        <input
          id="review-name"
          type="text"
          autoComplete="name"
          maxLength={60}
          placeholder="John Doe or John D."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            clear("name");
          }}
          className={input}
        />
        <FieldError text={errors.name} />
      </div>

      <div className="mt-5">
        <label htmlFor="review-text" className={label}>
          Your review
        </label>
        <textarea
          id="review-text"
          ref={box}
          rows={5}
          maxLength={2000}
          placeholder="Tell other speakers what it has been like."
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            clear("review");
          }}
          className={input + " resize-y"}
        />
        <FieldError text={errors.review} />

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600">Need a start? Tap one.</span>
          <button
            type="button"
            onClick={() => setChips((c) => pickThree(c))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Shuffle width={15} height={15} aria-hidden="true" />
            Shuffle
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {chips.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addStarter(s)}
              className="rounded-full border border-gray-300 bg-gray-50 px-3 py-1.5 text-left text-sm text-gray-800 hover:border-primary hover:bg-white"
            >
              {s}...
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="review-email" className={label}>
          Your email (not shown)
        </label>
        <input
          id="review-email"
          type="email"
          autoComplete="email"
          maxLength={254}
          placeholder="you@yourdomain.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clear("email");
          }}
          className={input}
        />
        <FieldError text={errors.email} />
      </div>

      <div className="mt-5">
        <span className={label}>Add a photo (optional)</span>
        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickPhoto(e.target.files?.[0])}
        />
        {photo ? (
          <div className="flex items-center gap-3">
            <img src={photo} alt="" className="h-14 w-14 rounded-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setPhoto(null);
                if (fileInput.current) fileInput.current.value = "";
              }}
              className="text-sm text-gray-600 underline hover:text-gray-900"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Upload width={15} height={15} aria-hidden="true" />
            Upload photo
          </button>
        )}
        <FieldError text={errors.photo} />
      </div>

      {/* Left empty by people; bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="review-company">Company</label>
        <input
          id="review-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={sending}
        className="mt-7 w-full rounded-lg bg-primary px-4 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
      >
        {sending ? "Sending..." : "Send my review"}
      </button>
      <FieldError text={errors.form} />
      <p className="mt-3 text-center text-xs text-gray-500">
        By sending this, you OK SpeakerDrive to show this publicly.
      </p>
    </form>
  );
}
