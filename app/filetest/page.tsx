"use client";
import { FileTestHero } from "@/components/sections/FileTestHero";

export default function FileTestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">File Test Page</h1>
      <FileTestHero />
    </div>
  );
}