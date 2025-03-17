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
            Message Composer 
          </h2>
          
          {/* Opening paragraph */}
          <div className="max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              We meticulously cross-reference your expertise, event specifics, and decision-maker priorities to craft conversation-starting messages that get responses.
            </p>
          </div>
        </motion.div>
        
        {/* Main formula graphic - Modified to ensure elements fit on one row */}
        <div className="relative mb-0 mt-12">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/80 via-blue-50/50 to-white/80 rounded-md -z-10 shadow-md"></div>
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-8 rounded-md">
            {/* Element 1 */}
            <div className="w-full lg:w-[30%] bg-white rounded-sm p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 h-full">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-blue-100 rounded-full">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Your Unique Expertise</h4>
                  <p className="text-sm text-gray-600 mt-1">Your skills and background</p>
                </div>
              </div>
            </div>
            
            {/* Connecting arrow - enhanced with animation - CHANGED TO BIDIRECTIONAL */}
            <div className="flex justify-center items-center">
              <motion.div 
                className="bg-white rounded-full p-2 shadow-md transform rotate-90 lg:rotate-0"
                animate={arrowAnimation}
              >
                <ArrowLeftRight className="h-6 w-6 text-blue-500" />
              </motion.div>
            </div>
            
            {/* Element 2 */}
            <div className="w-full lg:w-[30%] bg-white rounded-sm p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 h-full">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-blue-100 rounded-full">
                  <FileText className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Event Details</h4>
                  <p className="text-sm text-gray-600 mt-1">Specific info about the event</p>
                </div>
              </div>
            </div>
            
            {/* Connecting arrow - enhanced with animation - CHANGED TO BIDIRECTIONAL */}
            <div className="flex justify-center items-center">
              <motion.div 
                className="bg-white rounded-full p-2 shadow-md transform rotate-90 lg:rotate-0"
                animate={arrowAnimation}
              >
                <ArrowLeftRight className="h-6 w-6 text-blue-500" />
              </motion.div>
            </div>
            
            {/* Element 3 */}
            <div className="w-full lg:w-[30%] bg-white rounded-sm p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 h-full">
              <div className="flex items-start space-x-3">
                <div className="p-2.5 bg-blue-100 rounded-full">
                  <Zap className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">Decision-Maker</h4>
                  <p className="text-sm text-gray-600 mt-1">What matters most</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Down arrow to result - This now points to the MessageComposer component */}
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
      </div>
    </section>
  );
}