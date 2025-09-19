'use client';

import Script from 'next/script';

export default function AffiliateTracker() {
  return (
    <>
      <Script
        id="affiliate-tracker"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Extract affiliate ID from URL parameters
              const urlParams = new URLSearchParams(window.location.search);
              const affiliateId = urlParams.get('ref') || urlParams.get('affiliate');
              
              if (affiliateId) {
                // Store in sessionStorage for this session
                sessionStorage.setItem('affiliateId', affiliateId);
              }
              
              // Get affiliate ID from storage or URL
              const storedAffiliateId = sessionStorage.getItem('affiliateId');
              
              // Make affiliate ID globally accessible
              window.affiliateId = storedAffiliateId;
              
              console.log('Affiliate tracker loaded, affiliateId:', window.affiliateId);
            })();
          `
        }}
      />
    </>
  );
}
