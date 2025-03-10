"use client";
import { useEffect, useRef, useState } from 'react';

interface VideoEmbedProps {
  src: string;
  title?: string;
  className?: string;
}

export function VideoEmbed({ src, title = "Video", className = "" }: VideoEmbedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      const errorCode = video.error?.code || 0;
      let errorText = "Unknown error";
      
      switch(errorCode) {
        case 1: errorText = "Video loading aborted"; break;
        case 2: errorText = "Network error"; break;
        case 3: errorText = "Video decoding error"; break;
        case 4: errorText = "Format not supported"; break;
      }
      
      setError(errorText);
      console.error("Video error:", errorText);
    };

    const handleLoaded = () => {
      setLoaded(true);
      setError(null);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadedmetadata', handleLoaded);

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadedmetadata', handleLoaded);
    };
  }, []);

  return (
    <div className={`rounded-xl overflow-hidden bg-black ${className}`}>
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-t-xl text-sm">
          <p className="font-semibold">Error loading video:</p>
          <p>{error}</p>
        </div>
      )}
      
      <div className={`${error ? 'opacity-50' : ''}`}>
        <video
          ref={videoRef}
          className="w-full"
          autoPlay
          muted
          loop
          playsInline
          title={title}
        >
          <source src={src} type="video/mp4" />
          <p>Your browser does not support HTML5 video. <a href={src} className="text-blue-500 underline">View the video</a> directly.</p>
        </video>
      </div>
    </div>
  );
}