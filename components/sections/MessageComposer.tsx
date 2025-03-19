"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Link as LinkIcon,
  AtSign,
  ArrowRight,
  MessageCircle,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TransitionPanel } from "@/components/motion-ui/transition-panel";

/* 
  Colors for each feature:
  0 -> Contact Emails   (#29A9FF)
  1 -> Event Emails     (#00C853)
  2 -> Event URLs       (#05a648)
*/
function getFeatureColor(index: number) {
  if (index === 0) return "#29A9FF";
  if (index === 1) return "#00C853";
  return "#05a648";
}

const CONTACT_FEATURES = [
  {
    title: "Contact Emails",
    description:
      "Connect directly with decision-makers via their professional email.",
    video:
      "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf43363da759182090e12d.mp4",
    icon: <Mail className="mr-2.5 h-5 w-5" />,
    // Heading removed => heading: "",
    bullets: [
      {
        text: "Position your message for: speaking, consulting, coaching, facilitation, or custom offering",
      },
      {
        text: "Send from yourself or “send as” your assistant / business manager",
      },
      {
        text: "Create personalized LinkedIn connections with one click",
      },
      {
        text: "Composer Quick Look -> Contact Email:",
        noCheck: true,
        bold: true,
      },
    ],
  },
  {
    title: "Event Emails",
    description: "Reach event organizers through professional social platforms.",
    video:
      "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf408504d6597dbd3827ef.mp4",
    icon: <AtSign className="mr-2.5 h-5 w-5" />,
    bullets: [
      {
        text: "Position your message for: speaking, consulting, coaching, facilitation, or custom offering",
      },
      {
        text: "Send from yourself or “send as” your assistant / business manager",
      },
      {
        text: "Event already past? No problem! We’ll pivot to adjacent / alternative positioning.",
      },
      {
        text: "Composer Quick Look -> Event Email:",
        noCheck: true,
        bold: true,
      },
    ],
  },
  {
    title: "Event URLs",
    description: "Submit your information through call-for-speakers portals.",
    video:
      "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf4b3d7be80c24c3f0aa65.mp4",
    icon: <LinkIcon className="mr-2.5 h-5 w-5" />,
    bullets: [
      {
        text: "Get complete speaker submissions with titles, abstracts, and outlines",
      },
      {
        text: "Choose Smart Match or customize for specific topics",
      },
      {
        text: "Stand out with professionally crafted applications in seconds",
      },
      {
        text: "Composer Quick Look -> Event URL:",
        noCheck: true,
        bold: true,
      },
    ],
  },
];

export function MessageComposer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeFeature = CONTACT_FEATURES[activeIndex];
  const activeColor = getFeatureColor(activeIndex);

  return (
    <div className="overflow-auto py-0 pb-24 sm:overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* White box for “Conversations That Convert” */}
        <div className="mx-auto w-full lg:max-w-[900px] bg-white px-4 sm:px-6 py-8">
          {/* Heading row */}
          <div className="flex items-center text-left md:justify-center md:text-center mb-4">
            <div className="w-7 h-7 mr-3 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-brand-blue" />
            </div>
            {/* Increased desktop font */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              Conversations That Convert
            </h3>
          </div>

          {/* Sub-paragraph */}
          <p className="text-left md:text-center text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg md:mx-auto mb-6">
            Ditch the hard sales pitch.
          </p>

          {/* “See It In Action” box */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex flex-col sm:flex-row justify-start items-start gap-4">
            {/* Label + Icon */}
            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-gray-500 mt-0.5"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div>
                <h3 className="text-[17px] sm:text-lg font-semibold text-gray-800">
                  See It In Action
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="text-[14px] text-gray-600">
                    View by message types
                  </p>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Channel Selection Buttons */}
            <div className="flex flex-row flex-wrap gap-3 justify-start items-center">
              {CONTACT_FEATURES.map((feature, index) => {
                const isActive = index === activeIndex;
                const color = getFeatureColor(index);
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={cn(
                      "relative rounded-md px-4 py-2 text-base font-medium transition-all duration-200 cursor-pointer flex items-center gap-2",
                      isActive
                        ? "text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    )}
                    style={
                      isActive
                        ? {
                            backgroundColor: color,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                          }
                        : {}
                    }
                  >
                    {feature.icon}
                    <span>{feature.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic bullets (heading removed) */}
          <div className="mt-8">
            {/* Title tag (colored label) */}
            <div className="mb-2">
              <span
                className="text-xs font-semibold px-2 py-1 rounded-md uppercase"
                style={{ backgroundColor: activeColor, color: "#fff" }}
              >
                {activeFeature.title}
              </span>
            </div>

            {/* Bullet list */}
            <ul className="space-y-3 ml-2 mb-2">
              {activeFeature.bullets.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  {!point.noCheck && (
                    <Check
                      className="mt-1 flex-shrink-0"
                      style={{ color: activeColor }}
                    />
                  )}
                  <span
                    className={cn(
                      "text-base leading-relaxed font-semibold text-gray-700",
                      point.bold && "font-bold"
                    )}
                  >
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Video Display Panel */}
          <div className="mt-4 mb-8">
            <TransitionPanel
              className="aspect-video w-full overflow-hidden rounded-xl"
              activeIndex={activeIndex}
              custom={direction}
              transition={{
                ease: "easeOut",
                duration: 0.3,
              }}
              variants={{
                enter: (dir: number) => ({
                  x: dir > 0 ? 32 : -32,
                  opacity: 0.8,
                }),
                center: {
                  x: 0,
                  opacity: 1,
                },
                exit: (dir: number) => ({
                  x: dir < 0 ? 32 : -32,
                  opacity: 0.8,
                }),
              }}
            >
              {CONTACT_FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="relative w-full overflow-hidden rounded-xl"
                >
                  {feature.video ? (
                    <>
                      <div className="w-full h-full overflow-hidden relative border-2 border-gray-200 rounded-xl">
                        <video
                          className="w-full h-full object-cover rounded-xl shadow-md"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src={feature.video} type="video/mp4" />
                          <p>Your browser doesn’t support HTML5 video.</p>
                        </video>
                      </div>

                      {/* Bottom color strip */}
                      <div className="bg-white border-t border-gray-100 p-4 w-full rounded-b-xl text-sm sm:text-base text-gray-700 text-left">
                        <span
                          className="block w-full h-2 rounded-md"
                          style={{
                            backgroundColor: getFeatureColor(
                              CONTACT_FEATURES.indexOf(feature)
                            ),
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    // Fallback if there's no video
                    <>
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-blue-100 z-0" />
                      <div className="relative z-10 p-8 max-w-xl">
                        <h3 className="text-2xl font-bold mb-4 text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-lg text-gray-700">
                          {feature.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </TransitionPanel>
          </div>
        </div>
      </div>
    </div>
  );
}
