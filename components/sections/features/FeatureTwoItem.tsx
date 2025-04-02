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
  const isStep1 = stepNumber === 1;
  const isStep2 = stepNumber === 2;
  const isStep3 = stepNumber === 3;
  
  return (
    <div className="bg-stone-50 px-4 py-8 sm:py-10 -mt-8">
      <div className="container mx-auto max-w-5xl">
        {/* Heading & Description - Full width up top */}
        <div className="mb-4">
          {/* Enhanced Step Pill */}
          <div className="inline-flex items-center rounded-lg overflow-hidden shadow-md bg-gradient-to-r from-green-600 to-green-500 py-2 px-4 mb-8 transform hover:scale-102 transition-all duration-300 -mt-16 hover:shadow-lg">            
            <span className="font-medium text-white/90 text-base">
              Step
            </span>
            <div className="mx-2 w-5 h-5 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <span className="text-white text-sm font-bold">{stepNumber}</span>
            </div>
            <span className="font-medium text-white text-sm tracking-wide">
              {isStep1 ? "Get Qualified Leads" : isStep2 ? "Get Contact Details" : title}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 leading-tight">
            {isStep1 ? (
              <div className="relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-50 via-blue-100/50 to-transparent blur-xl"></div>
                <span className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Find Your Ideal Opportunities
                </span>
              </div>
            ) :
             isStep2 ? "Unlock Contact Info" : 
             isStep3 ? "Send Winning Outreach" : 
             "Connect With Decision-Makers"}
          </h2>

          {/* Subheader logic */}
          {isStep3 && (
            <p className="text-lg text-gray-600 mt-3 mb-6 max-w-xl">
              Send messages that start genuine conversations. In 1 click.
            </p>
          )}

          {isStep1 && (
            <p className="text-lg text-gray-600 mt-3 mb-6 max-w-xl">
              Find opportunities that align with your expertise, all in one place.
            </p>
          )}

          {isStep2 && (
            <p className="text-lg text-gray-600 mt-3 mb-6 max-w-xl">
              Skip the research. Find the key players instantly.
            </p>
          )}
        </div>

        {/* Main row: bullets on the left, image/video on the right */}
        <div className="flex flex-col-reverse lg:flex-row items-start lg:items-center gap-8">
          {/* LEFT COL: Feature bullets + CTA */}
          <div className="w-full lg:w-2/5">
            {isStep2 ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                  <h4 className="text-[16.5px] font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Decision Makers</h4>
                  <p className="text-[14.5px] text-gray-600 leading-relaxed tracking-wide mt-1.5">
                    Like Event Directors, HR leaders, Chief People Officers, and more.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                  <h4 className="text-[16.5px] font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Events</h4>
                  <p className="text-[14.5px] text-gray-600 leading-relaxed tracking-wide mt-1.5">
                    Event specific emails, Call For Speakers submissions, registration sessions & portals.
                  </p>
                </div>
              </div>
            ) : isStep3 ? (
              <div className="space-y-6">
                <div className="bg-white rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                  <h4 className="text-[16.5px] font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Smart Message Composer</h4>
                  {/* UPDATED STEP 3 BOX 1 SUB TEXT */}
                  <p className="text-[14.5px] text-gray-600 leading-relaxed tracking-wide mt-1.5">
                    Personalized outreach based on the event, contact, and your specific expertise.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
                  <h4 className="text-[16.5px] font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Multi-Channel Options</h4>
                  <p className="text-[14.5px] text-gray-600 leading-relaxed tracking-wide mt-1.5">
                    Connect via email, LinkedIn, or application forms—optimized for each opportunity.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {features?.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                  >
                    <h4 className="text-[16.5px] font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {feature.title}
                    </h4>
                    <p className="text-[14.5px] text-gray-600 leading-relaxed tracking-wide mt-1.5">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Link with animated underline */}
            <motion.div
              className="inline-block relative mt-8"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* UPDATED LINK TO POINT TO SPEAKERDRIVE SIGNUP */}
              <Link 
                href="https://app.speakerdrive.com/signup" 
                className="inline-flex items-center text-[#2D7FE0] font-bold text-xl mt-1"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-[#2D7FE0] rounded-full"
                variants={underlineVariants}
              />
            </motion.div>
          </div>

          {/* RIGHT COL: Video or Image */}
          <div className="w-full lg:w-[51%] lg:mt-0" ref={videoContainerRef}>
            {isExternalVideo && externalVideoSrc ? (
              captionText ? (
                <VideoCaption
                  src={externalVideoSrc}
                  title={title}
                  caption={captionText || ""}
                  className="w-full rounded-xl shadow-lg"
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
                    <p>
                      Your browser doesn't support HTML5 video. Here is a{" "}
                      <a href={externalVideoSrc}>link to the video</a> instead.
                    </p>
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
                    <p>
                      Your browser doesn't support HTML5 video. Here is a{" "}
                      <a href={videoSrc}>link to the video</a> instead.
                    </p>
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