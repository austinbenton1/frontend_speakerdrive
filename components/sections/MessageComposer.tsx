"use client";
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
    <div className='overflow-auto py-0 sm:overflow-hidden bg-stone-50'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Section Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center mb-4">
            <MessageCircle className="h-7 w-7 mr-3 text-brand-blue" />
            <h3 className="text-2xl font-bold text-gray-800">Ditch The Hard Sales Pitch</h3>
          </div>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Generate personalized outreach messages that engage decision-makers and start conversations.
          </p>
        </div>

        {/* Channel Selection */}
        <div className="mb-12 max-w-3xl mx-auto">
          <p className="text-base font-medium text-gray-700 mb-3.5">
            Choose your outreach channel:
          </p>
          <div className='flex flex-col sm:flex-row sm:space-x-5 space-y-4 sm:space-y-0 justify-center'>
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
                      'relative rounded-md px-5 py-3 text-base font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-blue w-full sm:w-auto',
                      isActive
                        ? `bg-gradient-to-r ${feature.gradient} text-white shadow-md`
                        : 'bg-white text-gray-800 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300'
                    )}
                  >
                    {feature.icon}
                    {feature.title}
                    {isActive ? (
                      <CheckCircleIcon className="ml-2 h-4 w-4" />
                    ) : (
                      <ArrowRight className="ml-2 h-5 w-5 opacity-70" />
                    )}
                    
                    {isActive && (
                      <motion.span 
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-[calc(100%-8px)] rounded-full bg-gradient-to-r ${feature.gradient} opacity-90 -ml-0.5`}
                        layoutId="active-indicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </button>
                );
            })}
          </div>
        </div>

        {/* Video Display Panel */}
        <div className='flex justify-center max-w-4xl mx-auto px-4'>
          <TransitionPanel
            className='aspect-video w-[800px] max-w-full overflow-hidden rounded-xl'
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
                  <div className="w-full h-full overflow-hidden relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        feature.title === 'Email Outreach'
                          ? 'from-brand-blue/5'
                          : 'from-green-500/5'
                      } to-transparent z-10 pointer-events-none`}
                    />
                    <video
                      className="w-full h-full object-cover"
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
  );
}