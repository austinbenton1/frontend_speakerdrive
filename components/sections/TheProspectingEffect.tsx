"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TriangleIcon as ExclamationTriangleIcon, CheckCircleIcon } from 'lucide-react';

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
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-red-100 border-4 border-white shadow-md">
                <ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
              </div>
            </motion.div>
            
            {/* Added more space (mt-8) between icon and heading */}
            <motion.h2 
              className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Stuck Waiting for Referrals?
            </motion.h2>
            
            {/* Updated subheadline copy - removed the "Like most experts..." part */}
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Relying on word-of-mouth alone puts your business growth at the mercy of others.
              
              <br /><br />
              
              Over time, this passive approach creates a cascade of consequences.
            </motion.p>
          </div>
          
          {/* Inconsistent Prospecting box - still in the colored section */}
          <div className="mx-auto max-w-2xl mb-6">
            <motion.div 
              className="flex flex-col rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-red-600 py-3 px-4">
                <h3 className="font-bold text-white text-center text-xl">The Cost Of Inconsistent Prospecting</h3>
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
          
          {/* Moved "Are you actively prospecting..." below the graphic with gradient styling */}
          <div className="max-w-xl mx-auto mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold text-xl sm:text-2xl">
                Are you actively prospecting, or just hoping for referrals?
              </h3>
              <p className="text-gray-600 mt-1 text-lg font-medium">
                Like most experts, you might not be actively prospecting for NEW business.
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
                  <CheckCircleIcon className="h-6 w-6 text-brand-blue mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">Prospecting Is The Key</h3>
                </div>
                
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>SpeakerDrive helps you break free from this cycle with a consistent, effective prospecting system.</p>
                  
                  <p>Incorporating a small part of your day - consistently - to prospecting will change your business.</p>
                  
                  {/* Updated styling for the blue text to look more modern */}
                  <p>
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent font-semibold">
                      SpeakerDrive makes this easy.
                    </span>
                  </p>
                  
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