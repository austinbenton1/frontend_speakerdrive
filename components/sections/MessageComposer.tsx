"use client";
import { useState } from 'react';
import { motion } from "framer-motion";
import { Mail, Link, AtSign, Check as CheckCircleIcon, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { TransitionPanel } from '@/components/motion-ui/transition-panel';

const CONTACT_FEATURES = [
  {
    title: 'Contact Emails',
    description: 'Find direct emails for key decision-makers at organizations you want to speak for.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf43363da759182090e12d.mp4",
    icon: <Mail className="mr-2 h-5 w-5" />,
    gradient: "from-brand-blue to-blue-500"
  },
  {
    title: 'Event Emails',
    description: 'Get access to validated event and conference email addresses for easier outreach.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf408504d6597dbd3827ef.mp4",
    icon: <AtSign className="mr-2 h-5 w-5" />,
    gradient: "from-green-500 to-emerald-400"
  },
  {
    title: 'Event URLs',
    description: 'Find direct links to application forms and speaker submission portals.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf4b3d7be80c24c3f0aa65.mp4",
    icon: <Link className="mr-2 h-5 w-5" />,
    gradient: "from-green-500 to-emerald-400"
  },
];

export function MessageComposer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  return (
    <div className='overflow-auto py-16 sm:overflow-hidden'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* SpeakerDrive logo */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2">
            <img
              src="/SpeakerDrive Logo - Long.png"
              alt="SpeakerDrive Logo"
              className="h-9 sm:h-10 object-contain"
            />
            <h2 className='text-2xl sm:text-3xl text-zinc-900 font-bold'>
              Message Composer
            </h2>
          </div>
        </div>

        <div className='mb-10 overflow-x-auto [scrollbar-width:none]'>
          <div className='flex min-w-max items-center justify-center space-x-5'>
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
                    'relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ring-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-blue my-2',
                    isActive
                      ? `bg-gradient-to-r ${feature.gradient} text-white`
                      : 'bg-white text-gray-800 hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-300'
                  )}
                >
                  {feature.icon}
                  {feature.title}
                  {isActive ? (
                    <CheckCircleIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
                  )}
                  
                  {isActive && (
                    <motion.span 
                      className={`absolute inset-0 rounded-md bg-gradient-to-r ${feature.gradient} opacity-20 -z-10`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className='flex justify-center'>
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
                      feature.title === 'Contact Emails'
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
  );
}