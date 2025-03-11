"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Play } from 'lucide-react';

interface VideoCardProps {
  videoSrc: string;
  thumbnailSrc?: string;
  title: string;
  subtitle?: string;
  duration?: string;
  publishedTime?: string;
  onClick?: () => void;
}

export function VideoCard({
  videoSrc,
  thumbnailSrc,
  title,
  subtitle,
  duration = "0:20",
  publishedTime = "1 week ago",
  onClick
}: VideoCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailImage, setThumbnailImage] = useState<string | null>(null);

  // Set thumbnail image from prop or default
  useEffect(() => {
    if (thumbnailSrc) {
      setThumbnailImage(thumbnailSrc);
    }
  }, [thumbnailSrc]);

  return (
    <div 
      className="w-full max-w-[300px] rounded-lg overflow-hidden bg-white shadow-md border border-gray-100"
      style={{ 
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Video Thumbnail Container */}
      <div 
        className="relative w-full h-36 cursor-pointer overflow-hidden bg-gray-100"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
      >
        {/* Duration and Play Icon - relocated to bottom right */}
        <div className="absolute bottom-2 right-2 bg-gray-900/70 text-white px-2 py-0.5 rounded-md text-xs font-medium flex items-center">
          <Play className="h-3 w-3 mr-1.5" />
          {duration}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3">
        <div className="flex items-start">
          {/* Thumbnail as small image in left */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 mr-3">
            <img 
              src="/2025 BOMA Winter Issues Forum-mh.png" 
              alt="Thumbnail" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Title and subtitle next to the image - left aligned */}
          <div className="flex-1 text-left">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-gray-500">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-3 py-2 border-t border-gray-100 flex justify-between items-center">
        <button 
          className="text-blue-500 font-medium text-xs flex items-center"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path>
            <path d="m21 3-9 9"></path>
            <path d="M15 3h6v6"></path>
          </svg>
          View
        </button>
        
        <button className="text-gray-500 p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}