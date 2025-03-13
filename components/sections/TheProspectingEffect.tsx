"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TriangleIcon as ExclamationTriangleIcon, CheckCircleIcon, ArrowDownIcon, ArrowRight } from 'lucide-react';

export function TheProspectingEffect() {
  return (
    <div className="-mt-20 pt-0 pb-20">
      {/* Main container with gradient background - ONLY for top section */}
      <div className="bg-gradient-to-b from-red-50/10 via-red-50/30 to-red-50/5 pt-10 pb-6">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Section Title with warning icon */}
          <div className="mb-6 text-center pt-0">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-center"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-50 border-4 border-white shadow-md relative">
                <ExclamationTriangleIcon className="h-7 w-7 text-red-600 opacity-90" />
                <span className="absolute text-red-600 font-bold text-lg" style={{ marginTop: '-1px' }}>!</span>
              </div>
            </motion.div>
            
            {/* Added more space (mt-8) between icon and heading */}
            <motion.h2 
              className="text-3xl sm:text-[2.5rem] font-extrabold text-gray-900 mb-3 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              The Referral Trap
            </motion.h2>
            
            {/* Updated subheadline copy - made left-aligned */}
            <motion.p 
              className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-xl mx-auto text-center mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Relying on word-of-mouth alone leaves your business growth vulnerable to uncertainty.
            </motion.p>
            
          </div>
          
          {/* Image container without banner */}
          <div className="mx-auto max-w-3xl mt-4 mb-8">
            <motion.div 
              className="flex flex-col overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div>
                {/* Image container with landscape aspect ratio */}
                <div className="aspect-[16/9] w-full overflow-hidden flex items-center justify-center px-4">
                  <img
                    src="/Bad.png"
                    alt="Inconsistent prospecting - inefficient and time-consuming"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Visual transition from red to blue section - MOVED above blue text */}
          <div className="flex flex-col items-center py-6">
            <div className="h-24 w-1 bg-gradient-to-b from-red-300/70 to-brand-blue/50"></div>
            
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 my-3">
              <ArrowDownIcon className="h-5 w-5 text-brand-blue" />
            </div>
            
            <div className="h-8 w-px bg-gradient-to-b from-brand-blue/50 to-transparent"></div>
          </div>
          
          {/* Triangle icon in a circle - NOW BLUE instead of red */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 border border-blue-100">
              <ExclamationTriangleIcon className="h-8 w-8 text-brand-blue" />
            </div>
          </div>
          
          {/* Moved "Are you actively prospecting..." BELOW the gradient line */}
          <div className="max-w-3xl mx-auto mt-6 mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold text-3xl sm:text-4xl mb-3">
                Prospecting Is The Key
              </h2>
              <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-xl mx-auto pb-1">
                Consistent Prospecting -> Predictable Growth.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* COMPLETELY NEW SECTION with pure white background */}
      <div className="bg-white py-4">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Solution Section - Removed the quote entirely */}
          <div className="max-w-xl mx-auto mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left max-w-xl mx-auto"
            >
              <div className="p-6 border-0">
                <div className="flex items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    <CheckCircleIcon className="h-6 w-6 text-brand-blue mr-2 inline-block" />
                    Here's How
                  </h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-lg text-gray-600">
                    SpeakerDrive helps you break free from the feast/famine cycle with a proven, systematic approach to prospecting.
                  </p>
                </div>
                
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>Just 15-20 minutes of focused prospecting each day can transform your business stability.</p>
                  
                  {/* Updated styling for the blue text to look more modern */}
                  <p>
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
                      SpeakerDrive makes this easy.
                    </span>
                  </p>
                  
                  <p>Outreach directly to decision-makers and the events that matter to you most.</p>
                  
                  <p>Watch as your pipeline builds and develops. You'll command higher fees and be able to choose the clients YOU want to work with.</p>
                  
                  <p>And amplify your influence.</p>
                  
                  <p className="font-medium text-gray-800">Start your free trial and control your pipeline.</p>
                  
                  {/* Added CTA button and text */}
                  <div className="flex flex-col items-center mt-16 mb-24">
                    <a
                      href="/signup"
                     className="cta-button inline-flex items-center justify-center rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600 text-white px-6 py-3 text-lg font-bold shadow-md"
                    >
                      Get started. It's FREE! <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                    <p className="mt-4 text-sm text-gray-500">
                      Start Free Trial. No credit card needed.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}