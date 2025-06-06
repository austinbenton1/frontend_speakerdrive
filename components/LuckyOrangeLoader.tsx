"use client";

import Script from "next/script";

export default function LuckyOrangeLoader() {
  return (
    <Script
      id="lucky-orange"
      src="https://tools.luckyorange.com/core/lo.js?site-id=8c72b161"
      async
      defer
      strategy="afterInteractive"
      onError={(e) => {
        console.error("Error loading LuckyOrange script", e);
      }}
    />
  );
}
