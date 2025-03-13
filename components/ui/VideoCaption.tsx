"use client";
import React from 'react';

interface VideoCaptionProps {
  src: string;
  title?: string;
  caption: string;
  className?: string;
}

export function VideoCaption({ src, title = "Video", caption, className = "" }: VideoCaptionProps) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
        <video
          className={`w-full rounded-t-xl ${className}`}
          playsInline
          muted
          loop
          autoPlay
        >
          <source src={src} type="video/mp4" />
          <p>Your browser doesn't support HTML5 video. Here is a <a href={src}>link to the video</a> instead.</p>
        </video>
      </div>
      
      {/* Caption bar below video - more subtle styling */}
      <div className="py-2 px-4 text-center text-base font-semibold text-gray-900">
        {caption}
      </div>
    </div>
  );
}