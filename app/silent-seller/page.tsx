"use client";

import Link from "next/link";
import { Footer5 } from "@/components/layout/Footer";

export default function SilentSellerPage() {
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
          font-size: 2.5rem;
          text-align: center;
          margin-top: 2rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-weight: 800;
          max-width: 90%;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.2;
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

        .comparison-example {
          display: flex;
          align-items: center;
          margin: 0.5rem 0;
        }

        .comparison-icon {
          width: 24px;
          margin-right: 0.5rem;
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
          <h1>THE SILENT SELLER: EMAIL SIGNATURE CREDENTIAL FRAMEWORK</h1>
          <p className="mb-6 text-lg font-semibold">
            Your email signature is the most overlooked asset into email toolbox
          </p>

          {/* The Hidden Revenue Driver */}
          
          <p>
            A speaker recently told me: "I never thought my email signature would help land a keynote."
          </p>
          <p>
            But that's exactly what happened when she changed her signature from "Leadership Speaker" 
            to a specific credential + third-party validation.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>It's a hidden revenue driver:</h3>
          <ul className="tips">
            <li>Your signature often gets more attention than your email's body text </li>
            <li>The right signature credential can double (I've seen this first-hand)</li>
            <li>Planners see your signature in EVERY email</li>
          </ul>

          <p>
            This is prime email real estate! We can do better than generic titles like "Motivational Speaker" 
            or "Leadership Expert."
          </p>

          <div className="section-divider">•</div>

          {/* The Silent Seller Principle */}
          <h2 className="headline">The Silent Seller Principle</h2>
          <p>
            Your signature does the credibility-building. 
            No bragging required.
          </p>

          <h3 style={{ fontSize: '1.25rem', marginTop: '1.5rem' }}>The Two Rules Of Thumb:</h3>
          
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <p><strong>1. Third-party validation always beats self-proclamation</strong></p>
            <div className="comparison-example">
              <span className="comparison-icon">❌</span>
              <span>"Award-winning speaker"</span>
            </div>
            <div className="comparison-example">
              <span className="comparison-icon">✅</span>
              <span>"2024 NSA Keynote of the Year"</span>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <p><strong>2. Specificity always beats generality</strong></p>
            <div className="comparison-example">
              <span className="comparison-icon">❌</span>
              <span>"Helped many companies"</span>
            </div>
            <div className="comparison-example">
              <span className="comparison-icon">✅</span>
              <span>"Former Microsoft Director: Built $4M Training Program"</span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginTop: '2rem' }}>Your Starting Point</h3>
          <p>
            Don't have a TEDx talk or Fortune 500 client yet? No problem. The frameworks below work 
            for every experience level – from industry expert to seasoned pro.
          </p>

          <div className="section-divider">•</div>

          {/* When You Have Industry Experience */}
          <h2 className="headline">When You Have Industry Experience (But No Speaking Credentials)</h2>
          <p>
            When you're just starting out as a speaker but have much professional
            expertise, focus on translating your industry knowledge into
            credibility.
          </p>
          <div className="template-box">
            <p>
              <strong>Formula:</strong> [Specific Domain] + [Target Audience] + [Unique Perspective]
            </p>
            <br />
            <p>
              <strong>Bad Example:</strong> <br />
              "Leadership Expert with 15+ Years Experience"
            </p>
            <br />
            <p>
              <strong>Better Example:</strong> <br />
              "Ex-PayPal Director: Tech Startup CFO Advisor"<br />
              "Saved Rural Hospitals $4.2M Through System Redesign"
            </p>
          </div>
          <p>
            <strong>Key Points:</strong>
          </p>
          <ul className="tips">
            <li>Identify the most specific problem you've solved with measurable results</li>
            <li>Connect your background to the challenges your target audience is facing</li>
          </ul>

          <div className="section-divider">•</div>

          {/* When You Have Organization Affiliations */}
          <h2 className="headline">When You Have Organization Affiliations</h2>
          <p>
            Even if you aren't widely known yet, your connections to recognized entities
            can create instant credibility when properly presented.
          </p>
          <div className="template-box">
            <p>
              <strong>Formula:</strong> [Relationship Type] + [Recognized Entity] + [Specific Focus]
            </p>
            <br />
            <p>
              <strong>Bad Example:</strong> <br />
              "Member of Multiple Professional Associations"
            </p>
            <br />
            <p>
              <strong>Better Example:</strong> <br />
              "Advisory Council: National Retail Federation Tech Division"<br />
              "Research Contributor: LinkedIn's Future of Work Initiative"
            </p>
          </div>
          <p>
            <strong>Key Points:</strong>
          </p>
          <ul className="tips">
            <li>Choose organizations immediately recognizable to your target audience</li>
            <li>Specify your exact role to demonstrate ongoing involvement</li>
          </ul>

          <div className="section-divider">•</div>

          {/* When You Have Content/Publications */}
          <h2 className="headline">When You Have Content/Publications</h2>
          <p>
            Transform even modest content contributions into powerful credibility signals
            that position you as a thought leader.
          </p>
          <div className="template-box">
            <p>
              <strong>Formula:</strong> [Content Type] + [Platform/Publisher] + [Subject Specialization]
            </p>
            <br />
            <p>
              <strong>Bad Example:</strong> <br />
              "Published Author and Podcaster"
            </p>
            <br />
            <p>
              <strong>Better Example:</strong> <br />
              "Author: 'The 90-Day Client Retention System' (15,000+ copies)"<br />
              "Featured in Forbes: Customer Experience Transformation Strategies"
            </p>
          </div>
          <p>
            <strong>Key Points:</strong>
          </p>
          <ul className="tips">
            <li>Include specific metrics that demonstrate impact whenever possible</li>
            <li>Name the most recognized platforms where your content has appeared</li>
          </ul>

          <div className="section-divider">•</div>

          {/* When You Have Previous Speaking Experience */}
          <h2 className="headline">When You Have Previous Speaking Experience</h2>
          <p>
            Even limited speaking history can be leveraged into impressive credentials when
            properly framed.
          </p>
          <div className="template-box">
            <p>
              <strong>Formula:</strong> [Audience Type] + [Notable Organization/Event] + [Topic Impact]
            </p>
            <br />
            <p>
              <strong>Bad Example:</strong> <br />
              "Experienced International Speaker"
            </p>
            <br />
            <p>
              <strong>Better Example:</strong> <br />
              "TEDx Speaker: 'The Invisible Patterns of Team Performance' (850K+ views)"<br />
              "Keynote: Microsoft's Regional Leadership Summit (Highest-Rated Session)"
            </p>
          </div>
          <p>
            <strong>Key Points:</strong>
          </p>
          <ul className="tips">
            <li>Feature the most recognized organizations or events you've spoken for</li>
            <li>Quantify your impact with audience size, evaluation scores, or testimonials</li>
          </ul>

          <div className="section-divider">•</div>

          {/* Why This Matters */}
          <h2 className="headline">Final Thoughts</h2>
          <p>
            Your first outreach message has one primary goal: starting a conversation. NOT
            making a sale! Your signature credential works silently to build credibility.
          </p>
          <p>This is impactful because:</p>
          <ol className="list-decimal list-inside mb-4">
            <li>
              <strong>Positioning Above Website Link:</strong> When decision-makers are
              intrigued enough to click your website link, they've already seen your
              credential – creating a positive frame for everything they read next.
            </li>
            <li>
              <strong>Reduced Pressure in Messages:</strong> With your signature handling
              the credibility-building, your messages can be more conversational.
            </li>
            <li>
              <strong>Consistent Background Authority:</strong> Every email you send
              reinforces your position as an authority without you having to mention it
              explicitly in the body of your message.
            </li>
          </ol>
          <p>
            When it comes to cold outreach, getting booked isn't about selling your services –
            it's about starting meaningful conversations with the right people. Your
            signature credential punches above it's weight in that regard.
          </p>

          <div className="section-divider">•</div>

          {/* Ready to Put This Into Practice? */}
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
                The Silent Seller Email Signature Framework is already built into
                SpeakerDrive's AI composer.
                <br />
                <br />
                Our platform doesn't just help you find speaking opportunities – it
                helps you position yourself effectively every time.
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
                "Automatically includes your signature credential in outreach messages",
                "Helps you find verified decision-maker contact information",
                "Generates personalized outreach based on your specific background",
                "Tracks which messages get the best response rates",
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
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-base leading-snug">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-xl relative">
            <div className="h-px bg-gradient-to-r from-gray-200 via-transparent to-gray-200 mb-2"></div>
            <p className="text-gray-700 text-lg mb-6">
              Try SpeakerDrive free and see how our intelligent outreach tools can
              fill your speaking calendar.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="https://app.speakerdrive.com/signup"
                className="cta-button w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Get Started. It&apos;s FREE! 🚀
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">No credit card required</p>
          </div>
        </div>
      </section>

      <Footer5 />
    </div>
  );
}