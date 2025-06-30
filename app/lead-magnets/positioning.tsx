"use client";

import Link from "next/link";
import { Footer5 } from "@/components/layout/Footer";

export default function PositionOfPowerPage() {
  return (
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        :root {
          --bg-gray: #f5f5f5;
          --border-gray: #d1d1d1;
          --text-dark: #333333;
          --text-medium: #555555;
        }

        .proof-point-page {
          line-height: 1.6;
          color: var(--text-dark);
          background-color: white;
          max-width: 680px;
          margin: 0 auto;
          padding: 30px 20px;
        }

        .proof-point-page h1 {
          font-size: 2.2rem;
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          font-weight: 800;
        }

        .headline {
          font-size: 1.875rem;
          font-weight: 800;
          color: #333333;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        @media (min-width: 640px) {
          .headline {
            font-size: 2.25rem;
          }
        }

        h3 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #333333;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        p {
          margin-bottom: 1rem;
        }

        .container {
          padding: 1rem 0;
        }

        .template-box {
          background-color: var(--bg-gray);
          border: 1px solid var(--border-gray);
          padding: 1.5rem;
          margin: 1.5rem 0;
          font-family: monospace;
          line-height: 1.8;
        }

        .tips {
          list-style-type: none;
          margin-top: 1.5rem;
          padding-left: 0;
        }

        .tips li {
          margin-bottom: 1rem;
          position: relative;
          padding-left: 2rem;
        }

        .tips li:before {
          content: "→";
          position: absolute;
          left: 0;
          font-family: monospace;
        }

        .section-divider {
          text-align: center;
          margin: 3rem 0;
          font-family: monospace;
          font-size: 1.5rem;
          color: var(--text-medium);
        }

        .section-divider:before,
        .section-divider:after {
          content: "—";
          margin: 0 1rem;
        }
      `}</style>

      {/* Logo */}
      <div className="flex justify-center mb-2">
        <Link href="/">
          <img
            src="/SpeakerDrive Logo - Long.png"
            alt="SpeakerDrive"
            className="h-12 mt-12"
          />
        </Link>
      </div>

      {/* Subtle CTA just below the logo */}
      <div className="flex justify-center mb-12">
        <Link
          href="https://app.speakerdrive.com/signup"
          className="text-[#004182] text-sm underline hover:text-[#002c5c] transition-colors"
        >
          Start your free trial -&gt;
        </Link>
      </div>

      <div className="proof-point-page">
        <main>
          {/* MAIN HEADING */}
          <h1>THE POSITION OF POWER EMAIL TEMPLATE</h1>
          <p className="mb-6 text-lg font-semibold">
            The 16-word email that positions you as the selective speaker
          </p>

          {/* Overview/Intro Section */}
          <h2 className="headline">For Speakers:</h2>
          <p>
            Most speakers struggle to get responses from event planners because
            their outreach positions them as just another person asking for an
            opportunity. This template flips that dynamic completely. By
            positioning yourself as the one with limited availability, you
            transform how planners perceive your value.
          </p>

          <div className="section-divider">•</div>

          {/* Why This Works */}
          <h2 className="headline">Why This Works</h2>
          <ul className="tips">
            <li>
              Most speakers sound desperate when reaching out to event planners
            </li>
            <li>
              This approach flips the dynamic — positioning YOU as the one
              making selections
            </li>
            <li>
              The brevity suggests you're too busy and in-demand for lengthy
              pitches
            </li>
            <li>
              The friendly greeting makes it natural to respond to
            </li>
          </ul>

          {/* The Template */}
          <h3>THE TEMPLATE:</h3>
          <div className="template-box">
            <p>Hi [First Name]!</p>
            <br />
            <p>
              Who handles speakers for your events? I'm finalizing
              [Speaker's First Name]'s schedule for this quarter.
            </p>
            <br />
            <p>[Your Name]</p>
            <p>Assistant to [Speaker's Full Name]</p>
            <p>[Website]</p>
          </div>

          {/* The Psychology Behind It */}
          <h3>THE PSYCHOLOGY BEHIND IT:</h3>
          <ul className="tips">
            <li>
              Scarcity creates value — "Finalizing the schedule" implies limited
              availability without explicitly stating it
            </li>
            <li>
              Subtle power shift — Instead of asking for an opportunity, you're
              deciding where to allocate your limited time
            </li>
            <li>
              Time sensitivity — Mentioning "this quarter" creates a subtle
              urgency without being pushy
            </li>
            <li>
              Positioning over pitching — Nothing about credentials or topics;
              positioning yourself as selective is more powerful than any pitch
            </li>
            <li>
              Easy engagement — The direct question format makes it simple to
              respond, creating an opening for further conversation
            </li>
            <li>
              Friendly tone — The exclamation point adds warmth and positivity
              that makes the email feel personal and hard to ignore
            </li>
          </ul>

          <p>
            This approach works because it fundamentally changes how event
            planners see you — not as someone asking for an opportunity, but as
            someone they might want to secure before your schedule fills up. The
            brevity and directness signal confidence, which reinforces the
            impression that the speaker is in-demand and selective about where
            they appear.
          </p>

          {/* Section Divider */}
          <div className="section-divider">•</div>
        </main>
      </div>

      {/* Visual divider */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>
      </div>

      {/* Compact CTA Feature Box */}
      <section className="max-w-4xl mx-auto px-4 py-12 relative">
        <div className="bg-white rounded-2xl p-8 shadow-lg relative border-2 border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
              Ready to Put This Into Practice?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 mb-6">
            <div className="md:w-1/2 relative z-10">
              <p className="text-gray-600 text-lg leading-snug">
                The Position of Power Email Template is already built into
                SpeakerDrive's AI composer. Our platform doesn't just help you
                find speaking opportunities – it helps you craft the perfect
                outreach message every time.
              </p>
            </div>

            <div className="md:w-1/2">
              <div className="relative group transition-all duration-300 transform hover:scale-[1.02]">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-50 to-transparent rounded-xl blur opacity-25"></div>
                <img
                  src="/coming_soon_dashboard.png"
                  alt="SpeakerDrive Dashboard"
                  className="relative w-[80%] h-auto rounded-xl mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Our AI-powered composer:
            </h3>
            <div className="grid gap-0">
              {[
                "Automatically generates personalized outreach based on your specific background",
                "Includes proven templates like this Position of Power approach",
                "Finds verified decision-maker contact information"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-1.5 py-0">
                  <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-brand-blue mt-1">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      viewBox="0 0 24 24"
                      className="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-snug">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-xl relative">
            <div className="h-px bg-gradient-to-r from-gray-200 via-transparent to-gray-200 mb-2"></div>
            <p className="text-gray-700 text-lg mb-6">
              Try SpeakerDrive free and see how our intelligent outreach tools
              can fill your speaking calendar.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="https://app.speakerdrive.com/signup"
                className="cta-button w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Get Started. It&apos;s FREE! 🚀
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required
            </p>
          </div>
        </div>
      </section>

      <Footer5 />
    </div>
  );
}