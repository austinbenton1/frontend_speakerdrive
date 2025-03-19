"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const TOOLS = [
  {
    group: "INTELLIGENCE TOOLS",
    tools: [
      {
        name: "Ask SpeakerDrive",
        description: "Ask for strategies to win more business, prepare for your next speech, or refine your outreach approach.",
        icon: "/Ask SpeakerDrive.png",
        color: "bg-blue-50"
      },
      {
        name: "Instant Intel",
        description: "Get answers to insightful questions you might never have thought to ask.",
        icon: "/Instant Intel.png",
        color: "bg-blue-50"
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
        color: "bg-green-50"
      },
      {
        name: "Email Finder",
        description: "Find (almost) anyone's verified work email address instantly.",
        icon: "/Email Finder.png",
        color: "bg-green-50"
      },
      {
        name: "Mobile Finder",
        description: "Find (almost) anyone's verified mobile number directly.",
        icon: "/Mobile Finder.png",
        color: "bg-green-50"
      }
    ]
  }
];

export function ToolsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-4">
            Tools You'll Actually Use
          </h2>
          <p className="text-md sm:text-lg text-gray-600 max-w-3xl mx-auto">
            SpeakerDrive goes beyond event discovery with tools that support your entire outreach process.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="space-y-12">
          {TOOLS.map((section, sectionIndex) => (
            <div key={section.group}>
              {/* Group Label */}
              <div className="mb-6 text-center">
                <span className="inline-block py-1 px-4 text-xs font-semibold rounded-full bg-gray-200 text-gray-700">
                  {section.group}
                </span>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                    className={`group relative ${tool.color} rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100`}
                  >
                    {/* Content */}
                    <div className="flex flex-col h-full">
                      {/* Icon and Name */}
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 mr-3 flex-shrink-0">
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900">
                          {tool.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm">
                        {tool.description}
                      </p>

                      {/* Interactive Indicator */}
                      <div className="mt-3 text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Try it
                        <span className="ml-1 inline-block transform group-hover:translate-x-1 transition-transform duration-200">→</span>
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