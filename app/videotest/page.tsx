"use client";
import { useState } from 'react';
import Link from 'next/link';

const videos = [
  { path: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb25da2d5867d8cf31812d.mp4", name: "Video 1: Find Qualified Leads", type: "video/mp4" },
  { path: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb26a4f00f58e2218e0cf6.mp4", name: "Video 2: Unlock Contact Info", type: "video/mp4" },
  { path: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb33823ea7268250330cdb.mp4", name: "Video 3: Craft Outreach", type: "video/mp4" },
];

export default function VideoTestPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const logMessage = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 20));
  };

  const addVideoEventListeners = (video: HTMLVideoElement, name: string) => {
    video.addEventListener('loadedmetadata', () => logMessage(`✅ ${name}: Metadata loaded successfully`));
    video.addEventListener('canplay', () => logMessage(`✅ ${name}: Video can play`));
    video.addEventListener('playing', () => logMessage(`✅ ${name}: Video is playing`));
    video.addEventListener('error', (e) => {
      const error = (video.error?.code || 0);
      let errorText = "Unknown error";
      
      switch(error) {
        case 1: errorText = "MEDIA_ERR_ABORTED"; break;
        case 2: errorText = "MEDIA_ERR_NETWORK"; break;
        case 3: errorText = "MEDIA_ERR_DECODE"; break;
        case 4: errorText = "MEDIA_ERR_SRC_NOT_SUPPORTED"; break;
      }
      
      logMessage(`❌ ${name}: Error (${errorText}): ${video.error?.message || 'No details'}`);
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">External Video Test Page</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        This page tests loading videos from external sources.
        <br />
        <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
          ← Back to home
        </Link>
      </p>
      
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="border rounded-lg p-4 bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">{video.name}</h2>
            <div className="border rounded-lg overflow-hidden mb-4">
              <video
                className="w-full"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                ref={el => el && addVideoEventListeners(el, video.name)}
              >
                <source src={video.path} type={video.type} />
                <p>Your browser doesn't support HTML5 video.</p>
              </video>
            </div>
            <div className="text-sm">
              <p className="font-medium">Direct link:</p>
              <a 
                href={video.path} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 break-all hover:underline"
              >
                {video.path}
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border rounded-lg p-4 bg-gray-50 mb-8">
        <h2 className="text-lg font-semibold mb-2">Video Logs</h2>
        <div className="h-40 overflow-y-auto p-2 bg-gray-100 rounded border">
          {logs.length === 0 ? (
            <p className="text-gray-500 italic">No logs yet. Try playing the videos.</p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="text-sm py-1 border-b border-gray-200 last:border-0">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">External Video Notes</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>External videos may have CORS issues if the server doesn't allow cross-origin requests.</li>
          <li>Make sure the video URL is accessible and not protected by authentication.</li>
          <li>Google Cloud Storage URLs typically allow embedding without CORS issues.</li>
          <li>If the video still doesn't play, you may need to use an iframe embed instead of a video tag.</li>
        </ul>
      </div>
    </div>
  );
}