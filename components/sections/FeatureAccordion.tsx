"use client";
import React from "react";

export function FeatureAccordion() {
  return (
    // Updated the background color here from #FFF9F0 to #FEF8EC
    <div className="bg-[#FEF8EC] px-4 py-12 sm:py-16">
      <div className="container mx-auto max-w-screen-lg">
        {/* Main headline */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-black mb-4">
            How It Works
          </h2>
          <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto">
            SpeakerDrive helps speakers, coaches and experts escape the referral
            trap and predictably control their own client acquisition.
          </p>
        </div>

        {/* Steps Section */}
        <div className="space-y-12">
          {/* STEP 1 */}
          <div>
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="inline-block bg-blue-500 text-white text-sm font-bold rounded-full px-3 py-1">
                Step 1
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Find Qualified Leads
              </h3>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee004d6591f37395f36.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            {/* Updated caption styling */}
            <div className="mt-3 text-lg font-semibold text-gray-700">
              Search by events or contacts
            </div>
          </div>

          {/* STEP 2 */}
          <div>
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="inline-block bg-blue-500 text-white text-sm font-bold rounded-full px-3 py-1">
                Step 2
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Unlock Contact Info
              </h3>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee03d10887974dc27c8.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            {/* Updated caption styling */}
            <div className="mt-3 text-lg font-semibold text-gray-700">
              Unlock contact info
            </div>
          </div>

          {/* STEP 3 */}
          <div>
            <div className="flex items-baseline space-x-3 mb-4">
              <span className="inline-block bg-blue-500 text-white text-sm font-bold rounded-full px-3 py-1">
                Step 3
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                Craft Outreach
              </h3>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cffee004d659631e395f35.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            {/* Updated caption styling */}
            <div className="mt-3 text-lg font-semibold text-gray-700">
              Generate outreach in 1 click
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}