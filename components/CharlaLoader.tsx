"use client";

import Script from "next/script";

export default function CharlaLoader() {
  return (
    <Script
      id="charla-loader"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          window.addEventListener('load', () => {
            const widgetElement = document.createElement('charla-widget');
            widgetElement.setAttribute("p", "ca17920b-e40b-433b-8c46-e550c3b2505a");
            document.body.appendChild(widgetElement);
            const widgetCode = document.createElement('script');
            widgetCode.src = 'https://app.getcharla.com/widget/widget.js';
            document.body.appendChild(widgetCode);
          });
        `,
      }}
      onError={(e) => {
        console.error("Error loading Charla widget", e);
      }}
    />
  );
}