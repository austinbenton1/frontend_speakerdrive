'use client';

import { useState } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  MessageSquareIcon,
  LineChartIcon,
  BuildingIcon,
  MailIcon,
  PhoneIcon
} from 'lucide-react';

// Tool data (update image paths as needed)
const TOOLS = [
  {
    title: 'Ask SpeakerDrive',
    description: 'Ask for strategies to win more business, prepare for your next speech, or refine your outreach approach.',
    icon: <MessageSquareIcon className="w-5 h-5 text-blue-600" />,
    image: '/Ask SpeakerDrive.png',
    color: 'bg-blue-500'
  },
  {
    title: 'Instant Intel',
    description: 'Get answers to insightful questions you might never have thought to ask.',
    icon: <LineChartIcon className="w-5 h-5 text-indigo-600" />,
    image: '/Instant Intel.png',
    color: 'bg-indigo-500'
  },
  {
    title: 'Company Finder',
    description: 'Discover essential company information - perfect for your next discovery call.',
    icon: <BuildingIcon className="w-5 h-5 text-emerald-600" />,
    image: '/Company Finder.png',
    color: 'bg-emerald-500'
  },
  {
    title: 'Email Finder',
    description: 'Find (almost) anyone\'s verified work email address instantly.',
    icon: <MailIcon className="w-5 h-5 text-blue-600" />,
    image: '/Email Finder.png',
    color: 'bg-blue-500'
  },
  {
    title: 'Mobile Finder',
    description: 'Find (almost) anyone\'s verified mobile number directly.',
    icon: <PhoneIcon className="w-5 h-5 text-emerald-600" />,
    image: '/Mobile Finder.png',
    color: 'bg-emerald-500'
  },
];

export function ToolsSection() {
  // index represents which "group" of cards we're currently viewing.
  // We display 4 items at once on large screens, so max index is TOOLS.length - 4.
  const [index, setIndex] = useState(0);

  // Number of items per view changes with breakpoints (tailwind classes).
  // For simplicity, we base transform on 4 items per view at the largest breakpoint.
  const itemsToShow = 4;
  const maxIndex = Math.max(0, TOOLS.length - itemsToShow); // so we don't go negative

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header + Nav */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">
            Tools You'll <span className="text-blue-600">Actually Use</span>
          </h2>
          <div className="flex space-x-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-colors"
              aria-label="Previous"
              disabled={index === 0}
              onClick={() => setIndex(Math.max(0, index - 1))}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-30 transition-colors"
              aria-label="Next"
              disabled={index === maxIndex}
              onClick={() => setIndex(Math.min(maxIndex, index + 1))}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Subtitle/Description */}
        <p className="text-gray-600 max-w-2xl mb-10">
          SpeakerDrive goes beyond event discovery with tools that support your entire outreach process.
        </p>

        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          {/* Inner flex that we translate based on 'index' */}
          <div
            className="flex transition-transform duration-300 ease-out"
            // For large screens, each "step" is 100% / itemsToShow = 25%.
            // Multiply by index to shift left by that many "steps."
            style={{ transform: `translateX(-${index * 25}%)` }}
          >
            {/* Each Card */}
            {TOOLS.map((tool, idx) => (
              <div
                key={idx}
                // Responsive widths: on mobile, 100%; sm: 50%; md: 33.333%; lg: 25%; 
                // so the grid naturally reflows on smaller breakpoints.
                className="
                  w-full 
                  sm:w-1/2 
                  md:w-1/3 
                  lg:w-1/4 
                  flex-shrink-0 
                  px-2
                  mb-4
                "
              >
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Top colored bar */}
                  <div className={`h-1 ${tool.color}`} />

                  <div className="p-4 flex flex-col h-full">
                    {/* Icon + Title */}
                    <div className="flex items-center mb-3">
                      <div className="mr-2">{tool.icon}</div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {tool.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4">
                      {tool.description}
                    </p>

                    {/* Image (larger, better ratio) */}
                    <div className="relative w-full h-40 bg-gray-50 rounded-lg overflow-hidden mb-6">
                      <img
                        src={tool.image}
                        alt={`${tool.title} interface`}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    {/* Bottom link */}
                    <div className="mt-auto">
                      <a
                        href="#"
                        className="inline-flex items-center text-blue-600 text-sm font-medium group"
                      >
                        Try it
                        <svg
                          className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
