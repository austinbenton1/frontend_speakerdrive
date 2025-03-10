"use client";
import { FileCheck } from "@/components/ui/FileMissing";

export function FileTestHero() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <h2 className="text-2xl font-bold mb-6">Image & Video File Test Page</h2>
      <p className="mb-6">This component tests if your image and video files are available in the public directory.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Video 1 (WebM)</h3>
          <FileCheck path="/video-one.webm" alt="Video 1" isVideo={true} />
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Video 2</h3>
          <FileCheck path="/how_it_works_two.mp4" alt="Video 2" isVideo={true} />
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Video 3</h3>
          <FileCheck path="/how_it_works_three.mp4" alt="Video 3" isVideo={true} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Left Hero Image</h3>
          <FileCheck path="/Left Hero-mh.png" alt="Left Hero" />
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Right Hero Image</h3>
          <FileCheck path="/Right Hero-mh.png" alt="Right Hero" />
        </div>
      </div>
      
      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Dashboard Image</h3>
        <FileCheck path="/Dashboard-mh.png" alt="Dashboard" />
      </div>
      
      <p className="mt-6 text-sm text-gray-600">
        Note: If any files are showing as not found, make sure they exist in your /public folder
        with exactly the same filename (including capitalization and spaces).
      </p>
    </div>
  );
}