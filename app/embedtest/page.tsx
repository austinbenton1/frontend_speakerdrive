"use client";
import { useState } from 'react';
import Link from 'next/link';
import { VideoEmbed } from '@/components/ui/VideoEmbed';

export default function EmbedTestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Video Embedding Test</h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        This page tests our custom VideoEmbed component with external video sources.
        <br />
        <Link href="/" className="text-blue-600 hover:underline mt-2 inline-block">
          ← Back to home
        </Link>
      </p>
      
      <div className="max-w-4xl mx-auto grid gap-8">
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Video 1: Find Qualified Leads</h2>
          <VideoEmbed 
            src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb25da2d5867d8cf31812d.mp4" 
            title="Feature Demo 1"
          />
        </div>
        
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Video 2: Unlock Contact Info</h2>
          <VideoEmbed 
            src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb26a4f00f58e2218e0cf6.mp4" 
            title="Feature Demo 2"
          />
        </div>
        
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Video 3: Craft Outreach</h2>
          <VideoEmbed 
            src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb33823ea7268250330cdb.mp4" 
            title="Feature Demo 3"
          />
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-2">Video Embedding Notes</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>The custom VideoEmbed component includes error handling and fallback options.</li>
            <li>If the direct embed fails, you might need to consider alternatives like:</li>
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Using an iframe if the video is from a service that provides embed codes</li>
              <li>Using a video platform like YouTube, Vimeo, or Wistia for better cross-browser compatibility</li>
              <li>Proxying the video through your server (requires server-side implementation)</li>
            </ul>
            <li>The external Google Cloud Storage URL should work in most cases as they typically allow cross-origin requests.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}