"use client";

// The TidyCal booking calendar, exactly as /demo has always loaded it: the
// embed script goes into <head> on mount and comes out on unmount, and the
// div below is what the script fills in. Used by /demo and /reviews.

import { useEffect } from "react";

const EMBED_SRC = "https://asset-tidycal.b-cdn.net/js/embed.js";

export function TidyCalEmbed({
  path = "austinbenton/speakerdrive",
  showAvatar = true,
  className = "",
}: {
  path?: string;
  /**
   * Reserve the calendar's height (a min-h class) so the page below doesn't
   * jump when TidyCal's script fills the box in. Heights differ per page
   * (measured 10/12: /demo ~943px phone, ~1064px desktop; /reviews ~1610-1710px).
   */
  className?: string;
  /**
   * false hides TidyCal's top row (Austin's photo, name and "20 reviews")
   * inside the widget. The event title, length, description and the review
   * list are TidyCal's own and cannot be hidden from here.
   */
  showAvatar?: boolean;
}) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = EMBED_SRC;
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      if (typeof window !== "undefined") {
        const script = document.querySelector(`script[src="${EMBED_SRC}"]`);
        if (script) {
          script.remove();
        }
      }
    };
  }, []);

  // The reserve sits on a wrapper: TidyCal's script writes its own inline
  // min-height (500px) onto .tidycal-embed while it loads, which overrode a
  // class placed there.
  return (
    <div className={className}>
      <div
        className="tidycal-embed"
        data-path={path}
        data-showavatar={showAvatar ? undefined : "false"}
      ></div>
    </div>
  );
}
