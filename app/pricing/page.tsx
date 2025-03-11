"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Check, Circle, Rocket, UserCircle2, Zap, ArrowRight } from 'lucide-react';
import { FAQ } from "@/components/sections/FAQ";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";

// Define types for the pricing components
interface PricingToggleProps {
  isAnnual: boolean;
  setIsAnnual: React.Dispatch<React.SetStateAction<boolean>>;
}

// Pricing toggle component
function PricingToggle({ isAnnual, setIsAnnual }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <span className={`text-sm font-medium ${!isAnnual ? 'text-black' : 'text-gray-500'}`}>Monthly</span>
      <button
        onClick={() => setIsAnnual(!isAnnual)}
        className="relative h-7 w-12 rounded-full bg-gray-200"
      >
        <div
          className={`absolute left-1 top-1 h-5 w-5 transform rounded-full bg-green-500 transition-transform duration-200 ${
            isAnnual ? 'translate-x-5' : ''
          }`}
        />
      </button>
      <span className={`text-sm font-medium ${isAnnual ? 'text-black' : 'text-gray-500'}`}>
        Annually <span className="text-green-600 text-xs font-bold ml-1">Save 20%</span>
      </span>
    </div>
  );
}

// Define types for pricing features
interface PricingFeature {
  text: string;
  disabled?: boolean;
}

// Define types for pricing plan
interface PricingPlan {
  name: string;
  description: string;
  price: {
    monthly: number;
    annually?: number;
  };
  icon: React.ReactNode;
  ctaLink?: string;
  features: PricingFeature[];
  priceSubtitle?: string;
}

// Define types for pricing card props
interface PricingCardProps {
  plan: PricingPlan;
  isPopular?: boolean;
  isAnnual: boolean;
}

// Pricing Card component
function PricingCard({ plan, isPopular = false, isAnnual }: PricingCardProps) {
  const monthly = plan.price.monthly;
  const annually = plan.price.annually || monthly * 10; // Default to 10x monthly for annual
  const currentPrice = isAnnual ? annually : monthly;
  
  return (
    <div className={`relative bg-white rounded-lg overflow-hidden ${isPopular ? 'border-[3px] border-green-500 shadow-lg' : 'border border-gray-200'}`}>
      {isPopular && (
        <div className="absolute right-0 top-0">
          <div className="bg-green-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-bl-lg">
            Popular
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Icon centered at top */}
        <div className="flex justify-center mb-3">
          <div className={`flex items-center justify-center ${isPopular ? 'text-green-500' : 'text-gray-700'}`}>
            {plan.icon}
          </div>
        </div>
        
        {/* Plan name */}
        <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm text-center mb-6">{plan.description}</p>
        
        {/* Price */}
        <div className="mb-6 text-center">
          <div className="flex items-baseline justify-center">
            <span className="text-5xl font-bold">${currentPrice}</span>
            <span className="text-gray-500 ml-1 text-sm">/{isAnnual ? 'year' : 'month'}</span>
          </div>
          {plan.priceSubtitle && (
            <p className="text-xs text-gray-500 mt-1">{plan.priceSubtitle}</p>
          )}
        </div>
        
        {/* CTA Button */}
        <Link 
          href={plan.ctaLink || "/signup"} 
          className={`block w-full py-3 px-4 rounded text-center font-bold transition-colors ${
            isPopular 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          } mb-6`}
        >
          {isPopular ? 'Get Growth' : `Get ${plan.name}`}
        </Link>
        
        {/* Feature list header */}
        <div className="mb-4"></div>
        
        {/* Feature list */}
        <div className="space-y-3">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2">
              {feature.disabled ? (
                <div className="h-5 w-5 flex-shrink-0 text-red-500">✕</div>
              ) : (
                <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
              )}
              <span className={`text-sm ${feature.disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans: PricingPlan[] = [
    {
      name: "Free Trial",
      description: "Try it risk free",
      price: {
        monthly: 0,
        annually: 0
      },
      icon: <Circle className="h-9 w-9" />,
      ctaLink: "/signup",
      features: [
        { text: "10 Unlocks" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports", disabled: true },
        { text: "Advanced Integrations", disabled: true },
      ]
    },
    {
      name: "Growth",
      description: "Just getting started",
      price: {
        monthly: 49,
        annually: 490
      },
      icon: <Rocket className="h-9 w-9" />,
      ctaLink: "/signup",
      features: [
        { text: "300 Unlocks / Month" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports", disabled: true },
        { text: "Advanced Integrations", disabled: true },
      ]
    },
    {
      name: "Premium",
      description: "For power users",
      price: {
        monthly: 129,
        annually: 1290
      },
      icon: <Zap className="h-9 w-9" />,
      ctaLink: "/signup",
      features: [
        { text: "1,000 Unlocks / Month" },
        { text: "Message Composer" },
        { text: "Gmail Integration" },
        { text: "SpeakerDrive Tools" },
        { text: "Bulk Exports" },
        { text: "Advanced Integrations" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <HeaderFinal 
        companyName="SpeakerDrive"
        logo={<img src="/SpeakerDrive Logo - Long.png" alt="SpeakerDrive" className="h-8" />}
        links={[
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      
      <main className="pt-24">
        {/* Pricing Hero */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Ready To Start? We Make It Easy</h1>
              <p className="text-lg text-gray-600 mb-10">
                You don't even need a credit card
              </p>
              
              <PricingToggle isAnnual={isAnnual} setIsAnnual={setIsAnnual} />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative max-w-4xl mx-auto">
                <PricingCard plan={plans[0]} isAnnual={isAnnual} />
                <PricingCard plan={plans[1]} isPopular={true} isAnnual={isAnnual} />
                <PricingCard plan={plans[2]} isAnnual={isAnnual} />
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-gray-500 text-sm">
                  Need a custom plan for your team or agency? <a href="#contact" className="text-brand-blue font-medium">Contact us</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature comparison table with more compact margins */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">All SpeakerDrive plans come with...</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Every plan includes these powerful features to help you find and book more speaking opportunities
            </p>
            
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Unlocks */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Unlock Contact Info</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Contact Emails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Event Emails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Event URLs</span>
                    </li>
                  </ul>
                </div>

                {/* Messaging */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Smart Messaging</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Email Composer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">LinkedIn Composer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Application Composer</span>
                    </li>
                  </ul>
                </div>

                {/* Tools */}
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">Useful Tools</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Ask SpeakerDrive AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Email & Mobile Finder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">Company Lookup</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section with more compact width */}
        <section id="faq" className="bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <FAQ
              title="FAQs"
              description=""
              content={[
                {
                  title: "What's included in the free trial?",
                  value: "trial-includes",
                  content: "The free trial includes up to 10 unlocks. You can search for opportunities, unlock contact information, and use our AI-powered outreach tools with no restrictions.",
                },
                {
                  title: "Do I need a credit card to start?",
                  value: "credit-card",
                  content: "No, you don't need a credit card to start your free trial. You can try SpeakerDrive risk-free and only enter payment information if you decide to continue after the trial.",
                },
                {
                  title: "Can I change plans anytime?",
                  value: "change-plans",
                  content: "Yes, you can upgrade, downgrade, or cancel your plan at any time.",
                },
                {
                  title: "What happens when I hit my monthly lead limit?",
                  value: "lead-limit",
                  content: "When you reach your monthly lead limit, you can upgrade to a higher tier plan to access more leads, or wait until your next billing cycle when your lead count resets.",
                },
                {
                  title: "Is there a long-term contract?",
                  value: "cancel",
                  content: "No, all plans are month-to-month with no long-term commitment required. You can cancel anytime and won't be charged for future months.",
                },
                {
                  title: "Do you offer team or agency pricing?",
                  value: "team-pricing",
                  content: "Yes, we offer custom plans if you need more leads. Agencies can also get custom pricing - contact us to discuss your needs.",
                },
              ]}
            />
          </div>
        </section>
      </main>
      
      <Footer5 />
    </div>
  );
}