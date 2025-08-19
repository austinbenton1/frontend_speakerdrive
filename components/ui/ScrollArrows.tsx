// components/ui/ScrollArrows.tsx
"use client";

import { ChevronUp, ChevronDown } from "lucide-react";

type ScrollArrowsProps = {
  onScrollUp: () => void;
  onScrollDown: () => void;
};

export const ScrollArrows = ({ onScrollUp, onScrollDown }: ScrollArrowsProps) => {
  return (
    // This container is now hidden on mobile and visible (as a flex container) on medium screens and up.
    <div className="hidden md:flex fixed top-1/2 right-4 transform -translate-y-1/2 z-20 flex-col items-center gap-y-3">
      {/* Up Arrow Button */}
      <button
        onClick={onScrollUp}
        aria-label="Scroll up"
        className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-colors p-3"
      >
        <ChevronUp className="h-8 w-8" />
      </button>

      {/* Down Arrow Button */}
      <button
        onClick={onScrollDown}
        aria-label="Scroll down"
        className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-full shadow-lg hover:bg-white transition-colors p-3"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </div>
  );
};