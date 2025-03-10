"use client";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureTwoItemReverseProps {
  title: string;
  description: string;
  features: FeatureItem[];
  imageSrc?: string;
  videoSrc?: string;
  externalVideoSrc?: string;
}

export function FeatureTwoItemReverse({
  title,
  description,
  features,
  imageSrc,
  videoSrc,
  externalVideoSrc,
}: FeatureTwoItemReverseProps) {
  const isLocalVideo = Boolean(videoSrc);
  const isExternalVideo = Boolean(externalVideoSrc);
  const isWebm = videoSrc?.endsWith('.webm');
  
  // Animation variants for underline
  const underlineVariants = {
    rest: { 
      width: "70%", 
      x: 0,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    hover: { 
      width: "100%", 
      x: 0,
      transition: { 
        duration: 0.3,
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  return (
    <div className="bg-neutral-50 px-4 py-12 sm:py-16">
      <div className="container mx-auto max-w-5xl">
        {/* Heading & Description - Full width up top */}
        <div className="mb-6">
          {/* Pill Label - Now inverted with green background and white text */}
          <div className="inline-block rounded-full overflow-hidden shadow-sm bg-green-600 py-1 px-3 mb-3">
            <span className="font-medium text-white text-sm">
              {title}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292929] mb-3 leading-tight">
            Connect With Decision-Makers
          </h2>
          <p className="text-lg sm:text-xl text-[#555] max-w-2xl">
            {description}
          </p>
        </div>

        {/* Main row - now Video on right, Features on left */}
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-8">
          {/* LEFT COL: Feature bullets */}
          <div className="w-full lg:w-2/5">
            {features?.map((feature, index) => (
              <div className="flex items-start gap-3 mb-5" key={index}>
                <div className="mt-1 flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#2D2D87]/10">
                  <Check className="h-4 w-4 text-[#2D2D87]" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[#292929]">
                    {feature.title}
                  </p>
                  <p className="text-sm text-[#555] mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA Link with animated underline */}
            <motion.div
              className="inline-block relative mt-4"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <Link 
                href="/" 
                className="inline-flex items-center text-[#2D2D87] font-bold text-lg"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-[#2D2D87] rounded-full"
                variants={underlineVariants}
              />
            </motion.div>
          </div>

          {/* RIGHT COL: Video or Image */}
          <div className="w-full lg:w-3/5">
            {isExternalVideo ? (
              <div className="rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
                <video
                  className="w-full rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={externalVideoSrc} type="video/mp4" />
                  <p>Your browser doesn't support HTML5 video. Here is a <a href={externalVideoSrc}>link to the video</a> instead.</p>
                </video>
              </div>
            ) : isLocalVideo ? (
              <div className="rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
                <video
                  className="w-full rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={videoSrc} type={isWebm ? "video/webm" : "video/mp4"} />
                  <p>Your browser doesn't support HTML5 video. Here is a <a href={videoSrc}>link to the video</a> instead.</p>
                </video>
              </div>
            ) : (
              <div className="rounded-xl border border-neutral-200 shadow-lg">
                <img
                  src={imageSrc}
                  alt="Feature"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}