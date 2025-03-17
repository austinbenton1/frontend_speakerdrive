"use client";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ArrowLeftRight,
  Zap,
  FileText, 
  Users, 
  MessageCircle 
} from "lucide-react";

// Animation variants - simplified to reduce flashing
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const arrowAnimation = {
  x: [0, 5, 0],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

const downArrowAnimation = {
  y: [0, 5, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  }
};

export function MessageComposerFormula() {
  return (
    <section className="py-20 pb-0 bg-stone-50">
      <div className="container mx-auto px-4 max-w-6xl"> 
        {/* Main heading */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight leading-tight">
            Ultra Personalized Messaging
          </h2>
          
          {/* Opening paragraph */}
          <div className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl font-medium text-gray-700 leading-relaxed">
              Craft conversation-starting messages, and ditch the hard sales pitch.
            </p>
          </div>
        </motion.div>
        
        {/* Main formula graphic - Modified to ensure elements fit on one row */}
        <div className="relative max-w-[900px] mx-auto mt-12">
          <div className="relative px-4 pt-8">
            {/* Down arrow to result - This now points to the MessageComposer component */}
            <div className="flex justify-center mb-8">
              <div className="w-full max-w-[900px] mx-auto overflow-hidden">
                <div className="text-center py-8 bg-white">
                  <div className="inline-flex items-center mb-4">
                    <div className="w-7 h-7 mr-3 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-brand-blue" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                    Smart, Real-Time Matching
                    </h3>
                  </div>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We meticulously analyze your expertise, event specifics, and decision-maker priorities to find the perfect connection.
                  </p>
                </div>
                <video
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src="https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67d8a3ab2782387e0db8bb22.mp4" type="video/mp4" />
                  <p>Your browser doesn't support HTML5 video.</p>
                </video>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <motion.div 
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg mt-6 mb-4"
            animate={downArrowAnimation}
          >
            <ArrowRight className="transform rotate-90 h-7 w-7 text-white" />
          </motion.div>
            
          {/* Added text below arrow with MessageCircle icon */}
          <div className="text-center max-w-2xl mx-auto mb-4">
          </div>
        </div>
      </div>
    </section>
  );
}