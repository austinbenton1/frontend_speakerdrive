"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  EyeIcon,
  XCircleIcon,
  BriefcaseIcon,
  BrainIcon,
  SearchIcon,
  DollarSignIcon,
  PhoneCallIcon,
  LayersIcon,
  GlobeIcon,
  MapPinIcon,
  InfinityIcon,
} from "lucide-react";

/**
 * Each card includes:
 * - topSubtext (small label above the title)
 * - title
 * - description
 * - brandColor (#29A9FF or #00C853)
 * - icon
 * - image (mapped to /home/project/public/bot_one|_two|_three)
 */
const CARDS = [
  {
    topSubtext: "Growth Strategy",
    title: "Business Growth Assistant",
    description:
      "Get strategic advice to win more engagements and prepare for upcoming opportunities.",
    brandColor: "#29A9FF", // bar color
    icon: <BriefcaseIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_one",
  },
  {
    topSubtext: "Smart Memory",
    title: "Adaptive Intelligence",
    description:
      "The SpeakerDrive assistant remembers all your past interactions, becoming more helpful over time.",
    brandColor: "#00C853",
    icon: <BrainIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_one",
  },
  {
    topSubtext: "Event Analysis",
    title: "Opportunity Evaluator",
    description:
      "Receive feedback on whether specific events align with your expertise and value.",
    brandColor: "#29A9FF",
    icon: <SearchIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_one",
  },
  {
    topSubtext: "Fee Strategy",
    title: "Fee Consultant",
    description:
      "Get practical guidance about realistic fee ranges across different event types.",
    brandColor: "#00C853",
    icon: <DollarSignIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_two",
  },
  {
    topSubtext: "Client Prep",
    title: "Discovery Call Coach",
    description:
      "Prepare for client conversations with tailored talking points and objection-handling strategies.",
    brandColor: "#29A9FF",
    icon: <PhoneCallIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_two",
  },
  {
    topSubtext: "Platform Tips",
    title: "Platform Maximizer",
    description:
      "Ask your assistant how to maximize SpeakerDrive features. You can even request specialized leads for your expertise.",
    brandColor: "#00C853",
    icon: <LayersIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_two",
  },
  {
    topSubtext: "Market Insights",
    title: "Industry Insider",
    description:
      "Learn about booking timelines, decision-maker priorities, and trends in your industry.",
    brandColor: "#29A9FF",
    icon: <GlobeIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_three",
  },
  {
    topSubtext: "Positioning",
    title: "Market Positioning Advisor",
    description:
      "Get advice on standing out in competitive situations with your unique value proposition.",
    brandColor: "#00C853",
    icon: <MapPinIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_three",
  },
  {
    topSubtext: "And Beyond",
    title: "Endless Possibilities",
    description:
      "Discover new ways to use your assistant as your business evolves. Just ask and explore.",
    brandColor: "#29A9FF",
    icon: <InfinityIcon className="w-5 h-5" />,
    image: "/home/project/public/bot_three",
  },
];

// Layout
const CARD_WIDTH = 250;
const CARD_SPACING = 16;
const TOTAL_CARD_SPACE = CARD_WIDTH + CARD_SPACING;
const VISIBLE_CARDS = 3;
const MAX_INDEX = Math.max(0, CARDS.length - VISIBLE_CARDS);

export function ToolsSection() {
  // Carousel position
  const [index, setIndex] = useState(0);

  // Stop arrow bounce once clicked
  const [arrowClicked, setArrowClicked] = useState(false);

  // Modal
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const openModal = (card: any) => setSelectedCard(card);
  const closeModal = () => setSelectedCard(null);

  // Nav handlers
  const handlePrev = () => {
    setIndex(Math.max(0, index - 1));
    setArrowClicked(true);
  };
  const handleNext = () => {
    setIndex(Math.min(MAX_INDEX, index + 1));
    setArrowClicked(true);
  };

  return (
    <section className="pt-0 pb-10">
      {/* Minimal top: left & right arrows centered */}
      <div className="flex items-center justify-center gap-6">
        {/* Left Arrow */}
        <button
          type="button"
          aria-label="Previous"
          disabled={index === 0}
          onClick={handlePrev}
          className="
            text-gray-500 hover:text-black transition-colors
            disabled:opacity-30 disabled:cursor-not-allowed
          "
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Arrow (no "More ->" text, simpler look) */}
        <button
          type="button"
          aria-label="Next"
          disabled={index === MAX_INDEX}
          onClick={handleNext}
          className={`
            text-gray-500 hover:text-black transition-colors
            disabled:opacity-30 disabled:cursor-not-allowed
            ${(!arrowClicked && index < MAX_INDEX) ? "animate-bounce-horizontal" : ""}
          `}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Carousel container: smaller offset on the left (10%) */}
      <div className="relative mx-auto max-w-[900px] overflow-hidden mt-10 md:pl-[10%]">
        {/* Right fade-out */}
        <div className="
          pointer-events-none
          absolute
          top-0
          right-0
          h-full
          w-16
          bg-gradient-to-l
          from-white
          to-transparent
        " />

        {/* Cards flex */}
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${index * TOTAL_CARD_SPACE}px)` }}
        >
          {CARDS.map((card, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mr-4"
              style={{ width: `${CARD_WIDTH}px` }}
            >
              <div
                className="
                  border border-gray-200 rounded-lg shadow-sm
                  hover:shadow-md transition-shadow
                  h-full flex flex-col overflow-hidden
                  bg-white
                "
              >
                {/* Top bar in brand color */}
                <div
                  className="h-1"
                  style={{ backgroundColor: card.brandColor }}
                />

                <div className="p-4 flex flex-col flex-grow">
                  {/* Top subtext */}
                  <div className="text-xs text-gray-500 mb-1">
                    {card.topSubtext}
                  </div>

                  {/* Icon + Title */}
                  <div className="flex items-center mb-2">
                    <div className="mr-2" style={{ color: card.brandColor }}>
                      {card.icon}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4">
                    {card.description}
                  </p>

                  {/* Button: gradient to match your screenshot's style */}
                  <button
                    onClick={() => openModal(card)}
                    className="
                      mt-auto
                      inline-flex
                      items-center
                      justify-center
                      text-white
                      font-medium
                      px-4
                      py-2
                      rounded-md
                      transition
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      bg-gradient-to-r from-[#3b82f6] to-[#2563eb]
                      hover:opacity-90
                    "
                  >
                    View Example
                    <EyeIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>

            <img
              src={selectedCard.image}
              alt={`Example for ${selectedCard.title}`}
              className="w-full h-auto rounded-t-lg"
            />

            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {selectedCard.title}
              </h4>
              <p className="text-gray-600 text-sm mt-1">
                {selectedCard.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
