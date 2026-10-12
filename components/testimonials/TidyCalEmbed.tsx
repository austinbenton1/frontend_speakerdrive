"use client";

// The TidyCal booking calendar, exactly as /demo has always loaded it: the
// embed script goes into <head> on mount and comes out on unmount, and the
// div below is what the script fills in. Used by /demo and /reviews.

import { useEffect } from "react";

const EMBED_SRC = "https://asset-tidycal.b-cdn.net/js/embed.js";

export function TidyCalEmbed({
  path = "austinbenton/speakerdrive",
}: {
  path?: string;
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

  return <div className="tidycal-embed" data-path={path}></div>;
}
