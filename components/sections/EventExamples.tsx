"use client";
import { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventDetails {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  video?: string;
  description: string;
  feeRange: string;
  feeDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  registrationDescription: string;
  feeDescription: string;
}

const EVENTS: EventDetails[] = [
  {
    id: "bccc",
    title: "BCCC Corporate Citizenship Conference",
    subtitle: "Boston College",
    image: "/1_BCCC.png",
    logo: "/BCCC.png",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d1d057a50ee1ce3b7474ee.mp4",
    description: "The BCCC International Corporate Citizenship Conference addresses corporate social responsibility and sustainability strategies for impactful business practices.",
    feeRange: "$7,500-$20,000",
    feeDescription: "Registration fees align with established CSR conferences. Historical speaker compensation reflects support for recognized leaders. Prestigious venue and prominent past speakers suggest elevated expectations."
  },
  {
    id: "boma",
    title: "2025 BOMA Winter Issues Forum",
    subtitle: "BOMA International",
    logo: "/2_BOMA.png",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d1d0573d10882a1be1713b.mp4",
    description: "The BOMA Winter Issues Forum brings together building owners, managers, and facility professionals to discuss pressing industry challenges and innovative solutions.",
    feeRange: "$3,000-$8,000",
    feeDescription: "Registration fee suggests strong interest in content focused on legislative issues. Historical attendance patterns reveal significant participation rates from industry leaders."
  },
  {
    id: "factright",
    title: "FactRight Due Diligence Conference",
    subtitle: "FactRight",
    logo: "/3_FactRight.png",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d1d0575e098b2e1063b246.mp4",
    description: "The FactRight Due Diligence Conference focuses on enhancing due diligence practices in alternative investments for investment management professionals.",
    feeRange: "$7,500-$12,500",
    feeDescription: "Registration indicates significant investment in expert content. Premium venue suggests higher budget capacity. Historical patterns show previous speakers command similar compensation."
  },
  {
    id: "forth",
    title: "Forth Roadmap Conference",
    subtitle: "Forth",
    logo: "/4_Forth.png",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d1d0575e098b2d1e63b247.mp4",
    description: "The Forth Roadmap Conference 2025 focuses on advancing electric transportation by fostering collaborative dialogue among industry leaders, policymakers, and community advocates.",
    feeRange: "$5,000-$10,000",
    feeDescription: "Registration fees reflect commitment to expert-led sessions. Past speaker compensation aligns with industry standards for sustainability and transportation technology events."
  },
  {
    id: "identiverse",
    title: "Identiverse 2025",
    subtitle: "CyberRisk Alliance",
    logo: "/5_Identiverse.png",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d1d0575e098b2d1e63b247.mp4",
    feeRange: "$8,000-$15,000",
    description: "Premium registration fees indicate high-value technical content. Venue and historical compensation data suggest strong investment in expert speakers.",
    feeDescription: "Premium registration fees indicate high-value technical content. Venue and historical compensation data suggest strong investment in expert speakers."
  },
  {
    id: "reimagine",
    title: "REimagine! 2025",
    subtitle: "California Association of REALTORS",
    logo: "/6_REimagine.png",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d1d0576028548dffbd5a3a.mp4",
    description: "The REimagine! 2025 Conference & Expo explores innovative solutions and educational strategies for real estate professionals and tech-driven social impact leaders.",
    feeRange: "$6,000-$12,000",
    feeDescription: "Registration fees reflect focus on high-impact content delivery. Previous speaker compensation shows strong value placed on industry expertise and thought leadership."
  }
];

export function EventExamples() {
  const [selectedEvent, setSelectedEvent] = useState<EventDetails | null>(null);

  return (
    <section className="bg-stone-50 py-16">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-black mb-4">
            We Dig For <span className="text-[#FFD700]">Gold</span>
          </h2>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-black mb-6">
            So You Don't Have To
          </h2>
          
          <p className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mb-12">
            Click below to see real examples of events in SpeakerDrive...
          </p>
        </div>

        {/* Grid of example cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Browser Window Header */}
              <div className="bg-gray-100 px-4 py-2 border-b flex items-center space-x-2">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              {/* Fee Potential Section */}
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base font-medium text-gray-600">Fee Potential</span>
                  <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <div className="flex items-center">
                    <span className="text-sm text-emerald-600 font-semibold">{event.feeRange}</span>
                    <button className="ml-1 text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{event.feeDescription}</p>
              </div>
              
              {/* Event Details */}
              <div className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg p-2">
                    <img 
                      src={event.logo} 
                      alt={event.title} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 line-clamp-1">{event.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-1">{event.subtitle}</p>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:opacity-90 transition-opacity shadow-md">
                  <span>View Example</span>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setSelectedEvent(null)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white rounded-xl shadow-xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 hover:bg-white/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="flex-1 overflow-auto">
                  {/* Video */}
                  {selectedEvent.video && (
                    <div className="aspect-video w-full bg-black">
                      <video
                        className="w-full h-full object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                      >
                        <source src={selectedEvent.video} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  {/* Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-base font-medium text-gray-600">Fee Potential</span>
                      <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <div className="flex items-center">
                        <span className="text-base text-emerald-600 font-medium">{selectedEvent.feeRange}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 flex items-center justify-center bg-gray-50 rounded-lg p-3">
                        <img 
                          src={selectedEvent.logo} 
                          alt={selectedEvent.title} 
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedEvent.title}
                        </h3>
                        <p className="text-lg text-gray-500 line-clamp-1">{selectedEvent.subtitle}</p>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <p>{selectedEvent.description}</p>
                      <p>{selectedEvent.feeDescription}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}