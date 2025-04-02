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
  RocketIcon,
} from "lucide-react";

// Layout constants
const CARD_WIDTH = 250;
const CARD_SPACING = 16;
const TOTAL_CARD_SPACE = CARD_WIDTH + CARD_SPACING;
const VISIBLE_CARDS = 3;

// Referencing images in the public folder with a leading slash (Next.js convention):
const CARDS = [
  {
    topSubtext: "Growth Strategy",
    title: "Business Assistant",
    description:
      "Get strategic advice to win more engagements and prepare for upcoming opportunities.",
    brandColor: "#29A9FF",
    icon: <BriefcaseIcon className="w-5 h-5" />,
    image: "/bot_one.png",
  },
  {
    topSubtext: "Smart Memory",
    title: "Adaptive Intelligence",
    description:
      "The SpeakerDrive assistant remembers all your past interactions, becoming more helpful over time.",
    brandColor: "#00C853",
    icon: <BrainIcon className="w-5 h-5" />,
    image: "/bot_two.png",
  },
  {
    topSubtext: "Event Analysis",
    title: "Opportunity Evaluator",
    description:
      "Receive feedback on whether specific events align with your expertise and value.",
    brandColor: "#29A9FF",
    icon: <SearchIcon className="w-5 h-5" />,
    image: "/bot_three.png",
  },
  {
    topSubtext: "Fee Strategy",
    title: "Fee Consultant",
    description:
      "Get practical guidance about realistic fee ranges across different event types.",
    brandColor: "#00C853",
    icon: <DollarSignIcon className="w-5 h-5" />,
    image: "/bot_four.png",
  },
  {
    topSubtext: "Client Prep",
    title: "Discovery Call Coach",
    description:
      "Prepare for client conversations with tailored talking points and objection-handling strategies.",
    brandColor: "#29A9FF",
    icon: <PhoneCallIcon className="w-5 h-5" />,
    image: "/bot_five.png",
  },
  {
    topSubtext: "Platform Tips",
    title: "Platform Maximizer",
    description:
      "Ask your assistant how to maximize SpeakerDrive features. You can even request specialized leads for your expertise.",
    brandColor: "#00C853",
    icon: <LayersIcon className="w-5 h-5" />,
    image: "/bot_six.png",
  },
  {
    topSubtext: "Market Insights",
    title: "Industry Insider",
    description:
      "Learn about booking timelines, decision-maker priorities, and trends in your industry.",
    brandColor: "#29A9FF",
    icon: <GlobeIcon className="w-5 h-5" />,
    image: "/bot_seven.png",
  },
  {
    topSubtext: "Positioning",
    title: "Positioning Advisor",
    description:
      "Get advice on standing out in competitive situations with your unique value proposition.",
    brandColor: "#00C853",
    icon: <MapPinIcon className="w-5 h-5" />,
    image: "/bot_eight.png",
  },
  {
    topSubtext: "And Beyond",
    title: "Endless Possibilities",
    description:
      "Discover new ways to use your assistant as your business evolves. Just ask and explore.",
    brandColor: "#29A9FF",
    icon: <InfinityIcon className="w-5 h-5" />,
    image: "/bot_nine.png",
  },
];

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

  // Navigation handlers
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
      {/* Single headline & subheadline */}
      <div className="container mx-auto px-4 max-w-6xl text-center mb-8">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">
          Meet The SpeakerDrive Assistant
        </h2>
        <p className="text-left md:text-center text-lg sm:text-xl font-medium text-gray-700 leading-relaxed max-w-2xl md:mx-auto md:mb-6">
          {/* Increased max width for bigger margin on desktop */}
          Beyond lead generation - just “Ask SpeakerDrive” for a complete
          business resource, purpose-built for your professional success.
        </p>
      </div>

      {/* Supporting image */}
      <div className="flex justify-center mb-8">
        <img
          src="/bot_main.png"
          alt="SpeakerDrive Support"
          className="w-full max-w-md h-auto"
        />
      </div>

      {/* Minimal top: left & right arrows centered */}
      <div className="flex items-center justify-center gap-8"> 
        {/* Increased gap for more spacing */}
        {/* Left Arrow (more prominent styling) */}
        <button
          type="button"
          aria-label="Previous"
          disabled={index === 0}
          onClick={handlePrev}
          className="
            text-gray-700
            hover:text-gray-900
            transition-colors
            disabled:opacity-30
            disabled:cursor-not-allowed
            text-3xl
          "
        >
          <ChevronLeft className="w-10 h-10" />
        </button>

        {/* Right Arrow (more prominent styling) */}
        <button
          type="button"
          aria-label="Next"
          disabled={index === MAX_INDEX}
          onClick={handleNext}
          className={`
            text-gray-700
            hover:text-gray-900
            transition-colors
            disabled:opacity-30
            disabled:cursor-not-allowed
            text-3xl
            ${
              !arrowClicked && index < MAX_INDEX
                ? "animate-bounce-horizontal"
                : ""
            }
          `}
        >
          <ChevronRight className="w-10 h-10" />
        </button>
      </div>

      {/* Carousel container */}
      <div className="relative mx-auto max-w-[900px] overflow-hidden mt-10 md:pl-[10%]">
        {/* Right fade-out */}
        <div
          className="
          pointer-events-none
          absolute
          top-0
          right-0
          h-full
          w-16
          bg-gradient-to-l
          from-white
          to-transparent
        "
        />

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

                  {/* Button */}
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

      {/* Modal overlay; also closes on outside click */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XCircleIcon className="w-6 h-6" />
            </button>

            <div className="p-4">
              {/* Only header text above the image */}
              <h4 className="text-lg font-semibold text-gray-900">
                {selectedCard.title}
              </h4>
            </div>

            {/* Main image */}
            <img
              src={selectedCard.image}
              alt={`Example for ${selectedCard.title}`}
              className="w-full h-auto"
            />

            {/* CTA button replacing the subtext */}
            <div className="p-4 flex justify-center">
              <a
                href="https://www.speakerdrive.com/coming-soon"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  bg-gradient-to-r from-blue-600 to-blue-400
                  text-white
                  font-semibold
                  leading-tight
                  text-sm
                  py-2
                  px-4
                  rounded-md
                  hover:opacity-90
                "
              >
                Ready To Join? Get Early Access
                <RocketIcon className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
