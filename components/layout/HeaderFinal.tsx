"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Shared navigation configuration
export const DEFAULT_NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

interface HeaderFinalProps {
  companyName: string;
  logo: React.ReactNode;
  links?: { label: string; href: string }[];
}

export function HeaderFinal({ companyName, logo, links }: HeaderFinalProps) {
  // Use default links if none provided
  const navigationLinks = links || DEFAULT_NAV_LINKS;

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
        "fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300",
        hasScrolled 
          ? "bg-white/95 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-screen-lg mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 relative z-20">
          <span className="sr-only">{companyName}</span>
          {logo}
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href || "#"}
                className="text-base font-medium tracking-wide text-neutral-700 hover:text-brand-blue transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-5 ml-10">
            <Link
              href="/login"
              className="text-base font-medium text-neutral-800 hover:text-brand-blue transition-colors relative group"
            >
              Sign in
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-brand-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/signup"
              className="cta-button text-base font-medium text-white px-5 py-2.5 rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600"
            >
              Try for free
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 text-neutral-500 
                       hover:text-brand-blue hover:bg-neutral-100 rounded-md focus:outline-none relative z-20"
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
        className={cn("absolute top-full left-0 right-0 bg-white z-10 shadow-lg md:hidden overflow-hidden",
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
          <nav className="flex flex-col space-y-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base font-medium py-2 text-neutral-700 hover:text-brand-blue"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col space-y-3 pt-2 border-t border-gray-100">
            <Link
              href="/login"
              className="text-base font-medium py-2 text-neutral-800 hover:text-brand-blue"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="cta-button flex justify-center text-base font-medium text-white px-5 py-2.5 rounded-lg animated-gradient bg-gradient-to-r from-brand-blue via-blue-500 to-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Try for free
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}