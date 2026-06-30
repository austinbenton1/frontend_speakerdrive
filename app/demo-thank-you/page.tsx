"use client"
import { HeaderFinal } from "@/components/layout/HeaderFinal";
import { Footer5 } from "@/components/layout/Footer";
import { useState } from "react";

export default function ThankYouPage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <HeaderFinal
        companyName="SpeakerDrive"
        logo={
          <img
            src="/SpeakerDrive Logo - Long.png"
            alt="SpeakerDrive"
            className="h-8"
          />
        }
      />
      
      <main className="pt-24">
        <section className="relative bg-white py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4">
                ✅ Booking Confirmed
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thanks for scheduling time with me! Check your email for the calendar invite.
              </p>
            </div>
            
            {/* Enhanced Video Section */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <h3 className="text-center text-xl font-semibold text-gray-800 mb-4">
                  🎥 I recorded a quick message for you!
                </h3>
                
                <div className="relative group">
                  {/* Animated border */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-20 blur-sm group-hover:opacity-30 transition-opacity"></div>
                  
                  <div className="relative">
                    <video 
                      id="thankYouVideo"
                      controls 
                      className="w-full rounded-lg shadow-xl cursor-pointer"
                      onPlay={() => setVideoPlaying(true)}
                      onPause={() => setVideoPlaying(false)}
                      onClick={(e) => {
                        if (!videoPlaying) {
                          e.currentTarget.play();
                        }
                      }}
                    >
                      <source 
                        src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/68cd28bc30c73317749d082b.mp4" 
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Play button overlay - only shows when video is paused */}
                    {!videoPlaying && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg cursor-pointer hover:bg-opacity-10 transition-all"
                        onClick={() => {
                          (document.getElementById('thankYouVideo') as HTMLVideoElement)?.play();
                        }}
                      >
                        <div className="bg-white rounded-full p-5 shadow-2xl transform hover:scale-110 transition-transform">
                          <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Section - Gradient Box */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
                <h2 className="text-2xl font-bold mb-3">Ready to fill your calendar?</h2>
                <p className="mb-6 opacity-90">
                  Find Events And Get Booked To Speak
                </p>
                
                <a 
                  href="https://app.speakerdrive.com/signup"
                  className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-all duration-200"
                >
                  🚀 Start Free Trial
                </a>
                
                <p className="mt-4 text-sm opacity-75">
                  No credit card needed • Full access • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer5 />
    </div>
  );
}