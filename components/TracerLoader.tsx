"use client";

import Script from "next/script";

export default function TracerLoader() {
  return (
    <Script
      src="https://app.visitortracking.com/assets/js/tracer.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof Tracer === "function") {
          new Tracer({
            websiteId: "39d90972-4818-4a00-bd05-64f15964c5cf",
            async: true,
            debug: false,
          });
        } else {
          console.error("Tracer is not defined after script load.");
        }
      }}
    />
  );
}
