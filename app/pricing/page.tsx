"use client";
import Link from "next/link";
import { Check, Circle, Rocket, Zap } from "lucide-react";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { NotificationBanner } from "@/components/ui/NotificationBanner";
import { Footer5 } from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// ================== PRICING TYPES & COMPONENTS ==================

// For plan features
interface PricingFeature {
  text: string;
  disabled?: boolean;
}

// For plan definitions
interface PricingPlan {
  name: string;
  description: string;
  oldPrice?: number; // if defined, we show "Free During Pre-Launch" plus crossed-out price
  icon: React.ReactNode;
  ctaLink?: string;
  features: PricingFeature[];
}

interface PricingCardProps {
  plan: PricingPlan;
  isPopular?: boolean;
}

// Pricing card layout
function PricingCard({ plan, isPopular = false }: PricingCardProps) {
  return (
    <div
      className={`
        relative bg-white rounded-lg overflow-hidden
        ${isPopular
          ? "border-[3px] border-green-500 shadow-lg -mt-2"
          : "border border-gray-200"
        }
      `}
    >
      {isPopular && (
        <div className="absolute right-0 top-0">
          <div className="bg-green-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div
            className={`flex items-center justify-center ${
              isPopular ? "text-green-500" : "text-gray-700"
            }`}
          >
            {plan.icon}
          </div>
        </div>

        {/* Plan Title & Description */}
        <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm text-center mb-6">{plan.description}</p>

        {/* Price Display */}
        <div className="mb-6 text-center">
          {plan.oldPrice !== undefined ? (
            // Growth & Premium
            <div className="flex flex-col items-center justify-center gap-1">
              <div className="text-3xl font-bold leading-none">
                Free During Pre-Launch
              </div>
              <div className="text-base text-gray-400 line-through">
                ${plan.oldPrice} per month <span className="block text-xs">(paid quarterly)</span>
              </div>
            </div>
          ) : (
            // Free Trial plan
            <>
              <div className="text-3xl font-bold leading-none">Free</div>
              <p className="text-gray-500 text-sm mt-1">No credit card required</p>
            </>
          )}
        </div>

        {/* CTA Button */}
        <Link
          href={plan.ctaLink || "#"}
          className="block w-full py-3 px-4 rounded font-bold text-center bg-green-500 text-white hover:bg-green-600 mb-6"
        >
          Get Started
        </Link>

        {/* Feature List */}
        <div className="space-y-3">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              {feature.disabled ? (
                <div className="h-5 w-5 flex-shrink-0 text-red-500">✕</div>
              ) : (
                <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              )}
              <span
                className={`text-sm ${feature.disabled ? "text-gray-400" : "text-gray-700"}`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================== FAQ CONTENT (PRICING) ==================
// We keep your Pricing FAQ questions exactly the same, but style them
// using the two-column accordion from your homepage.

const PRICING_FAQ_ITEMS = [
  {
    question: 'What does "Beta Pricing" mean?',
    answer:
      "SpeakerDrive is currently in beta, and we're offering special introductory rates to early adopters. These special beta rates are temporary and will increase in the future, but early members who sign up during this period will be grandfathered in at today's prices. Join now to secure the best possible rates."
  },
  {
    question: "What's included in the free trial?",
    answer:
      "The free trial includes up to 5 unlocks. You can search for opportunities, unlock contact information, and use our AI-powered outreach tools with no restrictions."
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No, you don't need a credit card to start your free trial. You can try SpeakerDrive risk-free and only enter payment information if you decide to continue after the trial."
  },
  {
    question: "Can I change plans anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time."
  },
  {
    question: "What happens when I hit my monthly lead limit?",
    answer:
      "When you reach your monthly unlock limit, you have three options: upgrade to a higher tier plan, purchase additional one-time unlock credits (at a slightly higher rate than your plan), or wait until your next billing cycle when your lead count resets."
  },
  {
    question: "Is there a long-term contract?",
    answer:
      "No, all plans are month-to-month with no long-term commitment required. You can cancel anytime and won't be charged for future months."
  },
  {
    question: "Do you offer team or agency pricing?",
    answer:
      "Yes, we offer volume-based plans for teams and agencies that need more unlocks. Contact us to discuss your specific requirements."
  },
  {
    question: "How can I export and integrate my leads?",
    answer:
      "You can add leads directly to your CRM, download as CSV, or use our integration with Instantly email platform (coming soon). If you need a custom integration with your existing tools, please contact us to discuss your requirements."
  }
];

// ================== PAGE COMPONENT ==================

export default function PricingPage() {
  const plans: PricingPlan[] = [
    {
      name: "Free Trial",
      description: "Try it risk free",
      icon: <Circle className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      features: [
        { text: "5 Unlocks" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "Ask SpeakerDrive AI" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports", disabled: true },
        { text: "Advanced Integrations", disabled: true },
        { text: "Recently Added Leads", disabled: true }
      ]
    },
    {
      name: "Growth",
      description: "Just getting started",
      oldPrice: 79, // Crossed out
      icon: <Rocket className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      features: [
        { text: "300 Unlocks / Month" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "Ask SpeakerDrive AI" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports", disabled: true },
        { text: "Advanced Integrations", disabled: true },
        { text: "Recently Added Leads", disabled: true }
      ]
    },
    {
      name: "Premium",
      description: "For power users",
      oldPrice: 179, // Crossed out
      icon: <Zap className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      features: [
        { text: "1,500 Unlocks / Month" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "Ask SpeakerDrive AI" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports" },
        { text: "Advanced Integrations" },
        { text: "Recently Added Leads" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col">
        <NotificationBanner />
        {/* Header */}
        <HeaderFinal
          companyName="SpeakerDrive"
          logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
        />

        <main className="pt-16">
          {/* Pricing Hero */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4 text-center">
              <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Get Early Access To SpeakerDrive
                </h1>
                <p className="text-md md:text-lg text-gray-600 mb-8">
                  Join our pre-launch early access program and help shape our future.
                  <br />
                  You don&apos;t even need a credit card.
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <PricingCard plan={plans[0]} />
                  <PricingCard plan={plans[1]} isPopular />
                  <PricingCard plan={plans[2]} />
                </div>

                <p className="text-sm text-gray-700 mt-6">
                  Join our early access program and receive lifetime discounted pricing.
                </p>
                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    Agency, Company Or Referral Partner?{" "}
                    <a
                      href="https://www.speakerdrive.com/contact"
                      className="text-brand-blue font-medium"
                    >
                      Let&apos;s Talk
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section, styled like homepage */}
          <section id="faq" className="bg-white pt-2 pb-8 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4">
              {/* Section Header */}
              <div className="text-center mb-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-blue-100/30 to-blue-50/20 blur-3xl -z-10 opacity-70"></div>
                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                    Common questions about using SpeakerDrive
                  </p>
                </div>
              </div>

              {/* Two-column Accordion */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <Accordion
                  className="space-y-3"
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {PRICING_FAQ_ITEMS.slice(0, Math.ceil(PRICING_FAQ_ITEMS.length / 2)).map(
                    (item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
                      >
                        <AccordionTrigger className="w-full">
                          <div className="flex items-center justify-between w-full text-left">
                            <div className="flex items-center gap-3 px-5 py-4 w-full hover:bg-gray-50/80 transition-colors">
                              <div className="flex-1">
                                <span className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors pr-6">
                                  {item.question}
                                </span>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                  <svg
                                    className="w-4 h-4 text-gray-500 transform transition-transform group-data-[state=open]:rotate-180"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5">
                          <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent rounded-lg blur-md opacity-0 group-data-[state=open]:opacity-100 transition-opacity"></div>
                            <p className="relative text-gray-600 leading-relaxed text-[0.95rem]">
                              {item.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>

                {/* Right Column */}
                <Accordion
                  className="space-y-3"
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {PRICING_FAQ_ITEMS.slice(Math.ceil(PRICING_FAQ_ITEMS.length / 2)).map(
                    (item, index) => (
                      <AccordionItem
                        key={index + Math.ceil(PRICING_FAQ_ITEMS.length / 2)}
                        value={`item-${index + Math.ceil(PRICING_FAQ_ITEMS.length / 2)}`}
                        className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-gray-300 hover:shadow-md transition-all duration-200"
                      >
                        <AccordionTrigger className="w-full">
                          <div className="flex items-center justify-between w-full text-left">
                            <div className="flex items-center gap-3 px-5 py-4 w-full hover:bg-gray-50/80 transition-colors">
                              <div className="flex-1">
                                <span className="text-base font-semibold text-gray-800 group-hover:text-gray-900 transition-colors pr-6">
                                  {item.question}
                                </span>
                              </div>
                              <div className="flex-shrink-0">
                                <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-gray-200 flex items-center justify-center transition-colors">
                                  <svg
                                    className="w-4 h-4 text-gray-500 transform transition-transform group-data-[state=open]:rotate-180"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-5">
                          <div className="relative">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-50/30 via-transparent to-transparent rounded-lg blur-md opacity-0 group-data-[state=open]:opacity-100 transition-opacity"></div>
                            <p className="relative text-gray-600 leading-relaxed text-[0.95rem]">
                              {item.answer}
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <p className="text-lg text-gray-700 mb-8">
                  Still have questions? We're here to help.
                </p>
                <a
                  href="https://speakerdrive.com/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-base font-medium gap-2 shadow-sm hover:shadow"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer5 />
      </div>
    </div>
  );
}
