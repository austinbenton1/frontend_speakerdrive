"use client";
import { motion } from "framer-motion";

const TOOLS = [
  {
    group: "INTELLIGENCE TOOLS",
    tools: [
      {
        name: "Ask SpeakerDrive",
        description: "Ask for strategies to win more business, prepare for your next speech, or refine your outreach approach.",
        icon: "/Ask SpeakerDrive.png",
        color: "bg-blue-100"
      },
      {
        name: "Instant Intel",
        description: "Get answers to insightful questions you might never have thought to ask.",
        icon: "/Instant Intel.png",
        color: "bg-blue-100"
      }
    ]
  },
  {
    group: "FINDER TOOLS",
    tools: [
      {
        name: "Company Finder",
        description: "Discover essential company information - perfect for your next discovery call.",
        icon: "/Company Finder.png",
        color: "bg-emerald-100"
      },
      {
        name: "Email Finder",
        description: "Find (almost) anyone's verified work email address instantly.",
        icon: "/Email Finder.png",
        color: "bg-emerald-100"
      },
      {
        name: "Mobile Finder",
        description: "Find (almost) anyone's verified mobile number directly.",
        icon: "/Mobile Finder.png",
        color: "bg-emerald-100"
      }
    ]
  }
];

export function ToolsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tools You'll <span className="text-amber-500">Actually Use</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            SpeakerDrive goes beyond event discovery with tools that support your entire outreach process.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="space-y-16">
          {TOOLS.map((section, sectionIndex) => (
            <div key={section.group}>
              {/* Group Label */}
              <div className="mb-8 text-center">
                <span className="inline-block py-1.5 px-6 text-xs font-bold tracking-wider rounded-full bg-gray-200 text-gray-800">
                  {section.group}
                </span>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.tools.map((tool, index) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4,
                      delay: index * 0.1
                    }}
                    viewport={{ once: true }}
                    className={`group relative ${tool.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1`}
                  >
                    {/* Content */}
                    <div className="flex flex-col h-full">
                      {/* Icon and Name */}
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 mr-4 flex-shrink-0 bg-white rounded-lg p-1.5 shadow-sm">
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">
                          {tool.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Interactive Indicator */}
                      <div className="mt-4 text-sm font-medium flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        Try it
                        <svg 
                          className="ml-1.5 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}