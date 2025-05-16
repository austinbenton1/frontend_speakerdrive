"use client";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What is SpeakerDrive?",
    answer: "SpeakerDrive is a prospecting database and outreach platform built specifically for speakers and experts to find and land more paid opportunities."
  },
  {
    question: "How do you find events and opportunities?",
    answer: "Our team, AI and automation join forces to research the internet for opportunities, conferences, and events. Our database continues to grow with both current and historical events."
  },
  {
    question: "What about past events? Aren't they outdated?",
    answer: "Past events are valuable prospecting opportunities. Organizations that have invested in experts before are likely to do so again. Our composer automatically adjusts messaging for past events, focusing on future or adjacent opportunities with the same organization."
  },
  {
    question: "What makes SpeakerDrive different?",
    answer: "Unlike traditional outreach that's generic and sales-focused, SpeakerDrive's smart system cross-references over a dozen data points between your unique expertise and the opportunity. This intelligence creates genuinely personalized outreach that resonates — delivering response rates that generic approaches simply can't match."
  },
  {
    question: "How does the message composer work?",
    answer: "Our AI builds your custom profile at signup, pulling from your bio, experience, and past client work. Your profile powers the message composer, which pairs it with opportunity details to create outreach messages. Choose SpeakerDrive's proven approach or add your own voice profile to match your unique communication style."
  },
  {
    question: "Won't your leads become saturated?",
    answer: "We've built in an automatic cooling-off period for contacts after being unlocked twice; they are removed from the main list, preventing them from receiving too many outreach attempts. This protects both the recipients from feeling bombarded and ensures your outreach maintains its effectiveness."
  }
];

export function GeneralFAQ() {
  return (
    <section className="bg-white pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto max-w-5xl px-4">
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

        {/* FAQ Accordion (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <Accordion
            className="space-y-3"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {FAQ_ITEMS.slice(0, Math.ceil(FAQ_ITEMS.length / 2)).map((item, index) => (
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
            ))}
          </Accordion>
          
          {/* Right Column */}
          <Accordion
            className="space-y-3"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {FAQ_ITEMS.slice(Math.ceil(FAQ_ITEMS.length / 2)).map((item, index) => (
              <AccordionItem
                key={index + Math.ceil(FAQ_ITEMS.length / 2)}
                value={`item-${index + Math.ceil(FAQ_ITEMS.length / 2)}`}
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                      {item.question === "Who is behind SpeakerDrive?" ? (
                        <>
                          SpeakerDrive was founded by Austin Benton. To learn more about our team and mission, visit our{" "}
                          <Link
                            href="https://speakerdrive.com/about"
                            className="text-brand-blue hover:text-blue-700 underline"
                          >
                            About page
                          </Link>
                          .
                        </>
                      ) : (
                        item.answer
                      )}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
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
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
