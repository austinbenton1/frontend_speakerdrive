"use client";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

interface FeatureItem {
  title: string;
  description: string;
}

interface FeatureTwoItemProps {
  title: string;
  description: string;
  features: FeatureItem[];
  imageSrc?: string;
  videoSrc?: string;
  // If you need a custom label or something else, just add props here.
}

export function FeatureTwoItem({
  title,
  description,
  features,
  imageSrc,
  videoSrc,
}: FeatureTwoItemProps) {
  const isVideo = Boolean(videoSrc);

  return (
    <div className="bg-[#FBF8F3] px-4 py-24 sm:py-40">
      <div className="container mx-auto max-w-5xl">
        {/* Heading & Description - Full width up top */}
        <div className="mb-10">
          {/* Pill Label */}
          <div className="inline-block rounded-full bg-[#2D2D87] px-4 py-1.5 mb-4">
            <span className="text-white font-semibold text-[1.1rem] leading-normal">
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

        {/* Main row: bullets on the left, image/video on the right */}
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-8">
          {/* LEFT COL: Feature bullets + CTA */}
          <div className="w-full lg:w-1/2">
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

            {/* CTA Link */}
            <Link href="/" className="inline-flex items-center text-[#2D2D87] font-medium mt-2">
              <span>Start Free Trial</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform hover:translate-x-1" />
            </Link>
          </div>

          {/* RIGHT COL: Video or Image */}
          <div className="w-full lg:w-1/2">
            {isVideo ? (
              <video
                src={videoSrc}
                className="w-full rounded-xl border border-neutral-200"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={imageSrc}
                alt="Feature"
                className="w-full h-auto rounded-xl border border-neutral-200"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
