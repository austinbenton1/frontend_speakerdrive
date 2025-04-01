"use client";

import Script from "next/script";

export default function TracerLoader() {
  // Only load tracer in production
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      src="https://app.visitortracking.com/assets/js/tracer.js"
      strategy="afterInteractive"
      onLoad={() => {
        try {
          if (typeof window.Tracer === "function") {
            window.Tracer({
              websiteId: "39d90972-4818-4a00-bd05-64f15964c5cf",
              async: true,
              debug: false,
            });
          } else {
            console.warn("Tracer script loaded but Tracer is not defined");
          }
        } catch (err) {
          console.warn("Failed to initialize Tracer:", err);
        }
      }}
      onError={(e) => {
        // Silently handle script loading errors in production
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load Tracer script:", e);
        }
      }}
    />
  );
}
