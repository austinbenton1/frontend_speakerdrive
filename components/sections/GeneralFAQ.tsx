"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "What is SpeakerDrive?",
    answer: "SpeakerDrive is a prospecting platform built specifically for speakers, trainers, coaches, and consultants to find and connect with relevant decision-makers and events."
  },
  {
    question: "How do you find events and opportunities?",
    answer: "Our team and automation researches the internet continuously for speaking opportunities, conferences, and events as they're announced. This ensures you have access to the freshest opportunities."
  },
  {
    question: "How do you ensure contact information is up-to-date?",
    answer: "We use automated verification, manual spot-checks, and regular database cleaning to maintain accuracy. Invalid emails are promptly removed."
  },
  {
    question: "What types of events and opportunities are available?",
    answer: "We cover conferences, corporate training, association meetings, workshops, and educational seminars across technology, business, healthcare, education, and more."
  },
  {
    question: "What about past events? Aren't they outdated?",
    answer: "Past events are valuable prospecting opportunities. Organizations that have invested in speakers before are likely to do so again. Our composer automatically adjusts messaging for past events, focusing on future opportunities with the same organization."
  },
  {
    question: "How customizable is the message composer?",
    answer: "Our smart system builds your profile when you sign up, then cross-references event details, contact information, and your expertise to create highly personalized outreach. This matching technology is our secret weapon for high response rates."
  },
  {
    question: "Is there an integration with my CRM or email platform?",
    answer: "Export to any CRM via CSV. Direct Gmail integration available, with Instant.ly connection coming soon."
  },
  {
    question: "How much time should I spend on prospecting each day?",
    answer: "We recommend 20-30 minutes daily. Consistency is the key factor in seeing results, regardless of the exact time spent."
  },
  {
    question: "Isn't this too sales-y for my industry?",
    answer: "Our message composer is designed to start conversations, not close deals. More conversations equal more opportunities. In fact, going right for the \"hard sell\" isn't a good strategy for professional services. We focus on building relationships."
  }
];

// Add Austin Benton question at the end
FAQ_ITEMS.push({
  question: "Who is behind SpeakerDrive?",
  answer: "SpeakerDrive was founded by Austin Benton. To learn more about our team and mission, click here."
});

export function GeneralFAQ() {
  return (
    <section className="bg-white pt-12 pb-24 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-blue-100/30 to-blue-50/20 blur-3xl -z-10 opacity-70"></div>
          <div className="relative">
            <h2 className="text-3xl sm:text-[2.75rem] font-extrabold text-gray-900 mb-4 tracking-tight">
              Common questions about SpeakerDrive
            </h2>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <Accordion
            className="space-y-4"
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
                  <div className="flex items-center gap-4 px-6 py-5 w-full hover:bg-gray-50/80 transition-colors">
                    <div className="flex-1">
                      <span className="text-[1.1rem] font-semibold text-gray-800 group-hover:text-gray-900 transition-colors pr-8">
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
                  <p className="relative text-gray-600 leading-relaxed text-[0.95rem]">{item.answer}</p>
                </div>
              </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          {/* Right Column */}
          <Accordion
            className="space-y-4"
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
                    <div className="flex items-center gap-4 px-6 py-5 w-full hover:bg-gray-50/80 transition-colors">
                      <div className="flex-1">
                        <span className="text-[1.1rem] font-semibold text-gray-800 group-hover:text-gray-900 transition-colors pr-8">
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
                    <p className="relative text-gray-600 leading-relaxed text-[0.95rem]">{item.answer}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-700 mb-8">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:support@speakerdrive.com"
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