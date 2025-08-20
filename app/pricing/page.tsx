"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X, Sparkles, Rocket, Zap, TrendingUp, Calendar, Target } from "lucide-react";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// ================== PRICING TYPES & COMPONENTS ==================

interface PricingFeature {
  text: string;
  disabled?: boolean;
  bold?: boolean;
  indent?: boolean;
  isHeader?: boolean;
  hideIcon?: boolean;
}

interface PricingPlan {
  name: string;
  subtitle: string;
  icon: React.ReactNode;
  ctaLink?: string;
  ctaText?: string;
  priceHeading: React.ReactNode;
  priceSubtext: string;
  isPopular?: boolean;
  features: PricingFeature[];
}

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
  const { isPopular } = plan;

  return (
    <div
      className={`
        relative bg-white rounded-xl
        ${isPopular
          ? "border-2 border-green-500 shadow-xl"
          : "border border-gray-200 shadow-sm"
        }
        overflow-visible transition-all hover:shadow-lg
      `}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
            ⭐ Most Popular
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

        {/* Plan Name & Subtitle */}
        <h3 className="text-2xl font-bold text-center mb-1">{plan.name}</h3>
        <p className="text-gray-600 text-sm text-center mb-6 italic">{plan.subtitle}</p>

        {/* Price Display */}
        <div className="mb-6 text-center">
          <div className="text-3xl font-bold leading-none">
            {plan.priceHeading}
            <span className="text-sm font-normal text-gray-500">/mo</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">{plan.priceSubtext}</p>
        </div>

        {/* CTA Button */}
        <Link
          href={plan.ctaLink || "#"}
          className="block w-full py-2.5 px-4 rounded-lg text-center transition-colors mb-6 bg-green-500 text-white hover:bg-green-600 shadow-md"
        >
          <div className="text-lg font-bold">Start Free Trial</div>
          <div className="text-[10px] font-normal -mt-0.5 opacity-90">No Credit Card Needed</div>
        </Link>

        {/* Feature List */}
        <div className="space-y-2">
          {plan.features.map((feature, i) => (
            <div key={i}>
              {feature.isHeader ? (
                <div className={`text-xs font-semibold text-gray-500 uppercase tracking-wider ${i === 0 ? '' : 'mt-5'} mb-3`}>
                  {feature.text}
                </div>
              ) : (
                <div className={`flex items-start gap-3`}>
                  {!feature.hideIcon && (
                    feature.disabled ? (
                      <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    )
                  )}
                  <span className={`text-sm text-gray-700 ${feature.bold ? 'font-bold' : ''} ${feature.hideIcon && !feature.indent ? 'mb-1' : ''}`}>
                    {feature.text}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================== FAQ CONTENT ==================
const PRICING_FAQ_ITEMS = [
  {
    question: "I'm already too busy. How much time does this really take?",
    answer: "Just 15-30 minutes daily. That's less time than scrolling LinkedIn, but instead of consuming content, you're booking paid gigs. Our smart composer means you can send 10 personalized messages in the time it used to take to write one."
  },
  {
    question: "How is this different from hiring an assistant or marketing agency?",
    answer: "Assistants cost $2,000-4,000/month and still need training. Marketing agencies charge even more than that for lead generation. SpeakerDrive gives you the same result for the price of a coffee per day, and you're in full control."
  },
  {
    question: "What's the difference between Event and Contact Emails?",
    answer: "Event Emails are general inboxes (events@, speakers@) while Contact Emails are personal addresses for specific decision-makers. LAUNCH plan unlocks Event Emails only. SCALE and DOMINATE unlock both types. ALL email addresses are double verified and you get a refund for invalid info."
  },
  {
    question: "What if I'm not getting responses?",
    answer: "If you're not getting responses, we'll personally help you refine your approach until you do. We only succeed when you're booking gigs."
  },
  {
    question: "How quickly will I see results?",
    answer: "Many members see their first interested responses within a couple of days and are booking meetings in the first couple of weeks. The key is consistency - members who spend 15-30 minutes daily on outreach see the fastest results."
  },
  {
    question: "Are there any contracts?",
    answer: "No contracts! SpeakerDrive is month-to-month. Upgrade anytime and changes take effect immediately. Downgrades take effect at your next billing cycle. Cancel anytime with no hassles."
  },
  {
    question: "What integrations do you offer?",
    answer: "SpeakerDrive provides webhook functionality that allows you to push leads to most CRMs, email tools or marketing automation platforms. If you have specific integration questions, please reach out to our support team."
  }
];

// ================== PAGE COMPONENT ==================

export default function PricingPage() {
  const plans: PricingPlan[] = [
    {
      name: "LAUNCH",
      subtitle: "Start booking paid gigs",
      icon: <Sparkles className="h-10 w-10" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      ctaText: "Start Free Trial",
      priceHeading: (
        <>
          $29 <span className="text-base text-gray-400 line-through ml-2">$49</span>
        </>
      ),
      priceSubtext: "Full Featured Trial • Cancel anytime",
      features: [
        { text: "Discovery", isHeader: true },
        { text: "Unlimited Search & Discovery" },
        { text: "LinkedIn Profiles Included" },
        { text: "Filter by Fee, Location & More" },
        { text: "Email Unlocks", isHeader: true },
        { text: "50 Email Unlocks per Month", bold: true, hideIcon: true },
        { text: "Unlock Event Emails" },
        { text: "Unlock Contact Emails", disabled: true },
        { text: "Integrations", isHeader: true },
        { text: "Connect to Gmail" },
        { text: "CRM Export / Webhooks", disabled: true },
        { text: "Integration Setup 1:1 Session", disabled: true }
      ]
    },
    {
      name: "SCALE",
      subtitle: "Build steady revenue",
      icon: <Rocket className="h-10 w-10" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      ctaText: "Start Free Trial",
      priceHeading: (
        <>
          $99 <span className="text-base text-gray-400 line-through ml-2">$149</span>
        </>
      ),
      priceSubtext: "Full Featured Trial • Cancel anytime",
      isPopular: true,
      features: [
        { text: "Discovery", isHeader: true },
        { text: "Unlimited Search & Discovery" },
        { text: "LinkedIn Profiles Included" },
        { text: "Filter by Fee, Location & More" },
        { text: "Email Unlocks", isHeader: true },
        { text: "200 Email Unlocks per Month", bold: true, hideIcon: true },
        { text: "Unlock Event Emails" },
        { text: "Unlock Contact Emails" },
        { text: "Integrations", isHeader: true },
        { text: "Connect to Gmail" },
        { text: "CRM Export / Webhooks" },
        { text: "Integration Setup 1:1 Session", disabled: true }
      ]
    },
    {
      name: "DOMINATE",
      subtitle: "Scale your impact",
      icon: <Zap className="h-10 w-10" />,
      ctaLink: "https://app.speakerdrive.com/signup",
      ctaText: "Start Free Trial",
      priceHeading: (
        <>
          $249 <span className="text-base text-gray-400 line-through ml-2">$399</span>
        </>
      ),
      priceSubtext: "Full Featured Trial • Cancel anytime",
      features: [
        { text: "Discovery", isHeader: true },
        { text: "Unlimited Search & Discovery" },
        { text: "LinkedIn Profiles Included" },
        { text: "Filter by Fee, Location & More" },
        { text: "Email Unlocks", isHeader: true },
        { text: "750 Email Unlocks per Month", bold: true, hideIcon: true },
        { text: "Unlock Event Emails" },
        { text: "Unlock Contact Emails" },
        { text: "Integrations", isHeader: true },
        { text: "Connect to Gmail" },
        { text: "CRM Export / Webhooks" },
        { text: "Integration Setup 1:1 Session" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="flex flex-col">
        {/* Header */}
        <HeaderFinal
          companyName="SpeakerDrive"
          logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
        />

        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-12 md:py-16 text-center">
            <div className="mx-auto max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Simple Pricing. Serious Results.
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-3">
                Lock in beta pricing while it lasts
              </p>
              <p className="text-sm text-green-600 font-medium">
                🎯 No credit card required • 🚀 Beta pricing ends soon
              </p>
            </div>
          </section>

          {/* Value Props Bar */}
          <section className="pb-12">
            <div className="mx-auto max-w-5xl px-4">
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <p className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider mb-6">
                  Every Plan Includes Everything You Need
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 md:gap-12">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-sm sm:text-base">11,000+ opportunities</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-sm sm:text-base">Double verified email addresses</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <span className="text-gray-800 font-medium text-sm sm:text-base">Smart message composer</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Cards */}
          <section className="pb-8">
            <div className="mx-auto max-w-5xl px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {plans.map((plan, index) => (
                  <PricingCard key={index} plan={plan} />
                ))}
              </div>

              {/* Social Proof Bar */}
              <div className="mt-12 text-center">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">🔥 Beta members are seeing results:</span> First interested responses normally within days
                </p>
              </div>
            </div>
          </section>

          {/* Platform Features */}
          <section className="py-12 bg-white">
            <div className="mx-auto max-w-4xl px-4">
              <h2 className="text-2xl font-bold text-center mb-8">Other Great Platform Features</h2>
              
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <span className="text-2xl">🔄</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">Lead Cool-Off</h3>
                      <p className="text-sm text-gray-600">Contacts are temporarily removed after outreach to prevent over-exposure and maintain platform effectiveness.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <span className="text-2xl">💳</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">Invalid Info Refunds</h3>
                      <p className="text-sm text-gray-600">Found bad data? Rate it "Poor" and get your credit back automatically (fair use applies).</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <span className="text-2xl">⚡</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">First-Access to New Leads</h3>
                      <p className="text-sm text-gray-600">Premium users get exclusive early access to freshly added opportunities before they're released to everyone.</p>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="bg-gray-50 py-16">
            <div className="max-w-2xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-600">
                  We're here to help
                </p>
              </div>

              <div className="w-full">
                <Accordion collapsible className="space-y-4">
                  {PRICING_FAQ_ITEMS.map((item, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index}`}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed text-left">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="mt-12 text-center">
                <p className="text-gray-700 mb-6">
                  Still have questions? We're here to help.
                </p>
                <a
                  href="https://speakerdrive.com/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors font-medium"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </section>

          {/* ROI Calculator Section */}
          <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="mx-auto max-w-4xl px-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6">Do The Math: SpeakerDrive Pays for Itself</h2>
                
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="space-y-2">
                      <p className="font-bold text-gray-900">LAUNCH Plan:</p>
                      <p className="text-sm text-gray-600">Book ONE $1,500 gig</p>
                      <p className="text-green-600 font-bold">= Paid for 4+ years</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-900">SCALE Plan:</p>
                      <p className="text-sm text-gray-600">Book ONE $5,000 gig</p>
                      <p className="text-green-600 font-bold">= Paid for 4+ years</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-bold text-gray-900">DOMINATE Plan:</p>
                      <p className="text-sm text-gray-600">Book ONE $10,000 gig</p>
                      <p className="text-green-600 font-bold">= Paid for 3+ years</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold">Ask Yourself:</span>
                      <br />What's the cost of NOT being on SpeakerDrive?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-white mb-8">Which plan is right for you?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur">
                  <div className="text-3xl mb-3">🚀</div>
                  <h3 className="font-bold mb-2 text-white">Starting out?</h3>
                  <p className="text-sm text-white/90">LAUNCH gets you in the game with focused, strategic outreach</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-white/20 backdrop-blur border-2 border-white/30">
                  <div className="text-3xl mb-3">📈</div>
                  <h3 className="font-bold mb-2 text-white">Ready to grow?</h3>
                  <p className="text-sm text-white/90">SCALE builds momentum with consistent pipeline development</p>
                </div>
                
                <div className="text-center p-6 rounded-lg bg-white/10 backdrop-blur">
                  <div className="text-3xl mb-3">👑</div>
                  <h3 className="font-bold mb-2 text-white">Going pro?</h3>
                  <p className="text-sm text-white/90">DOMINATE gives you maximum reach and results</p>
                </div>
              </div>

              <Link
                href="https://app.speakerdrive.com/signup"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors font-bold text-lg shadow-xl"
              >
                Start Your Free Trial →
              </Link>
              <p className="text-sm text-white/80 mt-4">
                No credit card required • Cancel anytime
              </p>
            </div>
          </section>
        </main>

        <Footer5 />
      </div>
    </div>
  );
}