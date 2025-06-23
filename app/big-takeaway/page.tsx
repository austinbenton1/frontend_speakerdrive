"use client";

import Link from "next/link";
import { Footer5 } from "@/components/layout/Footer";

export default function OneBigTakeawayPage() {
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
          <h1>THE ONE-BIG-TAKEAWAY EMAIL FORMULA</h1>
          <p className="mb-6 text-lg font-semibold">
            The 20-minute tactic that boosts event engagement &amp; retention
          </p>

          {/* Why I'm Sharing This */}
          <h2 className="headline">Why I'm sharing this with you:</h2>
          <ul className="tips">
            <li>
              The best way to get booked isn't to talk about yourself—it's to
              offer genuine value to event planners
            </li>
            <li>
              This simple email tactic has measurable results that make planners
              look exceptional to both attendees and management
            </li>
            <li>
              Sharing this approach positions you as a thoughtful partner in
              creating event success, not just another speaker
            </li>
          </ul>

          <div className="section-divider">•</div>

          {/* The Problem */}
          <h2 className="headline">The Problem</h2>
          <p>
            In order to offer genuine value to planners, you need to help them
            solve real challenges. Here's a powerful, easy-to-implement tactic
            that addresses a universal problem:
          </p>
          <p>
            Multi-day events create information overload. Attendees struggle to
            remember key insights, feel overwhelmed by packed agendas, and often
            miss important connections between sessions. This leads to lower
            perceived value and weaker post-event implementation of ideas.
          </p>
          <p>This is a pain point you can help planners solve!</p>

          <div className="section-divider">•</div>

          {/* The Solution & Case Study */}
          <h2 className="headline">The Solution &amp; Case Study</h2>
          <p>
            The "<strong>One-Big-Takeaway Email</strong>" is a simple daily recap
            sent to attendees each evening of a multi-day event. At several
            successful conferences, organizers have implemented this approach
            with impressive results.
          </p>
          <p>Here's how it works:</p>
          <ul className="tips">
            <li>A short email (150-200 words) sent each evening</li>
            <li>
              Format includes "3 quick highlights you might have missed" + "today's
              big takeaway"
            </li>
            <li>Takes just 20 minutes to assemble each day</li>
            <li>Written in a conversational, personalized tone</li>
          </ul>
          <p>
            While industry average email open rates typically hover around
            33-40%, conference-specific communications that provide immediate
            value can see significantly higher engagement — often 70%+ when
            timed well and delivering concise, actionable insights. Many
            attendees forward these emails to colleagues who couldn't attend,
            extending the event's reach.
          </p>

          <div className="section-divider">•</div>

          {/* Why Event Planners Will Care */}
          <h2 className="headline">Why Event Planners Will Care</h2>
          <p>Event planners who implement this formula:</p>
          <ul className="tips">
            <li>See dramatically higher content retention from attendees</li>
            <li>Generate additional exposure when emails are forwarded</li>
            <li>Create a valuable content asset they can repurpose after the event</li>
            <li>Gather real-time feedback on which sessions resonated most</li>
            <li>
              Demonstrate extraordinary attention to detail without major time
              investment
            </li>
          </ul>

          <div className="section-divider">•</div>

          {/* Email Template */}
          <h2 className="headline">Email Template To Send Event Planners</h2>
          <div className="template-box">
            <p>
              <strong>Subject:</strong> Quick idea for [Event Name]
            </p>
            <br />
            <p>Hi [Name],</p>
            <p>
              I noticed you're organizing [Their Event] in [Month].
            </p>
            <p>
              When I spoke at a recent conference, I learned about a simple
              daily email tactic they used that dramatically improved attendee
              engagement and information retention.
            </p>
            <p>
              Thought this might be interesting for your upcoming event - let me
              know if you'd like to hear more about it.
            </p>
            <br />
            <p>[Your Name]</p>
          </div>

          <div className="section-divider">•</div>

          {/* The Value Nugget Details */}
          <h2 className="headline">The Value Nugget Details</h2>
          <p>If they respond, here's what to share:</p>
          <div className="template-box">
            <p>Thanks for your interest!</p>
            <br />
            <p>
              The "One-Big-Takeaway Email" is brilliantly simple. Each evening of
              a multi-day event, the organizers sent a short recap email (about
              150 words) that included:
            </p>
            <ul>
              <li>1. Three quick highlights attendees might have missed</li>
              <li>2. One big takeaway that tied everything together</li>
              <li>3. A quick teaser about tomorrow's sessions</li>
            </ul>
            <br />
            <p>
              At several recent conferences, these emails averaged open rates
              far above typical marketing messages, and attendees specifically
              mentioned them as "extremely helpful" in post-event surveys.
            </p>
            <p>
              What I found most clever was how little time it took — the event
              team spent just 20 minutes assembling each email, with session
              hosts providing bullet points throughout the day. Attendees
              appreciated the help processing information, and many forwarded
              them to colleagues who couldn't attend.
            </p>
            <br />
            <p>
              Have you tried anything like this at your past events? I'd be
              curious to hear what's worked well for keeping attendees engaged
              between sessions.
            </p>
            <br />
            <p>[Your Name]</p>
          </div>

          <div className="section-divider">•</div>

          {/* Bonus Nugget */}
          <h2 className="headline">
            BONUS NUGGET: The Post-Event "Handwritten" Postcard
          </h2>
          <p>Keep this in your back pocket as a follow-up value nugget:</p>
          <div className="template-box">
            <p>
              By the way, another tactic I've seen work really well is what I
              call the "Handwritten Postcard Follow-Up."
            </p>
            <br />
            <p>
              A small business conference I attended used a service that creates
              realistic handwritten-style postcards. They sent personalized
              thank-you notes to each attendee about a week after the event.
            </p>
            <p>
              Over 30% of attendees shared photos of their postcards on social
              media, and the organizer saw a 20% higher registration rate for
              their next event compared to previous years.
            </p>
            <p>
              The best part? It cost less than $3 per attendee and took minimal
              time to set up. The personal touch really stands out in our
              digital world.
            </p>
            <p>
              Would something like this complement your post-event strategy?
            </p>
          </div>

          <div className="section-divider">•</div>

          {/* Downloadable Resource */}
          <h2 className="headline">
            DOWNLOADABLE RESOURCE: One-Big-Takeaway Email Template Kit
          </h2>
          <p>
            To make this value nugget even more actionable, we've created a
            complete template kit you can share with event planners. This makes
            you look like a true partner in their success, not just another
            speaker pitching for a slot.
          </p>
          <p>The kit includes:</p>
          <ul className="tips">
            <li>
              <strong>1. Ready-to-Use Email Templates</strong>
              <br />
              Three customizable email templates for each day of a multi-day
              event, with placeholders for:
              <ul style={{ marginLeft: "1.5rem" }}>
                <li>Session highlights</li>
                <li>The "big takeaway" framing</li>
                <li>Next-day teasers</li>
                <li>Subject line variations that drive high open rates</li>
              </ul>
            </li>
            <li>
              <strong>2. Implementation Guide</strong>
              <br />
              A simple one-page workflow showing planners exactly:
              <ul style={{ marginLeft: "1.5rem" }}>
                <li>When to send (optimal timing is 7:30-8:00 PM)</li>
                <li>How to collect highlights efficiently during the day</li>
                <li>The exact format that achieves high open rates</li>
                <li>How to measure the impact on attendee engagement</li>
              </ul>
            </li>
          </ul>
          <p>
            This toolkit makes implementing the strategy absolutely frictionless
            for planners. They can literally copy, paste, customize, and send —
            making you look like a hero for providing such practical value
            before you've even been booked.
          </p>
          <p className="text-center">
            <a
              href="/The One-Big-Takeaway Email Kit.pdf"
              download
              className="inline-flex items-center justify-center px-6 py-3 bg-[#29A9FF] text-white rounded-lg hover:bg-[#1a9aff] transition-colors font-semibold"
            >
              Download The Toolkit
            </a>
          </p>

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
                This One-Big-Takeaway Email Formula is already built into
                SpeakerDrive's AI composer.<br />
                <br />
                Our platform doesn't just help you find speaking opportunities –
                it helps you craft the perfect outreach message every time.
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
                "Suggests proven value nuggets like the One-Big-Takeaway Formula",
                "Generates personalized outreach based on your specific background",
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
            <p className="text-sm text-gray-500 mt-4">No credit card required</p>
          </div>
        </div>
      </section>

      <Footer5 />
    </div>
  );
}