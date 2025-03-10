"use client";
import { useEffect, useState } from 'react';

interface FileCheckProps {
  path: string;
  alt: string;
  isVideo?: boolean;
}

export function FileCheck({ path, alt, isVideo = false }: FileCheckProps) {
  const [exists, setExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isVideo) {
      // Check if video exists by trying to load metadata
      const video = document.createElement('video');
      
      // Set up event listeners
      video.onloadedmetadata = () => {
        setExists(true);
        setLoading(false);
      };
      
      video.onerror = () => {
        setExists(false);
        setLoading(false);
      };
      
      // Add a timeout in case neither event fires
      const timeout = setTimeout(() => {
        if (loading) {
          setExists(false);
          setLoading(false);
        }
      }, 3000);
      
      // Set source and start loading
      video.src = path;
      video.load();
      
      return () => clearTimeout(timeout);
    } else {
      // Image check
      const img = new Image();
      img.onload = () => {
        setExists(true);
        setLoading(false);
      };
      img.onerror = () => {
        setExists(false);
        setLoading(false);
      };
      img.src = path;
    }
  }, [path, isVideo, loading]);

  if (loading) {
    return <div className="p-4 bg-blue-50 text-blue-700 rounded-md">Checking file: {path}...</div>;
  }

  if (!exists) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
        <p><strong>File Not Found:</strong> {path}</p>
        <p>This file appears to be missing from your public directory.</p>
      </div>
    );
  }

  if (isVideo) {
    // Determine video type based on file extension
    const isWebm = path.endsWith('.webm');
    const videoType = isWebm ? 'video/webm' : 'video/mp4';
    
    return (
      <div className="border rounded overflow-hidden bg-slate-50">
        <video 
          controls 
          className="w-full h-auto"
          style={{ maxHeight: '300px' }}
        >
          <source src={path} type={videoType} />
          {alt}
        </video>
      </div>
    );
  }

  return <img src={path} alt={alt} className="w-full h-auto" />;
}