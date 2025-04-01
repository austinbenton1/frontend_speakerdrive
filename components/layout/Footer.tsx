'use client';
import { useState } from 'react';
import Link from 'next/link';
import { TextScramble } from '../motion-ui/text-scramble';

export function Footer5() {
  const [trigger, setTrigger] = useState(true);

  const handleScrambleComplete = () => {
    setTimeout(() => {
      setTrigger(true);
    }, 4000);
    setTrigger(false);
  };

  return (
    <footer className="bg-[#0F172A] text-white mt-20">
      <div className="mx-auto w-full max-w-screen-lg px-4 py-12">
        {/* Main content grid with columns */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Column 1: SpeakerDrive */}
          <div className="md:w-1/3 flex flex-col gap-4 mb-8 md:mb-0">
            <div>
              <img 
                src="/SpeakerDrive Logo - Long.png" 
                alt="SpeakerDrive" 
                className="h-7 brightness-0 invert" 
              />
            </div>
            <p className="text-sm text-zinc-300">
              SpeakerDrive is a prospecting platform built specifically for speakers, trainers, coaches, and consultants to find and connect with relevant decision-makers and events. We help you find opportunities that turn the traditional "sales" process into a natural extension of your expertise.
            </p>
          </div>
          
          {/* Right columns container */}
          <div className="flex flex-wrap md:flex-nowrap md:space-x-12 lg:space-x-24">
            {/* Column 2: Product */}
            <div className="w-1/2 md:w-auto flex flex-col gap-3 mb-8 md:mb-0">
              <h3 className="text-base font-bold text-zinc-300">Product</h3>
              <a
                href="http://speakerdrive.com/about"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors"
              >
                About
              </a>
              <a
                href="http://speakerdrive.com/pricing"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors"
              >
                Pricing
              </a>
              <a
                href="http://speakerdrive.com/contact"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors"
              >
                Contact
              </a>
            </div>
            
            {/* Column 3: Support */}
            <div className="w-1/2 md:w-auto flex flex-col gap-3 mb-8 md:mb-0">
              <h3 className="text-base font-bold text-zinc-300">Support</h3>
              <a
                href="https://learn.speakerdrive.com"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </a>
              <a
                href="mailto:support@speakerdrive.com"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors flex items-center gap-1.5"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                support@speakerdrive.com
              </a>
              <a
                href="http://speakerdrive.com/demo"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors"
              >
                Book A Demo
              </a>
            </div>
            
            {/* Column 4: More */}
            <div className="w-1/2 md:w-auto flex flex-col gap-3">
              <h3 className="text-base font-bold text-zinc-300">More</h3>
              <a
                href="http://linkedin.com/in/austin-benton"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="fill-zinc-300"
                >
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
                LinkedIn
              </a>
              <a
                href="http://speakerdrive.com/affiliates"
                className="text-sm text-zinc-100 hover:text-brand-blue transition-colors"
              >
                Affiliates
              </a>
            </div>
          </div>
        </div>
        
        {/* Border */}
        <div className="border-t border-zinc-700 mb-8"></div>
        
        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Legal links */}
          <div className="flex gap-x-6">
            <Link href="/legal/privacy" className="text-sm text-zinc-400 hover:text-brand-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-sm text-zinc-400 hover:text-brand-blue transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/disclaimer" className="text-sm text-zinc-400 hover:text-brand-blue transition-colors">
              Disclaimer
            </Link>
          </div>
          
          {/* Copyright scramble */}
          <div className="h-6 flex items-center">
            <TextScramble
              className="text-sm text-blue-200/70"
              as="p"
              trigger={trigger}
              onScrambleComplete={handleScrambleComplete}
            >
              {`© ${new Date().getFullYear()} SpeakerDrive. All rights reserved.`}
            </TextScramble>
          </div>
        </div>
      </div>
    </footer>
  );
}
