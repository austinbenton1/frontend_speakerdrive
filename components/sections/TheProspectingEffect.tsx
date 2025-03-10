"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TriangleIcon as ExclamationTriangleIcon, CheckCircleIcon } from 'lucide-react';

export function TheProspectingEffect() {
  return (
    <div className="-mt-20 pt-0 pb-20">
      {/* Main container with gradient background - ONLY for top section */}
      <div className="bg-gradient-to-b from-red-50/10 via-red-50/30 to-red-50/5 pt-10 pb-10">
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
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-100 border-4 border-white shadow-md">
                <ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
              </div>
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              The Referral Trap
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Relying on word-of-mouth alone puts your business growth at the mercy of others. This creates an unstable foundation that can erupt without warning.
            </motion.p>
            
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Most thought leaders don't prospect for NEW business. Over time, the consequences of a dry pipeline are cascading.
            </motion.p>
          </div>
          
          {/* Inconsistent Prospecting box - still in the colored section */}
          <div className="mx-auto max-w-2xl mb-10">
            <motion.div 
              className="flex flex-col rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-600 py-3 px-4">
                <h3 className="font-bold text-white text-center text-xl">Inconsistent Prospecting Leads To...</h3>
              </div>
              <div className="bg-white p-4">
                {/* Image container with landscape aspect ratio */}
                <div className="aspect-[16/9] w-full overflow-hidden flex items-center justify-center">
                  <img
                    src="/Bad.png"
                    alt="Inconsistent prospecting - inefficient and time-consuming"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* COMPLETELY NEW SECTION with pure white background */}
      <div className="bg-white py-10">
        <div className="container mx-auto max-w-5xl px-4">
          {/* Testimonial Section - Removed shadow and border */}
          <div className="max-w-xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-left mb-6"
            >
              <h3 className="text-lg sm:text-xl text-gray-600 mb-2">
                Are you actively prospecting, or just hoping for referrals?
              </h3>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-lg mb-10"
            >
              <div className="relative">
                {/* More subtle quote marks */}
                <div className="absolute -top-6 -left-2 text-gray-200 text-5xl leading-none font-serif">"</div>
                
                <blockquote className="relative z-10 text-sm text-gray-600 italic leading-relaxed pl-2">
                  Here's the thing about prospecting: it is the foundational thing that every speaker needs to jump into early and often to build your business. If you're not prospecting, you're not building your business - it's the cold hard truth.
                </blockquote>
                
                {/* More subtle end quote mark */}
                <div className="absolute -bottom-6 -right-2 text-gray-200 text-5xl leading-none font-serif">"</div>
              </div>
              
              <div className="mt-6 flex items-center">
                <img 
                  src="/Speaker Lab.jpg" 
                  alt="Erick Rheam" 
                  className="w-12 h-12 rounded-full object-cover mr-3 border border-gray-200"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/48";
                  }}
                />
                <div className="text-left">
                  <p className="font-bold text-gray-800 text-sm">Erick Rheam</p>
                  <p className="text-gray-500 text-xs">VIP Facilitator, The Speaker Lab</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-left max-w-xl mx-auto"
            >
              <div className="p-6 border-0">
                <div className="flex items-center mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-brand-blue mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">The Solution: Consistent Prospecting</h3>
                </div>
                
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>Your business transforms when you have a repeatable prospecting process.</p>
                  
                  <p>Incorporating a small part of your day - consistently - to prospecting will change your business.</p>
                  
                  <p><span className="font-medium text-brand-blue">SpeakerDrive makes this easy.</span></p>
                  
                  <p>Outreach directly to decision-makers and the events that matter to you most.</p>
                  
                  <p>Watch as your pipeline builds and develops. You'll command higher fees and be able to choose the clients YOU want to work with.</p>
                  
                  <p>And amplify your influence.</p>
                  
                  <p className="font-medium text-gray-800">Start your SpeakerDrive free trial today.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}