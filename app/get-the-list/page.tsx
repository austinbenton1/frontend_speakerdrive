"use client";

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function LandingPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [screenshotModal, setScreenshotModal] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (isPopupOpen && !videoLoaded) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function (v, i, d, a, l, y, t, c, s) {
            y='_'+d.toLowerCase();c=d+'L';if(!v[d]){v[d]={};}if(!v[c]){v[c]={};}if(!v[y]){v[y]={};}var vl='Loader',vli=v[y][vl],vsl=v[c][vl + 'Script'],vlf=v[c][vl + 'Loaded'],ve='Embed';
            if (!vsl){vsl=function(u,cb){
                if(t){cb();return;}s=i.createElement("script");s.type="text/javascript";s.async=1;s.src=u;
                if(s.readyState){s.onreadystatechange=function(){if(s.readyState==="loaded"||s.readyState=="complete"){s.onreadystatechange=null;vlf=1;cb();}};}else{s.onload=function(){vlf=1;cb();};}
                i.getElementsByTagName("head")[0].appendChild(s);
            };}
            vsl(l+'loader.min.js',function(){if(!vli){var vlc=v[c][vl];vli=new vlc();}vli.loadScript(l+'player.min.js',function(){var vec=v[d][ve];t=new vec();t.run(a);});});
        })(window, document, 'Vidalytics', 'vidalytics_embed_Uabk76NYie1QwFyi', 'https://fast.vidalytics.com/embeds/wh2tGsur/Uabk76NYie1QwFyi/');
      `;
      document.body.appendChild(script);
      setVideoLoaded(true);
    }
  }, [isPopupOpen, videoLoaded]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsPopupOpen(false);
        setScreenshotModal(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isPopupOpen || screenshotModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPopupOpen, screenshotModal]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => new Set(prev).add(index));
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="px-4 pt-12 pb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />
          
          <div className="container mx-auto max-w-5xl relative">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-black mb-6 leading-tight max-w-4xl tracking-tight">
                Here's Your List of Event Planners Booking Speakers
              </h1>

              <p className="text-xl text-gray-600 mb-10 max-w-2xl font-normal leading-relaxed">
                Browse opportunities, find good matches, reach out directly. We'll show you how.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="mr-1 group-hover:animate-bounce">📋</span>
                  <div className="text-left">
                    <div className="font-semibold uppercase tracking-wide text-base leading-tight">Get The List</div>
                    <div className="text-xs text-green-100 opacity-90">View the opportunities</div>
                  </div>
                </button>
                <a
                  href="https://app.speakerdrive.com/signup"
                  className="group inline-flex items-center gap-2 px-7 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 transform hover:-translate-y-1"
                >
                  <div className="text-left">
                    <div className="font-medium text-base leading-tight flex items-center">
                      Try SpeakerDrive Free
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                    <div className="text-xs text-gray-500">Instant access. No card needed.</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-center text-black mb-4">
              Frequently asked questions
            </h2>
            
            {/* Down Arrow */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-gray-200/20 rounded-full blur-xl"></div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  color: 'bg-green-500',
                  question: 'How is this list different from SpeakerDrive?',
                  answer: 'The list is a shared resource - great for getting started with direct outreach. SpeakerDrive has thousands of opportunities, plus the tools to turn them into booked gigs: search filters, fee estimates, 1 click AI messaging.'
                },
                {
                  color: 'bg-blue-500',
                  question: 'Why are you giving this away?',
                  answer: 'Simple: we believe in showing, not telling. Once you get a feel for the approach, we think you\'ll want to take it to the next level with SpeakerDrive\'s full database, search filters, and AI messaging tools.'
                },
                {
                  color: 'bg-purple-500',
                  question: 'What kind of results are we talking about?',
                  answer: (
                    <>
                      <span>Real speakers, real results:</span>
                      <ul className="mt-3 space-y-2 ml-4">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>First meeting booked in 3 days using SpeakerDrive <button onClick={() => setScreenshotModal({ src: '/3rd_day-mh.png', alt: 'First meeting booked in 3 days' })} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>7 minutes from outreach to booking <button onClick={() => setScreenshotModal({ src: '/7mins_meeting-mh.png', alt: '7 minutes from outreach to booking' })} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>$45K corporate training budget approved <button onClick={() => setScreenshotModal({ src: '/45k_event-mh.png', alt: '$45K corporate training budget approved' })} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>$12.5K-$15K conference keynote booked <button onClick={() => setScreenshotModal({ src: '/12k_keynote-mh.png', alt: '$12.5K-$15K conference keynote booked' })} className="text-purple-600 hover:text-purple-700 underline font-medium">[view screenshot →]</button></span>
                        </li>
                      </ul>
                      <p className="text-sm text-gray-500 mt-3 italic">*Screenshots shared with permission</p>
                      <p className="mt-3">Direct outreach means direct results.</p>
                    </>
                  )
                },
                {
                  color: 'bg-orange-500',
                  question: 'How much does it cost?',
                  answer: 'The list is free. SpeakerDrive is $99/month after a 7 day trial. 30 seconds to sign up. No credit card needed. No tricks, no contracts. One $5K speaking gig covers 4 years of membership. Do the math.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 ${faq.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-lg font-bold">?</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black mb-2">
                        {faq.question}
                      </h3>
                      {typeof faq.answer === 'string' ? (
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      ) : (
                        <div className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem/Solution + How It Works Combined Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            {/* Problem Setup */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-5xl font-bold text-black mb-6">
                Stop Waiting. Start Booking.
              </h2>
              <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
                <span className="font-semibold text-gray-900">The old way:</span> Wait for referrals. Hope for the phone to ring. Feast or famine.
              </p>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                <span className="font-semibold text-gray-900">The new way:</span> Direct access to decision-makers. <span className="font-semibold text-green-600">You're in control.</span>
              </p>
            </div>

            {/* Visual Transformation Arrow - Pointing Down */}
            <div className="flex justify-center mb-12">
              <div className="relative">
                <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="absolute -inset-1 bg-green-500/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* How It Works Title */}
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">Here's how it works</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-black">
                Three Steps to Transform Your Speaking Business
              </h3>
            </div>

            {/* Three Steps */}
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Find Your Perfect Events',
                  video: 'https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21aa6244f61209f98b0.mp4',
                  description: 'Search thousands of opportunities by industry, location, audience size, and speaking fees',
                  color: 'from-green-400 to-green-600',
                  bgColor: 'bg-green-50',
                  borderColor: 'border-green-200'
                },
                {
                  step: '2',
                  title: 'Get Decision Maker Contacts',
                  video: 'https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d21a5f250c02e2dc236c.mp4',
                  description: 'Access verified emails and LinkedIn profiles of event organizers with budgets',
                  color: 'from-blue-400 to-blue-600',
                  bgColor: 'bg-blue-50',
                  borderColor: 'border-blue-200'
                },
                {
                  step: '3',
                  title: 'Send Personalized Outreach',
                  video: 'https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d2d25922c810b65b2239ae.mp4',
                  description: 'AI crafts messages that reference specific event needs and highlight your expertise',
                  color: 'from-purple-400 to-purple-600',
                  bgColor: 'bg-purple-50',
                  borderColor: 'border-purple-200'
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  {/* Step Number with Gradient */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-xl font-bold text-black mb-3 text-center whitespace-nowrap">
                    {item.title}
                  </h4>
                  
                  {/* Video */}
                  <div className={`rounded-xl overflow-hidden shadow-md mb-4 ${item.bgColor} ${item.borderColor} border-2 group-hover:shadow-xl transition-all`}>
                    <video
                      className="w-full"
                      playsInline
                      muted
                      loop
                      autoPlay
                    >
                      <source src={item.video} type="video/mp4" />
                    </video>
                  </div>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 text-center leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <p className="text-lg text-gray-700 mb-6">
                <span className="font-semibold">The result?</span> You're in control. No more waiting. No more hoping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-1">📋</span>
                  Start with the Free List
                </button>
                <a
                  href="https://app.speakerdrive.com/signup"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                >
                  Scale with SpeakerDrive
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Perfect For Section */}
        <section className="bg-white py-16 overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="relative mb-2">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight text-black text-center max-w-3xl mx-auto">
                SpeakerDrive is Perfect&nbsp;For...
              </h2>
            </div>

            <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mb-12 text-center">
              Professional speakers & experts who deliver their expertise through keynotes, workshops, coaching, and consulting.
            </p>

            {/* Expert Types Grid with Scroll Animations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 px-4 sm:px-8">
              {[
                {
                  title: 'Keynote Speakers',
                  img: '/Keynote Speaker.png',
                  description: 'Deliver powerful stage presentations',
                  order: 'order-1 md:order-3 lg:col-span-1 lg:transform lg:scale-105'
                },
                {
                  title: 'Coaches',
                  img: '/Coach.png',
                  description: 'Guide leaders to peak performance',
                  order: 'order-2 md:order-1'
                },
                {
                  title: 'Trainers',
                  img: '/Trainer Facilitator.png',
                  description: 'Build skills through workshops',
                  order: 'order-3 md:order-2'
                },
                {
                  title: 'Consultants',
                  img: '/Consultant.png',
                  description: 'Solve complex business challenges',
                  order: 'order-4 md:order-4'
                },
                {
                  title: 'Facilitators',
                  img: '/Expert Thought Leader.png',
                  description: 'Lead transformative group sessions',
                  order: 'order-5 md:order-5'
                }
              ].map((expert, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`text-center transition-all duration-700 ${expert.order} ${
                    visibleCards.has(index)
                      ? 'opacity-100 translate-y-0 md:hover:scale-105'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="relative aspect-[3/4] mb-4 max-w-[270px] mx-auto sm:max-w-none overflow-hidden">
                    <img
                      src={expert.img}
                      alt={expert.title}
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                  </div>
                  <div className="relative p-4 rounded-lg shadow-sm bg-white">
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-500/5 via-transparent to-transparent opacity-50"></div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{expert.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed tracking-wide px-1">
                      {expert.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          
          <div className="container mx-auto max-w-4xl text-center relative">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to fill your calendar?
            </h2>
            <p className="text-xl mb-10 text-gray-300">
              Be among the first to transform your speaking business.
            </p>
            <a 
              href="https://app.speakerdrive.com/signup" 
              className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <span className="mr-2">✨</span>
              Try SpeakerDrive Free
            </a>
            <p className="text-sm text-gray-400 mt-6">
              No credit card required • Cancel anytime
            </p>
          </div>
        </section>
      </main>

      {/* Simple Thin Footer */}
      <footer className="bg-gray-900 text-gray-400 py-4 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="mb-2 sm:mb-0">© 2025 SpeakerDrive. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Video Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsPopupOpen(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] md:max-h-[90vh] overflow-hidden flex flex-col">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            {/* Scrollable content container with smooth scroll */}
            <div className="overflow-y-auto flex-1 scroll-smooth">
              {/* Title above video */}
              <div className="p-4 md:p-6 pb-2 md:pb-4 text-center bg-white">
                <h3 className="text-lg md:text-xl">
                  <strong>How To Use The List To Book Gigs</strong> (🎬 2:41 seconds)
                </h3>
              </div>
              
              {/* Video container - smaller on desktop */}
              <div className="w-full bg-gray-100 px-4 md:px-8">
                <div className="max-w-3xl mx-auto">
                  <div id="vidalytics_embed_Uabk76NYie1QwFyi" style={{ width: '100%', position: 'relative', paddingTop: '53.33%' }}></div>
                </div>
              </div>
              
              <div className="p-6 md:p-8 text-center bg-gradient-to-b from-white to-gray-50">
                <p className="text-base md:text-lg text-gray-700 mb-6">Click The Button Below To Access Your List 🎉</p>
                <a
                  href="https://airtable.com/appnizVdwMfOgz1gT/shrZIOIYhYfjQdqli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ACCESS THE LIST
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Screenshot Modal */}
      {screenshotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setScreenshotModal(null)}
          />
          
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            <button
              onClick={() => setScreenshotModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            
            <img 
              src={screenshotModal.src} 
              alt={screenshotModal.alt}
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            />
            
            <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
              {screenshotModal.alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}