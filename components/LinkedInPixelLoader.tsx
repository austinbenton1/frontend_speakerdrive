"use client";

import Script from "next/script";

export default function LinkedInPixelLoader() {
  return (
    <>
      <Script
        id="linkedin-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            _linkedin_partner_id = "7073354";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `,
        }}
        onError={(e) => {
          console.error("Error setting LinkedIn partner ID", e);
        }}
      />
      <Script
        id="linkedin-insight"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
          `,
        }}
        onError={(e) => {
          console.error("Error loading LinkedIn Insight", e);
        }}
      />
      {/* Noscript fallback */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          alt="" 
          src="https://px.ads.linkedin.com/collect/?pid=7073354&fmt=gif" 
        />
      </noscript>
    </>
  );
}