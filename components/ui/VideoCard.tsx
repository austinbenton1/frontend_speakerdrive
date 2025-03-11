"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

interface VideoCardProps {
  videoSrc: string;
  thumbnailSrc?: string;
  title: string;
  duration?: string;
  publishedTime?: string;
  onClick?: () => void;
}

export function VideoCard({
  videoSrc,
  thumbnailSrc,
  title,
  duration = "2:02",
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
      className="w-full max-w-md rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100"
      style={{ 
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)',
      }}
    >
      {/* Video Thumbnail Container */}
      <div 
        className="relative w-full aspect-video cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={onClick}
      >
        {/* Thumbnail Image */}
        {thumbnailImage && (
          <img
            src={thumbnailImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className={`w-16 h-16 rounded-full bg-gray-600/80 flex items-center justify-center transition-transform duration-300 ${isHovering ? 'scale-110' : 'scale-100'}`}
            style={{ backdropFilter: 'blur(2px)' }}
          >
            <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-white ml-1"></div>
          </div>
        </div>
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-gray-900/70 text-white px-2 py-0.5 rounded-md text-xs font-medium">
          {duration}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex">
          {/* Thumbnail as small image in upper left */}
          <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 mr-3">
            {thumbnailImage ? (
              <img 
                src={thumbnailImage} 
                alt="Thumbnail" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-500"></div>
            )}
          </div>
          
          {/* Title next to the image */}
          <h3 className="text-lg font-bold text-gray-900 leading-tight flex-1 pt-1">
            {title}
          </h3>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
        <button 
          className="text-blue-500 font-medium text-base flex items-center"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"></path>
            <path d="m21 3-9 9"></path>
            <path d="M15 3h6v6"></path>
          </svg>
          View
        </button>
        
        <button className="text-gray-500 p-1 rounded-full hover:bg-gray-100">
          <MoreHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}