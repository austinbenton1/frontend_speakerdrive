"use client";
import { motion } from "framer-motion";
import { Search, Mail, Phone, Building2, BrainCircuit, Sparkles } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogImage,
  MorphingDialogContainer,
  MorphingDialogClose,
} from "@/components/core/morphing-dialog";

const tools = {
  ai: [
    {
      title: "Ask SpeakerDrive",
      description: "Get instant, AI-powered prospecting insights.",
      icon: <BrainCircuit className="h-6 w-6" />,
      image: "/Ask SpeakerDrive.png",
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Instant Intel",
      description: "AI-powered research and insights about opportunities.",
      icon: <Sparkles className="h-6 w-6" />,
      image: "/Instant Intel.png",
      gradient: "from-purple-500 to-purple-600"
    }
  ],
  contact: [
    {
      title: "Email Finder",
      description: "Find verified email addresses for decision-makers.",
      icon: <Mail className="h-6 w-6" />,
      image: "/Email Finder.png",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Mobile Finder", 
      description: "Get direct mobile numbers for key contacts.",
      icon: <Phone className="h-6 w-6" />,
      image: "/Mobile Finder.png",
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Company Research",
      description: "Research and verify company information.",
      icon: <Building2 className="h-6 w-6" />,
      image: "/Company Finder.png",
      gradient: "from-purple-500 to-purple-600"
    }
  ]
};

export function ToolsSection() {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            Tools You'll Actually Use
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Powerful tools to help you find and connect with the right people, faster.
          </p>
        </div>

        {/* AI Tools Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            AI Assistance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tools.ai.map((tool, index) => (
              <MorphingDialog key={tool.title}>
                <MorphingDialogTrigger>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-5 mb-6">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${tool.gradient} text-white shadow-md`}>
                          {tool.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{tool.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg">{tool.description}</p>
                    </div>
                  </motion.div>
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative w-[800px] max-w-[95vw] bg-white rounded-xl overflow-hidden">
                    <MorphingDialogClose className="absolute top-4 right-4 z-10" />
                    <MorphingDialogImage
                      src={tool.image}
                      alt={tool.title}
                      className="w-full h-auto"
                    />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            ))}
          </div>
        </div>

        {/* Contact Tools Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Contact Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tools.contact.map((tool, index) => (
              <MorphingDialog key={tool.title}>
                <MorphingDialogTrigger>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                  >
                    <div className="p-8">
                      <div className="flex items-center gap-5 mb-6">
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${tool.gradient} text-white shadow-md`}>
                          {tool.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{tool.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg">{tool.description}</p>
                    </div>
                  </motion.div>
                </MorphingDialogTrigger>

                <MorphingDialogContainer>
                  <MorphingDialogContent className="relative w-[800px] max-w-[95vw] bg-white rounded-xl overflow-hidden">
                    <MorphingDialogClose className="absolute top-4 right-4 z-10" />
                    <MorphingDialogImage
                      src={tool.image}
                      alt={tool.title}
                      className="w-full h-auto"
                    />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}