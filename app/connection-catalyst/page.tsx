"use client";

import Link from "next/link";
import { Footer5 } from "@/components/layout/Footer";

export default function ConnectionCatalystPage() {
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
          <h1>THE CONNECTION CATALYST FORMULA</h1>
          <p className="mb-6 text-lg font-semibold">
            A powerful value nugget to help you book more speaking engagements
          </p>

          {/* Why I'm Sharing This */}
          <h2 className="headline">Why I'm sharing this with you:</h2>
          <ul className="tips">
            <li>
              The best way to get booked isn't to talk about yourself—it's to
              offer genuine value to event planners
            </li>
            <li>
              This networking formula is a proven tactic that makes planners
              look like heroes to their attendees and bosses
            </li>
            <li>
              Using this approach in your outreach will instantly differentiate
              you from other speakers who only talk about their credentials
            </li>
          </ul>

          <div className="section-divider">•</div>

          {/* THE 15-3-1 NETWORKING FORMULA */}
          <h2 className="headline">THE 15-3-1 NETWORKING FORMULA</h2>

          {/* The Problem */}
          <h3>The Problem</h3>
          <p>
            In order to offer genuine value to planners, you'll need to help
            them solve a problem. Here's a great way to do so that's easy to
            implement and makes a huge impact:
          </p>
          <p>
            Event attendees consistently rank <strong>"meaningful networking"</strong> as their #1 priority, yet it's
            also the #1 complaint after most events. Traditional networking
            (cocktail hours, random mingling, business card exchanges)
            consistently underdelivers, leaving planners with mediocre survey
            results.
          </p>
          <p>This is a pain point you can help them solve!</p>

          {/* The Solution & Case Study */}
          <h3>The Solution &amp; Case Study</h3>
          <p>
            The "<strong>15-3-1 Formula</strong>" is a structured approach that
            doubled meaningful connections at Dreamforce and received an 87%
            satisfaction rating compared to traditional networking.
          </p>
          <p>Here's how it works:</p>
          <ul className="tips">
            <li>15-minute small group discussions with 4-6 attendees</li>
            <li>3 targeted questions provided by organizers (focused on industry challenges)</li>
            <li>1 accountability connection that each person commits to follow up with</li>
          </ul>
          <p>
            Organizers pre-assigned diverse groups, created conversation cards
            with the questions, and built follow-up time into the agenda.
            Attendees remained actively engaged with their new connections 3
            months after the event, with measurable business collaborations
            resulting directly from these structured interactions.
          </p>
          <p>
            Most importantly, the event planners received credit for innovating
            the conference experience, enhancing their professional reputation
            and improving their overall event metrics.
          </p>

          {/* Why Event Planners Will Care */}
          <h3>Why Event Planners Will Care</h3>
          <p>Event planners who implement this formula:</p>
          <ul className="tips">
            <li>Solve the #1 attendee complaint ("networking was a waste of time")</li>
            <li>See post-event surveys with an 87% satisfaction spike in a critical area</li>
            <li>Get positive feedback from sponsors about increased booth engagement</li>
            <li>Enhance their reputation as innovative problem-solvers</li>
          </ul>

          {/* Email Template */}
          <h3>Email Template To Send Event Planners</h3>
          <div className="template-box">
            <p>Subject: Quick idea for [Event Name]</p>
            <br />
            <p>Hi [Name],</p>
            <p>
              I noticed you're organizing [Their Event] in [Month].
            </p>
            <p>
              When I spoke at a conference recently, I learned about this
              "15-3-1 Formula" they used that increased meaningful connections
              among attendees by 87%.
            </p>
            <p>
              Thought this might be interesting for your upcoming event - let me
              know if you'd like to hear more about it.
            </p>
            <br />
            <p>
              [Your Name]
            </p>
          </div>

          {/* The Value Nugget Details */}
          <h3>The Value Nugget Details</h3>
          <p>If they respond, here's what to share:</p>
          <div className="template-box">
            <p>Thanks for your interest!</p>
            <p>
              The "15-3-1 Formula" was actually implemented at Dreamforce (I
              wish I could take credit for it!). Here's the basic structure:
            </p>
            <ol style={{ paddingLeft: "1.2rem", marginBottom: "1rem" }}>
              <li>15-minute small group discussions with 4-6 attendees</li>
              <li>3 targeted questions everyone discusses (focused on industry challenges)</li>
              <li>1 accountability connection each person makes to follow up after the event</li>
            </ol>
            <p>
              The organizers pre-assigned diverse groups, created conversation
              cards with the questions, and built follow-up time into the
              agenda. Attendees loved it because they left with actual
              connections instead of just business cards.
            </p>
            <p>
              One thing I thought was clever - the post-event surveys showed a
              massive spike in networking satisfaction, which made the planning
              team look brilliant to their execs. Sponsors were happier too
              since attendees were more engaged throughout the entire event.
            </p>
            <p>
              Have you tried anything like this before? I'd be curious to hear
              what's worked well for networking at your past events.
            </p>
            <br />
            <p>[Your Name]</p>
          </div>

          {/* Bonus Nugget */}
          <h3>BONUS NUGGET: The Surprise Speaker Moment</h3>
          <p>
            Keep this in your back pocket as a follow-up value nugget or add it
            to your initial response for even more impact:
          </p>
          <p>
            By the way, another cool tactic I've seen work really well is what I
            call the "Surprise Speaker Moment."
          </p>
          <p>
            A conference I attended announced an unscheduled speaker just 2
            hours before they appeared. It created this amazing buzz - their
            social mentions jumped over 200% and the room was packed. Everyone
            was talking about it for the rest of the event.
          </p>
          <p>
            The beauty is it doesn't cost anything extra if you already have
            speakers budgeted - you just keep one off the published schedule.
            Their announcement was simple: "SURPRISE SESSION: We've just
            confirmed [Speaker] will be joining us today at 2PM for a special
            fireside chat. First come, first served."
          </p>
          <p>
            Just thought I'd share since it worked so well. Would something like
            that fit with what you're planning?
          </p>
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
                The Connection Catalyst Formula is already built into
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
                "Automatically analyzes event details to create relevant connections",
                "Suggests proven value nuggets like the 15-3-1 Formula",
                "Generates personalized outreach based on your specific background"
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
                href="https://www.speakerdrive.com/coming-soon"
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
