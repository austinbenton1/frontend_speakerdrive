"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Circle, Rocket, Zap } from "lucide-react";
import { FAQ } from "@/components/sections/FAQ";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";

// ========== TYPES ==========

// Toggle between monthly and annual
interface PricingToggleProps {
  isAnnual: boolean;
  setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
}

// Individual pricing-plan feature
interface PricingFeature {
  text: string;
  disabled?: boolean;
}

// Main pricing-plan definition
interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    annually?: number;
  };
  oldMonthly?: number; // optional "regular" price to show crossed out
  icon: React.ReactNode;
  ctaLink?: string;
  features: PricingFeature[];
  priceSubtitle?: string; // e.g., "Beta Pricing"
}

// Props for a single PricingCard
interface PricingCardProps {
  plan: PricingPlan;
  isPopular?: boolean;
  isAnnual: boolean;
}

// ========== COMPONENTS ==========

// Monthly vs. Annual toggle
function PricingToggle({ isAnnual, setIsAnnual }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <span className={`text-sm font-medium ${!isAnnual ? "text-black" : "text-gray-500"}`}>
        Monthly
      </span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative h-7 w-12 rounded-full bg-gray-200"
      >
        <div
          className={`absolute left-1 top-1 h-5 w-5 transform rounded-full bg-green-500 transition-transform duration-200 ${
            isAnnual ? "translate-x-5" : ""
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isAnnual ? "text-black" : "text-gray-500"}`}>
        Annually <span className="text-green-600 text-xs font-bold ml-1">Save 20%</span>
      </span>
    </div>
  );
}

// Single pricing card
function PricingCard({ plan, isPopular = false, isAnnual }: PricingCardProps) {
  const { monthly, annually } = plan.price;
  // default annual price if not provided
  const finalAnnual = annually ?? monthly * 10;
  const currentPrice = isAnnual ? finalAnnual : monthly;

  return (
    <div
      className={`
        relative bg-white rounded-lg overflow-hidden
        ${isPopular
          ? "border-[3px] border-green-500 shadow-lg -mt-2" // raise the "Popular" plan
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

        {/* Plan name + description */}
        <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm text-center mb-6">{plan.description}</p>

        {/* Pricing */}
        <div className="mb-6 text-center">
          {/* old price on a small line above */}
          {plan.oldMonthly && !isAnnual && (
            <div className="text-base text-gray-600 line-through font-medium mb-1">
              ${plan.oldMonthly}
            </div>
          )}

          {/* main price row with /m on same line */}
          <div className="flex items-baseline justify-center whitespace-nowrap gap-1">
            <span className="text-5xl font-bold leading-none">${currentPrice}</span>
            <span className="text-2xl font-normal leading-none">/m</span>
          </div>

          {/* Beta Pricing note */}
          {plan.oldMonthly && !isAnnual && (
            <p className="text-xs text-gray-500 mt-1">Beta Pricing</p>
          )}

          {plan.priceSubtitle && (
            <p className="text-xs text-gray-500 mt-1">{plan.priceSubtitle}</p>
          )}
        </div>

        {/* CTA Button */}
        {plan.price.monthly === 0 ? (
          // Free trial
          <Link
            href={plan.ctaLink || "#"}
            className="
              block w-full py-3 px-4 rounded font-bold text-center
              border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 mb-6
            "
          >
            Get Free Trial
          </Link>
        ) : (
          // Paid plan
          <Link
            href={plan.ctaLink || "#"}
            className="
              block w-full py-3 px-4 rounded font-bold text-center
              bg-green-500 text-white hover:bg-green-600 mb-6
            "
          >
            {`Get ${plan.name}`}
          </Link>
        )}

        {/* Features */}
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

// ========== PAGE COMPONENT ==========

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  // Plans
  const plans: PricingPlan[] = [
    {
      name: "Free Trial",
      description: "Try it risk free",
      price: { monthly: 0, annually: 0 },
      icon: <Circle className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      features: [
        { text: "5 Unlocks" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports", disabled: true },
        { text: "Advanced Integrations", disabled: true },
      ],
    },
    {
      name: "Growth",
      description: "Just getting started",
      oldMonthly: 89,
      price: {
        monthly: 49,
        annually: 490,
      },
      icon: <Rocket className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      features: [
        { text: "300 Unlocks / Month" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports", disabled: true },
        { text: "Advanced Integrations", disabled: true },
      ],
    },
    {
      name: "Premium",
      description: "For power users",
      oldMonthly: 249,
      price: {
        monthly: 139,
        annually: 1390,
      },
      icon: <Zap className="h-9 w-9" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      features: [
        { text: "1,500 Unlocks / Month" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports" },
        { text: "Advanced Integrations" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <HeaderFinal
        companyName="SpeakerDrive"
        logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
      />

      <main className="pt-16">
        {/* Pricing hero */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Ready To Start?
                <br />
                We Make It Easy
              </h1>
              <p className="text-md md:text-lg text-gray-600 mb-8">
                You don&apos;t even need a credit card
              </p>

              <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <PricingCard plan={plans[0]} isAnnual={isAnnual} />
                <PricingCard plan={plans[1]} isPopular isAnnual={isAnnual} />
                <PricingCard plan={plans[2]} isAnnual={isAnnual} />
              </div>

              {/* Beta pricing note */}
              <p className="text-sm text-gray-700 mt-6">
                Join now to lock in special beta pricing. These rates won&apos;t be offered again.
              </p>

              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Need a custom plan for your team or agency?{" "}
                  <a
                    href="https://www.speakerdrive.com/contact"
                    className="text-brand-blue font-medium"
                  >
                    Contact us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature comparison */}
        <section className="bg-gray-50 pt-8 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              All SpeakerDrive plans come with...
            </h2>
            <p className="text-gray-600 text-center mb-6 max-w-2xl mx-auto">
              Every plan includes these powerful features to help you find and book
              more speaking opportunities
            </p>

            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Unlock Contact Info */}
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    Unlock Contact Info
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Contact Emails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Event Emails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Event URLs</span>
                    </li>
                  </ul>
                </div>

                {/* Smart Messaging */}
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Smart Messaging</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Email Composer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">LinkedIn Composer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Application Composer</span>
                    </li>
                  </ul>
                </div>

                {/* Useful Tools */}
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Useful Tools</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Ask SpeakerDrive AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Email &amp; Mobile Finder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">Company Lookup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* CTA below feature table */}
            <div className="mt-8 flex justify-center">
              <Link
                href="https://app.speakerdrive.com/signup"
                className="
                  inline-flex items-center justify-center rounded-lg
                  bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg font-bold
                  transition-all shadow-md hover:shadow-lg
                  transform hover:-translate-y-1 duration-300
                "
              >
                Get started. It&apos;s FREE! <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section - reduced padding to bring it closer */}
        <section id="faq" className="bg-white pt-4 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <FAQ
              title="FAQs"
              description=""
              content={[
                {
                  title: 'What does "Beta Pricing" mean?',
                  value: "beta-pricing",
                  content:
                    "SpeakerDrive is currently in beta, and we're offering special introductory rates to early adopters. These special beta rates are temporary and will increase in the future, but early members who sign up during this period will be grandfathered in at today's prices. Join now to secure the best possible rates.",
                },
                {
                  title: "What's included in the free trial?",
                  value: "free-trial-includes",
                  content:
                    "The free trial includes up to 5 unlocks. You can search for opportunities, unlock contact information, and use our AI-powered outreach tools with no restrictions.",
                },
                {
                  title: "Do I need a credit card to start?",
                  value: "credit-card",
                  content:
                    "No, you don't need a credit card to start your free trial. You can try SpeakerDrive risk-free and only enter payment information if you decide to continue after the trial.",
                },
                {
                  title: "Can I change plans anytime?",
                  value: "change-plans",
                  content:
                    "Yes, you can upgrade, downgrade, or cancel your plan at any time.",
                },
                {
                  title: "What happens when I hit my monthly lead limit?",
                  value: "lead-limit",
                  content:
                    "When you reach your monthly unlock limit, you have three options: upgrade to a higher tier plan, purchase additional one-time unlock credits (at a slightly higher rate than your plan), or wait until your next billing cycle when your lead count resets.",
                },
                {
                  title: "Is there a long-term contract?",
                  value: "cancel",
                  content:
                    "No, all plans are month-to-month with no long-term commitment required. You can cancel anytime and won't be charged for future months.",
                },
                {
                  title: "Do you offer team or agency pricing?",
                  value: "team-pricing",
                  content:
                    "Yes, we offer volume-based plans for teams and agencies that need more unlocks. Contact us to discuss your specific requirements.",
                },
                {
                  title: "How can I export and integrate my leads?",
                  value: "export-integrations",
                  content:
                    "You can add leads directly to your CRM, download as CSV, or use our integration with Instantly email platform (coming soon). If you need a custom integration with your existing tools, please contact us to discuss your requirements.",
                },
              ]}
            />
          </div>

          {/* CTA below FAQ */}
          <div className="mt-6 flex justify-center">
            <Link
              href="https://app.speakerdrive.com/signup"
              className="
                inline-flex items-center justify-center rounded-lg
                bg-green-500 hover:bg-green-600 text-white px-6 py-3 text-lg font-bold
                transition-all shadow-md hover:shadow-lg
                transform hover:-translate-y-1 duration-300
              "
            >
              Get started. It&apos;s FREE! <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer5 />
    </div>
  );
}
