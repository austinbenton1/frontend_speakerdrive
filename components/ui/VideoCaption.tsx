"use client";
import React from 'react';
import { LazyVideo } from '@/components/ui/LazyVideo';

interface VideoCaptionProps {
  src: string;
  title?: string;
  caption: string;
  className?: string;
  poster?: string;
  /** The video file's pixel size; holds the box open before it loads. */
  width?: number;
  height?: number;
}

export function VideoCaption({ src, caption, className = "", poster, width = 1280, height = 720 }: VideoCaptionProps) {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="rounded-xl border border-neutral-200 shadow-lg overflow-hidden">
        <LazyVideo
          src={src}
          poster={poster}
          width={width}
          height={height}
          className={`w-full rounded-t-xl ${className}`}
        />
      </div>

      {/* Caption bar below video */}
      <div className="py-2 px-4 text-center text-base font-semibold text-gray-900">
        {caption}
      </div>
    </div>
  );
}
