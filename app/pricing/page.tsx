"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Check, Circle, Rocket, UserCircle2, Zap, ArrowRight } from 'lucide-react';
import { FAQ } from "@/components/sections/FAQ";
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";

// Pricing toggle component
function PricingToggle({ isAnnual, setIsAnnual }) {
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

// Pricing Card component
function PricingCard({ plan, isPopular = false, isAnnual }) {
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
          {isPopular ? 'Get Advanced' : `Get ${plan.name}`}
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

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
    {
      name: "Business",
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
      name: "Advanced",
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
      name: "Plus",
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
          { label: "Features", href: "#features" },
          { label: "Pricing", href: "/pricing" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      
      <main className="pt-24">
        {/* Pricing Hero */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
              <p className="text-lg text-gray-600 mb-10">
                Choose the plan that's right for your speaking business. All plans include a 14-day free trial.
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
            <h2 className="text-2xl font-bold text-center mb-10">Compare Plans</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 border rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-green-600 uppercase tracking-wider">
                      Advanced
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Plus
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Available leads</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">10/month</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium text-center">100/month</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Search filters</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Basic</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium text-center">Advanced</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">All filters</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Email verification</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <Check className="h-5 w-5 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Outreach templates</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Basic</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium text-center">AI-powered</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Multi-user access</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">-</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500 font-medium text-center">15 accounts</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Unlimited</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* FAQ Section with more compact width */}
        <section id="faq" className="bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <FAQ
              title="Frequently Asked Questions"
              description="Find answers to common questions about SpeakerDrive pricing and features."
              content={[
                {
                  title: "What is SpeakerDrive?",
                  value: "what-is",
                  content: "SpeakerDrive is a platform that helps speakers, coaches, and experts find speaking opportunities, contact decision makers, and craft personalized outreach.",
                },
                {
                  title: "How does it work?",
                  value: "how-works",
                  content: "We aggregate speaking opportunities from around the web, verify contact information, and provide tools to help you manage your outreach and track your applications.",
                },
                {
                  title: "How much does it cost?",
                  value: "pricing",
                  content: "We offer free and paid plans starting at $19/month. The free trial includes basic opportunity discovery, while paid plans include contact information, outreach templates, and advanced tracking features.",
                },
                {
                  title: "How many new opportunities are added each week?",
                  value: "new-opps",
                  content: "We add approximately 50-100 new speaking opportunities each week across various industries and locations.",
                },
                {
                  title: "Can I cancel my subscription anytime?",
                  value: "cancel",
                  content: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
                },
                {
                  title: "Is there a free trial?",
                  value: "free-trial",
                  content: "Yes, all paid plans include a 14-day free trial. No credit card required to get started.",
                },
                {
                  title: "What happens when I hit my monthly lead limit?",
                  value: "lead-limit",
                  content: "When you reach your monthly lead limit, you can upgrade to a higher tier plan to access more leads, or wait until your next billing cycle when your lead count resets.",
                },
              ]}
            />
          </div>
        </section>
        
        {/* New CTA section inspired by the image but with brand colors */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 py-8 relative">
            {/* Decorative elements */}
            <div className="absolute -left-8 top-8 w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-blue/20">
                <path d="M20,20 L80,20 L80,80 L20,80 Z" fill="none" stroke="currentColor" strokeWidth="8" />
              </svg>
            </div>
            <div className="absolute right-20 bottom-0 w-8 h-8">
              <svg viewBox="0 0 100 100" className="w-full h-full text-brand-green/30">
                <path d="M50,10 L90,50 L50,90 L10,50 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute right-4 top-4 w-12 h-12">
              <svg viewBox="0 0 100 100" className="w-full h-full text-amber-300/40">
                <path d="M50,10 L61,39 L92,39 L67,57 L77,86 L50,68 L23,86 L33,57 L8,39 L39,39 Z" fill="currentColor" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="text-center">
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8">
                Ready to grow your speaking business?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                Join thousands of speakers who use SpeakerDrive to find more opportunities and grow their business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/pricing" 
                  className="inline-flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-800 px-6 py-3 text-base font-medium hover:bg-gray-50 transition-colors"
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
          </div>
        </section>
      </main>
      
      <Footer5 />
    </div>
  );
}