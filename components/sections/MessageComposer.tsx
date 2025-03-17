'use client';
import React from 'react';
import { useState } from 'react';
import { motion } from "framer-motion";
import { Mail, Link, AtSign, MessageCircle, Check as CheckCircleIcon, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { TransitionPanel } from '@/components/motion-ui/transition-panel';

const CONTACT_FEATURES = [
  {
    title: 'Contact Emails',
    description: 'Connect directly with decision-makers via their professional email.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf43363da759182090e12d.mp4",
    icon: <Mail className="mr-2.5 h-5 w-5" />,
    gradient: "from-brand-blue to-blue-500"
  },
  {
    title: 'Event Emails',
    description: 'Reach event organizers through professional social platforms.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf408504d6597dbd3827ef.mp4",
    icon: <AtSign className="mr-2.5 h-5 w-5" />,
    gradient: "from-green-500 to-emerald-400"
  },
  {
    title: 'Event URLs',
    description: 'Submit your information through call-for-speakers portals.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf4b3d7be80c24c3f0aa65.mp4",
    icon: <Link className="mr-2.5 h-5 w-5" />,
    gradient: "from-green-500 to-emerald-400"
  },
];

export function MessageComposer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  return (
    <div className="overflow-auto py-0 pb-24 sm:overflow-hidden bg-stone-50">
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Channel Selection */}
        <div className="relative max-w-[800px] mx-auto">
          <div className="absolute inset-0 -m-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100"></div>
          <div className="relative px-4 pt-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Conversations That Convert</h3>
              </div>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                The SpeakerDrive Composer creates messages that start conversations and get responses.
              </p>
            </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-500 mt-0.5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <div>
                <h3 className="text-[15px] font-semibold text-gray-800">See It In Action</h3>
                <div className="flex items-center gap-1.5">
                  <p className="text-[14px] text-gray-600">View by message types</p>
                  <ArrowRight className="h-3.5 w-3.5 text-gray-400 ml-1" />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              {CONTACT_FEATURES.map((feature, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={index}
                      type='button'
                      onClick={() => {
                        setDirection(index > activeIndex ? 1 : -1);
                        setActiveIndex(index);
                      }}
                      className={cn(
                        'relative rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-2',
                        isActive
                          ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-4 h-4",
                        isActive ? "text-gray-700" : "text-gray-500"
                      )}>
                        <div className="w-5 h-5">{feature.icon}</div>
                      </div>
                      <span>{feature.title}</span>
                    </button>
                  );
              })}
            </div>
          </div>
          {/* Video Display Panel */}
          <div className='mt-8 mb-8'>
            <TransitionPanel
              className='aspect-video w-full overflow-hidden rounded-xl'
              activeIndex={activeIndex}
              custom={direction}
              transition={{
              ease: 'easeOut',
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
                className='relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl'
                key={feature.title}
              >
                {feature.video ? (
                  <div className="w-full h-full overflow-hidden relative border-2 border-gray-200 rounded-xl">
                    <video
                      className="w-full h-full object-cover rounded-xl shadow-md"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={feature.video} type="video/mp4" />
                      <p>Your browser doesn't support HTML5 video.</p>
                    </video>
                  </div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-blue-100 z-0"></div>
                    <div className="relative z-10 p-8 max-w-xl">
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                      <p className="text-lg text-gray-700">{feature.description}</p>
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
    </div>
  );
}