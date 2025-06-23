"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Full nav includes "Home" for mobile
const DEFAULT_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pricing", href: "http://speakerdrive.com/pricing" },
  { label: "Contact", href: "http://speakerdrive.com/contact" },
];

interface HeaderFinalProps {
  companyName: string;
  logo: React.ReactNode;
  links?: { label: string; href: string }[];
  hideNavigation?: boolean;
}

export function HeaderFinal({ companyName, logo, links, hideNavigation }: HeaderFinalProps) {
  // Use default links if none provided
  const navigationLinks = links || DEFAULT_NAV_LINKS;

  // Remove "Home" from desktop
  const desktopLinks = navigationLinks.filter((link) => link.label !== "Home");

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "relative w-full transition-all duration-300",
        hasScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-screen-lg mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-20">
          <span className="sr-only">{companyName}</span>
          {logo}
        </Link>
        
        {/* Desktop Navigation (no "Home") */}
        {!hideNavigation && <div className="hidden md:flex items-center">
          <nav className="flex items-center space-x-8">
            {desktopLinks.map((link) => (
              <a
                key={link.label}
                href={link.href || "#"}
                className="text-base font-medium tracking-wide text-neutral-700 hover:text-brand-blue transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-5 ml-10">
            <a
              href="https://app.speakerdrive.com/signup"
              className="cta-button text-base font-medium text-white px-5 py-2.5 rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600"
            >
              Start Free Trial
            </a>
          </div>
        </div>}

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-neutral-500 bg-white/90
                       hover:text-brand-blue hover:bg-white rounded-md focus:outline-none relative z-20 shadow-sm"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <span 
                className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-current transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span 
                className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <motion.div 
        className={cn("fixed inset-0 bg-black/50 z-10 md:hidden", 
          isMobileMenuOpen ? "block" : "hidden"
        )}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile menu dropdown */}
      <motion.div
        className={cn(
          "absolute top-full left-0 right-0 bg-white z-10 shadow-lg md:hidden overflow-hidden",
          isMobileMenuOpen ? "block" : "hidden"
        )}
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 py-5 space-y-4">
          {/* Full nav (including Home) on mobile */}
          <nav className="flex flex-col space-y-3">
            {navigationLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium px-3 py-2.5 text-gray-700 hover:text-brand-blue rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col space-y-2.5 pt-3 mt-2 border-t border-gray-100">
            <a
              href="https://app.speakerdrive.com/signup"
              className="mx-auto w-[85%] cta-button flex justify-center text-[17px] font-semibold text-white px-4 py-3 rounded-lg bg-gradient-to-r from-brand-blue to-blue-600 hover:from-brand-blue/90 hover:to-blue-600/90 transition-all shadow-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started. It's FREE 🚀
            </a>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
