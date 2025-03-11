"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { VideoCaption } from "@/components/ui/VideoCaption";

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
  externalVideoSrc?: string;
  stepNumber?: number;
  captionText?: string;
}

export function FeatureTwoItem({
  title,
  description,
  features,
  imageSrc,
  videoSrc,
  externalVideoSrc,
  stepNumber,
  captionText,
}: FeatureTwoItemProps) {
  const isLocalVideo = Boolean(videoSrc);
  const isExternalVideo = Boolean(externalVideoSrc);
  const isWebm = videoSrc?.endsWith('.webm');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(videoContainerRef, { 
    once: false, 
    amount: 0.3 // Trigger when 30% of the video is visible
  });
  
  // Control video playback based on visibility
  useEffect(() => {
    if (!videoRef.current) return;
    
    if (isInView) {
      videoRef.current.play().catch(error => {
        console.log("Video play failed:", error);
      });
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);
  
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
  
  // Check if this is Step 1, Step 2, or Step 3 and use custom content
  const isStep1 = title === "Find Qualified Leads" || (stepNumber === 1);
  const isStep2 = title === "Unlock Contact Info" || (stepNumber === 2);
  const isStep3 = title === "Craft Outreach" || (stepNumber === 3);
  
  return (
    <div className="bg-stone-50 px-4 py-12 sm:py-16">
      <div className="container mx-auto max-w-5xl">
        {/* Heading & Description - Full width up top */}
        <div className="mb-6">
          {/* Pill Label - Now inverted with green background and white text */}
          <div className="inline-block rounded-full overflow-hidden shadow-sm bg-green-600 py-1 px-3 mb-3">
            <span className="font-medium text-white text-sm">
              {stepNumber ? `Step ${stepNumber}. ${title}` : title}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#292929] mb-3 leading-tight">
            {isStep1 ? "Find Your Ideal Opportunities" :
             isStep2 ? "Get Direct Access" : 
             isStep3 ? "Start Meaningful Conversations" : 
             "Connect With Decision-Makers"}
          </h2>
          <p className="text-lg sm:text-xl text-[#555] max-w-2xl">
            {isStep1 
              ? "All the right gigs in one place, searchable and filterable to match your expertise."
              : isStep2 
              ? "Get your foot in the door and bypass gatekeepers." 
              : isStep3
              ? "Create effortless outreach in one click."
              : description}
          </p>
        </div>

        {/* Main row: bullets on the left, image/video on the right */}
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-8">
          {/* LEFT COL: Feature bullets + CTA */}
          <div className="w-full lg:w-2/5">
            {isStep2 ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-[#292929]">Contact Emails</h4>
                  <p className="text-sm text-[#555] mt-1">
                    For roles like Director Of Events, Chief People Officer, HR Directors, and Conference Organizers.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-[#292929]">Event Emails</h4>
                  <p className="text-sm text-[#555] mt-1">
                    Validated addresses for event@, conference@, and speakers@ type emails that reach planning teams.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-[#292929]">Event URLs</h4>
                  <p className="text-sm text-[#555] mt-1">
                    Direct links to application forms like Calls For Speakers, Session Submissions, and Speaker Registration Portals.
                  </p>
                </div>
              </div>
            ) : isStep3 ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold text-[#292929]">Perfect Personalization</h4>
                  <p className="text-sm text-[#555] mt-1">
                    SpeakerDrive adapts each message to match the specific event, organization, contact and more.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-[#292929]">Multi-Channel Options</h4>
                  <p className="text-sm text-[#555] mt-1">
                    Choose between email, LinkedIn, or application submissions based on your unlock type.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-base font-semibold text-[#292929]">Tailored to Your Services</h4>
                  <p className="text-sm text-[#555] mt-1">
                    Easily customize your focus —from keynotes to workshops, coaching to consulting—with each outreach.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {features?.map((feature, index) => (
                  <div key={index}>
                    <h4 className="text-base font-semibold text-[#292929]">{feature.title}</h4>
                    <p className="text-sm text-[#555] mt-1">{feature.description}</p>
                  </div>
                ))}
              </div>
            )}

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

          {/* RIGHT COL: Video or Image - Now larger (3/5 instead of 1/2) */}
          <div className="w-full lg:w-3/5" ref={videoContainerRef}>
            {isExternalVideo && externalVideoSrc ? (
              captionText ? (
                <VideoCaption
                  src={externalVideoSrc}
                  title={title}
                  caption={captionText || ""}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full rounded-xl"
                    playsInline
                    muted
                    loop
                    autoPlay
                  >
                    <source src={externalVideoSrc} type="video/mp4" />
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={externalVideoSrc}>link to the video</a> instead.</p>
                  </video>
                </div>
              )
            ) : isLocalVideo && videoSrc ? (
              captionText ? (
                <VideoCaption
                  src={videoSrc}
                  title={title}
                  caption={captionText || ""}
                  className="w-full rounded-xl"
                />
              ) : (
                <div className="rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full rounded-xl"
                    playsInline
                    muted
                    loop
                    autoPlay
                  >
                    <source src={videoSrc} type={isWebm ? "video/webm" : "video/mp4"} />
                    <p>Your browser doesn't support HTML5 video. Here is a <a href={videoSrc}>link to the video</a> instead.</p>
                  </video>
                </div>
              )
            ) : (
              <div className="rounded-xl border border-neutral-200 shadow-lg">
                <img
                  src={imageSrc || ""}
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