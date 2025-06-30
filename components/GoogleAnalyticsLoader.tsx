"use client";

import Script from "next/script";

export default function GoogleAnalyticsLoader() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5Q8XHBYK3X"
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Error loading Google Analytics", e);
        }}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5Q8XHBYK3X');
          `,
        }}
        onError={(e) => {
          console.error("Error initializing Google Analytics", e);
        }}
      />
    </>
  );
}