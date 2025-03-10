"use client";
import { useState } from 'react';
import { Hero } from "@/components/sections/Hero";
import { FeatureBigItem } from "@/components/sections/features/FeatureBigItem";
import { FeatureTwoItem } from "@/components/sections/features/FeatureTwoItem";
import { FAQ } from "@/components/sections/FAQ";
import { CTASection } from "@/components/sections/CTASection";
import { Footer5 } from "@/components/layout/Footer";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { ProspectingSection } from "@/components/sections/ProspectingSection";
import { TheProspectingEffect } from "@/components/sections/TheProspectingEffect";
import { Check, Circle, Rocket, UserCircle2, Zap, ArrowRight } from 'lucide-react';
import Link from "next/link";

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
        <div className="text-sm text-gray-500 mb-4 font-medium">
          Free features
        </div>
        
        {/* Feature list */}
        <div className="space-y-3">
          {plan.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2">
              <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-green-500' : 'text-gray-500'}`} />
              <span className="text-sm text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans: PricingPlan[] = [
    {
      name: "Free Trial",
      description: "For solo entrepreneurs",
      price: {
        monthly: 19,
        annually: 190
      },
      icon: <Circle className="h-9 w-9" />,
      ctaLink: "/signup",
      features: [
        { text: "10 inventory locations" },
        { text: "24/7 chat support" },
        { text: "Localized global selling (3 markets)" },
        { text: "POS Lite" },
      ]
    },
    {
      name: "Growth",
      description: "As your business scales",
      price: {
        monthly: 299,
        annually: 2990
      },
      icon: <Rocket className="h-9 w-9" />,
      ctaLink: "/signup",
      features: [
        { text: "Custom reports and analytics" },
        { text: "100 inventory locations" },
        { text: "Enhanced 24/7 chat support" },
        { text: "Localized global selling (3 markets)" },
        { text: "15 additional staff accounts" },
        { text: "10x checkout capacity" },
      ]
    },
    {
      name: "Premium",
      description: "For more complex businesses",
      price: {
        monthly: 2300,
        annually: 23000
      },
      icon: <Zap className="h-9 w-9" />,
      ctaLink: "/signup",
      features: [
        { text: "Custom reports and analytics" },
        { text: "200 inventory locations" },
        { text: "Priority 24/7 phone support" },
        { text: "Localized global selling (50 markets)" },
        { text: "Unlimited staff accounts" },
        { text: "Fully customizable checkout with 40x capacity" },
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
          { label: "Contact", href: "#contact" },
        ]}
      />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>
        
        {/* Feature Section - Find Qualified Leads */}
        <section id="find-leads">
          <FeatureTwoItem
            title="Find Qualified Leads"
            stepNumber={1}
            description=""
            features={[
              {
                title: "Search Events and Contacts",
                description: "All opportunities in one place.",
              },
              {
                title: "Smart Discovery",
                description: "Customize your search with 11 advanced filters.",
              },
              {
                title: "Fresh Opportunities",
                description: "New leads added daily.",
              },
            ]}
            externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb25da2d5867d8cf31812d.mp4"
          />
        </section>

        {/* Feature Section - Unlock Contact Info (Now using standard FeatureTwoItem) */}
        <section id="unlock-info" className="bg-neutral-50">
          <FeatureTwoItem
            title="Unlock Contact Info"
            stepNumber={2}
            description="Get verified email addresses and direct application links to reach decision-makers without the gatekeepers."
            features={[
              {
                title: "Email Verification",
                description: "All contact information is verified and up-to-date.",
              },
              {
                title: "Direct Links",
                description: "Apply directly without intermediaries.",
              },
              {
                title: "LinkedIn Profiles",
                description: "Connect with decision-makers on LinkedIn.",
              },
            ]}
            externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb26a4f00f58e2218e0cf6.mp4"
          />
        </section>

        {/* Feature Section - Craft Perfect Outreach */}
        <section id="craft-outreach">
          <FeatureTwoItem
            title="Craft Outreach"
            stepNumber={3}
            description="Our message composer creates personalized messages designed to start meaningful conversations."
            features={[
              {
                title: "AI-Powered Templates",
                description: "Start with proven templates that convert.",
              },
              {
                title: "Personalization Engine",
                description: "Automatically personalize messages to each recipient.",
              },
              {
                title: "Performance Tracking",
                description: "See what messages perform best.",
              },
            ]}
            externalVideoSrc="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb33823ea7268250330cdb.mp4"
          />
        </section>

        {/* Prospecting Section - New animated headline */}
        <section id="prospecting">
          <ProspectingSection />
        </section>
        
        {/* The Prospecting Effect Section - Moved below FAQ */}
        <section id="referral-trap">
          <TheProspectingEffect />
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-20 bg-gray-50">
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

        {/* CTA Section with link to pricing - MOVED to bottom of page */}
        <section id="cta" className="bg-white">
          <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to grow your speaking business?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of speakers who use SpeakerDrive to find more opportunities and grow their business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-800 px-6 py-3 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                View pricing
              </a>
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-lg bg-brand-blue text-white px-6 py-3 text-base font-medium shadow-md hover:bg-blue-600 transition-colors"
              >
                Start free trial
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">No credit card required</p>
          </div>
        </section>
      </main>
      
      <Footer5 />
    </div>
  );
}