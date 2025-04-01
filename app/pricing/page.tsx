"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Circle, Rocket, Zap } from "lucide-react";
import { FAQ } from "@/components/sections/FAQ";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { NotificationBanner } from "@/components/ui/NotificationBanner";
import { Footer5 } from "@/components/layout/Footer";

// ========== TYPES ==========

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
  };
  icon: React.ReactNode;
  ctaLink?: string;
  features: PricingFeature[];
}

// Props for a single PricingCard
interface PricingCardProps {
  plan: PricingPlan;
  isPopular?: boolean;
}

// ========== COMPONENTS ==========

// Single pricing card
function PricingCard({ plan, isPopular = false }: PricingCardProps) {
  return (
    <div
      className={`
        relative bg-white rounded-lg overflow-hidden
        ${isPopular
          ? "border-[3px] border-green-500 shadow-lg -mt-2" // raises the "Popular" plan
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
          <div className="flex items-baseline justify-center whitespace-nowrap gap-1">
            <span className="text-5xl font-bold leading-none">${plan.price.monthly}</span>
            <span className="text-2xl font-normal leading-none">/m</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">(Billed quarterly)</p>
        </div>

        {/* CTA Button */}
        <Link
          href={plan.ctaLink || "#"}
          className={
            plan.name === "Free Trial"
              ? "block w-full py-3 px-4 rounded font-bold text-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 mb-6"
              : "block w-full py-3 px-4 rounded font-bold text-center bg-green-500 text-white hover:bg-green-600 mb-6"
          }
        >
          Get Free Trial
        </Link>

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
  // Plans
  const plans: PricingPlan[] = [
    {
      name: "Free Trial",
      description: "Try it risk free",
      price: { monthly: 0 },
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
      price: { monthly: 49 }, // $49/m, billed quarterly
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
      price: { monthly: 149 }, // $149/m, billed quarterly
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
      <div className="flex flex-col">
        <NotificationBanner />
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
                  Get Early Access To SpeakerDrive
                </h1>
                {/* Subheadline */}
                <p className="text-md md:text-lg text-gray-600 mb-8">
                  Join now to lock in early adopter benefits and help shape the future.
                  You don&apos;t even need a credit card.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <PricingCard plan={plans[0]} />
                  <PricingCard plan={plans[1]} isPopular />
                  <PricingCard plan={plans[2]} />
                </div>

                {/* Beta pricing note */}
                <p className="text-sm text-gray-700 mt-6">
                  Join our early access program and receive lifetime discounted pricing.
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

          {/* 
            The "All SpeakerDrive plans come with..." section (feature comparison)
            is removed per your request.
          */}

          {/* FAQ Section - now immediately after pricing */}
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
    </div>
  );
}
