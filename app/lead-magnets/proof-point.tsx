"use client";

import Link from 'next/link';
import { Footer5 } from "@/components/layout/Footer";

export default function ProofPointPage() {
  return (
    <div className="min-h-screen bg-white">
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
          <h1>The Proof Point Email Template</h1>

          <div className="container">
            {/* ================================
                THE STRUCTURE
            ================================ */}
            <h2 className="headline">The Structure</h2>
            <p>Your email needs these three critical components:</p>

            <h3>1. The Relevance Bridge</h3>
            <p>Open with a casual, conversational observation about their event:</p>
            <div className="template-box">
              "I noticed your event is focusing on [their event theme], which reminded me of a challenge [similar organization type] was facing recently."
            </div>

            <h3>2. The Proof Point (keep it to ONE sentence)</h3>
            <p>Share a specific result you've achieved, using this formula:</p>
            <div className="template-box">
              "[Power phrase] my [specific approach/framework] helped [organization] achieve [specific improvement] in [measurable outcome]."
            </div>

            <h3>3. The Soft Ask</h3>
            <p>End with a low-pressure question or offer:</p>
            <div className="template-box">
              "Would this approach be helpful for your audience at [event name]? Happy to share more about it regardless of your speaker needs."
            </div>

            <div className="section-divider">•</div>

            {/* ================================
                THE FULL TEMPLATE
            ================================ */}
            <h2 className="headline">The Full Template</h2>
            <div className="template-box">
              <p>Hi [Name],</p>
              <br />
              <p>[RELEVANCE BRIDGE]</p>
              <p>I was looking at your [event name] and noticed you're focusing on [specific theme], which reminded me of a challenge [organization type] was dealing with recently.</p>
              <br />
              <p>[PROOF POINT]</p>
              <p>[Power phrase] my [specific approach/framework] helped [organization] achieve [specific improvement] in [measurable outcome].</p>
              <br />
              <p>[SOFT ASK]</p>
              <p>Would this approach be helpful for your [specific audience type] at [event name]? Happy to share more about it regardless of your speaker needs.</p>
              <br />
              <p>Best,<br />
              [Your Name]</p>
            </div>

            <div className="section-divider">•</div>

            {/* ================================
                COMPLETE EXAMPLES
            ================================ */}
            <h2 className="headline">Complete Examples</h2>

            <div className="example">
              <div className="example-label">EXAMPLE 1: LEADERSHIP CONFERENCE</div>
              <p><strong>Hi Melissa,</strong></p>
              <br />
              <p>I was looking at the Global Leadership Summit agenda and noticed your focus on decision-making under pressure, which reminded me of what Microsoft's executive team was struggling with last quarter.</p>
              <br />
              <p>What surprised us most was that our "Decision Velocity Framework" reduced their meeting time by 37%. Happy to send it to you regardless of your speaker needs.</p>
              <br />
              <p>Would this approach be useful for your executive audience at the Summit?</p>
              <br />
              <p>Best,<br />
              Alex</p>
            </div>

            <div className="example">
              <div className="example-label">EXAMPLE 2: HEALTHCARE CONFERENCE</div>
              <p><strong>Hi Daniel,</strong></p>
              <br />
              <p>I saw that your Healthcare Innovation Forum is addressing digital transformation challenges, which is similar to what United Healthcare's teams were facing earlier this year.</p>
              <br />
              <p>The unexpected insight that moved the needle was our "Micro-Connection Protocol" which improved their collaboration across remote teams. I'd be happy to share our simple assessment tool even if you're not looking for speakers.</p>
              <br />
              <p>Would this be helpful for your healthcare administrators at the Forum?</p>
              <br />
              <p>Best,<br />
              Jamie</p>
            </div>

            <div className="example">
              <div className="example-label">EXAMPLE 3: CUSTOMER EXPERIENCE SUMMIT</div>
              <p><strong>Hi Rachel,</strong></p>
              <br />
              <p>I came across your Customer Experience Summit page and saw you're focusing on rebuilding loyalty, which is exactly what Marriott's front-line staff was struggling with after their recent brand merger.</p>
              <br />
              <p>The core discovery that changed everything was our "Loyalty Trigger Framework" which significantly improved their retention scores without any additional spending. I've developed a one-page checklist that might be useful for your team.</p>
              <br />
              <p>Might this be interesting for your hospitality audience at the CX Summit?</p>
              <br />
              <p>Best,<br />
              Taylor</p>
            </div>

            <div className="section-divider">•</div>

            {/* ================================
                OPTIONAL: KEY TIPS SECTION
            ================================ */}
            <h2 className="headline">Key Tips To Remember...</h2>

            <h3>Power Phrases</h3>
            <p>Use these transitions to introduce your proof point naturally:</p>
            <ul className="tips">
              <li>"What surprised us most was..."</li>
              <li>"The unexpected insight that moved the needle was..."</li>
              <li>"The turning point came when we realized..."</li>
              <li>"Unlike conventional wisdom in this area, we found..."</li>
              <li>"What ultimately transformed their results was..."</li>
            </ul>

            <h3>Pro Tips</h3>
            <ul className="tips">
              <li><strong>Hyper-specificity wins:</strong> Use actual percentages and timeframes</li>
              <li><strong>The shorter, the better:</strong> If you can say it in one sentence, do</li>
              <li><strong>Focus on unusual insights:</strong> "Counterintuitive" and "surprising" are attention magnets</li>
              <li><strong>Remove all jargon:</strong> Event planners aren't industry insiders</li>
              <li><strong>End with curiosity:</strong> Your goal is conversation, not immediate booking</li>
            </ul>
          </div>
        </main>
      </div>
      {/* Visual divider */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>
      </div>
      
      {/* Compact CTA Feature Box */}
      <section className="max-w-4xl mx-auto px-4 py-12 relative">
        {/* Remove gradient background; add a more prominent border */}
        <div className="bg-white rounded-2xl p-8 shadow-lg relative border-2 border-gray-200">
          {/* Heading that can expand fully */}
          <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                Ready to Put This Into Practice?
              </h2>
          </div>
          
          {/* Content + Image Side by Side */}
          <div className="flex flex-col md:flex-row items-start gap-8 mb-6">
            <div className="md:w-1/2 relative z-10">
              <p className="text-gray-600 text-lg leading-snug">
                This Proof Point Email System is already built into SpeakerDrive's AI composer.<br /><br />
                Our platform doesn't just help you find speaking opportunities – it helps you craft 
                the perfect outreach message every time.
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
          
          {/* Features List */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Our AI-powered composer:
            </h3>
            <div className="grid gap-0">
              {[
                "Automatically analyzes event details to create relevant connections",
                "Suggests proven power phrases and proof points",
                "Generates personalized outreach based on your specific background"
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-1.5 py-0"
                >
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
                  <p className="text-gray-700 text-base leading-snug">{feature}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="max-w-xl relative">
            <div className="h-px bg-gradient-to-r from-gray-200 via-transparent to-gray-200 mb-2"></div>
            <p className="text-gray-700 text-lg mb-6">
              Try SpeakerDrive free and see how our intelligent outreach tools can fill your speaking calendar.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="https://www.speakerdrive.com/coming-soon"
                className="cta-button w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Get Started. It&apos;s FREE! 🚀
              </Link>
            </div>
            {/* "No credit card required" below the button */}
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