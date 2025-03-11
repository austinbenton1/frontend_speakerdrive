"use client";

import { ArrowRight, ChevronLeftIcon, ChevronRightIcon, ArrowDownIcon, ExternalLinkIcon, MaximizeIcon, ArrowUpRightIcon, Mail, Link, AtSign } from 'lucide-react';
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TextEffect } from "@/components/ui/text-effect";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogContainer,
  MorphingDialogClose,
} from '@/components/core/morphing-dialog';
import { ScrollArea } from '@/components/website/scroll-area';
import { TransitionPanel } from '@/components/motion-ui/transition-panel';
import { cn } from '@/lib/utils';
import { VideoCard } from '@/components/ui/VideoCard';

const SPEAKER_TYPES = [
  {
    title: 'Keynote Speakers',
    image: '/Keynote Speaker.png',
    description: 'Find more main-stage opportunities and command higher fees'
  },
  {
    title: 'Coaches',
    image: '/Coach.png',
    description: 'Discover organizations actively seeking coaching expertise'
  },
  {
    title: 'Trainer / Facilitators',
    image: '/Trainer Facilitator.png',
    description: 'Fill your calendar with workshops that value your expertise'
  },
  {
    title: 'Consultants',
    image: '/Consultant.png',
    description: 'Connect with clients looking for your specialized consulting solutions'
  },
  {
    title: 'Thought Leaders',
    image: '/Expert Thought Leader.png',
    description: 'Locate platforms eager to showcase your innovative ideas'
  },
];

// Sample morphing dialog items 
const SAMPLE_ITEMS = [
  {
    title: "BCCC Corporate Citizenship Conference",
    subtitle: "Boston College",
    image: "/BCCC.png",
    previewImage: "/1_BCCC.png",
    description: "**At A Glance**\nThe BCCC International Corporate Citizenship Conference addresses corporate social responsibility and sustainability strategies for impactful business practices.\n\n**Target Audience**\nCorporate Social Responsibility Executives, Sustainability Practitioners, Corporate Citizenship Professionals\n\n**Best For**\nSpeakers and consultants specializing in corporate social responsibility. Best for industry leaders seeking practical insights – driving community engagement through responsible business.",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb4c1f4667ee1496ac6413.mp4"
  },
  {
    title: "2025 BOMA Winter Issues Forum",
    subtitle: "BOMA International",
    image: "/2025 BOMA Winter Issues Forum-mh.png",
    previewImage: "/2_BOMA.png",
    description: "**At A Glance**\nThe BOMA Winter Issues Forum brings together building owners, managers, and facility professionals to discuss pressing industry challenges and innovative solutions.\n\n**Target Audience**\nCommercial Real Estate Executives, Building Owners, Property Managers, Facility Management Professionals\n\n**Best For**\nIndustry experts specializing in commercial real estate, sustainability, smart buildings, and property management trends. Ideal for those focused on practical applications that generate ROI.",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb4b93b8ead34edd309e56.mp4"
  },
  {
    title: "FactRight Due Diligence Conference",
    subtitle: "FactRight",
    image: "/FactRight.png",
    previewImage: "/3_FactRight.png",
    description: "**At A Glance**\nThe FactRight Due Diligence Conference focuses on enhancing due diligence practices in alternative investments for investment management professionals.\n\n**Target Audience**\nWealth Managers, Registered Investment Advisors, Investment Advisors\n\n**Best For**\nWealth managers and investment advisors specializing in alternative investments. Best for those seeking to deepen due diligence skills within investment management.",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb5698b96946edd23833cb.mp4"
  },
  {
    title: "Forth Roadmap Conference",
    subtitle: "Forth",
    image: "/Forth Roadmap Conference-mh.png",
    previewImage: "/4_Forth.png",
    description: "**At A Glance**\nThe Forth Roadmap Conference 2025 focuses on advancing electric transportation by fostering collaborative dialogue among industry leaders, policymakers, and community advocates.\n\n**Target Audience**\nElectric Vehicle Industry Leaders, Policymakers in Transportation, Charging Infrastructure Providers\n\n**Best For**\nSpeakers and facilitators specializing in electric vehicle technology and public policy. Best for those passionate about equity and sustainable mobility solutions.",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb59ce54acb49abdd5369a.mp4"
  },
  {
    title: "Identiverse 2025",
    subtitle: "CyberRisk Alliance",
    image: "/Identiverse 2025-mh.png",
    previewImage: "/5_Identiverse.png",
    description: "**At A Glance**\nIdentiverse 2025 is a premier conference dedicated to advancing identity security and fostering discussions among industry professionals on critical identity management themes.\n\n**Target Audience**\nCompliance and Risk Management Professionals, Development and Engineering Experts, Privacy and Data Protection Professionals, Security Operations and Analysts, Identity and Security Architects\n\n**Best For**\nExperts and consultants specializing in identity security and data protection. Best for professionals focused on practical solutions - enhancing compliance and risk management practices.",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb52d7def776eaa4befddc.mp4"
  },
  {
    title: "REimagine! 2025",
    subtitle: "California Association of REALTORS",
    image: "/REimagine! 2025-mh.png",
    previewImage: "/6_REimagine.png",
    description: "**At A Glance**\nThe REimagine! 2025 Conference & Expo explores innovative solutions and educational strategies for real estate professionals and tech-driven social impact leaders.\n\n**Target Audience**\nReal Estate Professionals, Tech-Driven Nonprofit Leaders, Social Impact Professionals\n\n**Best For**\nSpeakers and consultants specializing in real estate and social impact. Best for those focused on integrating technology and social responsibility into practice.",
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cb4fd9fef41b1e5cfda728.mp4"
  }
];

// Helper function to format description with bold categories
const formatDescription = (description: string) => {
  if (!description.includes('**')) {
    return <p className="text-left">{description}</p>;
  }
  
  // Split by line breaks to process each paragraph
  const paragraphs = description.split('\n\n');
  
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        // Check if paragraph contains a bold section (marked with **)
        if (paragraph.includes('**')) {
          const parts = paragraph.split('**');
          if (parts.length >= 3) {
            return (
              <div key={index} className="mb-3 text-left">
                <p><strong className="font-bold">{parts[1]}</strong></p>
                <p>{parts[2]}</p>
              </div>
            );
          }
        }
        
        // Regular paragraph
        return <p key={index} className="mb-3 text-left">{paragraph}</p>;
      })}
    </>
  );
};

// Contact Info Feature panel data
const CONTACT_FEATURES = [
  {
    title: 'Contact Emails',
    description: 'Find direct emails for key decision-makers at organizations you want to speak for.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf43363da759182090e12d.mp4",
    icon: <Mail className="mr-2 h-5 w-5" />,
    gradient: "from-brand-blue to-blue-500"
  },
  {
    title: 'Event Emails',
    description: 'Get access to validated event and conference email addresses for easier outreach.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf408504d6597dbd3827ef.mp4",
    icon: <AtSign className="mr-2 h-5 w-5" />,
    gradient: "from-green-500 to-emerald-400"
  },
  {
    title: 'Event URLs',
    description: 'Find direct links to application forms and speaker submission portals.',
    video: "https://storage.googleapis.com/msgsndr/TT6h28gNIZXvItU0Dzmk/media/67cf4b3d7be80c24c3f0aa65.mp4",
    icon: <Link className="mr-2 h-5 w-5" />,
    gradient: "from-green-500 to-emerald-400"
  },
];

// Contact Feature Panel Component
function ContactFeaturePanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  return (
    <div className='overflow-auto py-16 sm:overflow-hidden'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <h2 className='mb-8 text-center text-3xl text-zinc-900 sm:text-4xl font-bold'>
          The SpeakerDrive Message Composer
        </h2>
        <div className='mb-10 overflow-x-auto [scrollbar-width:none]'>
          <div className='flex min-w-max items-center justify-center space-x-5'>
            {CONTACT_FEATURES.map((feature, index) => {
              return (
                <button
                  key={index}
                  type='button'
                  onClick={() => {
                    setActiveIndex(index);
                    setDirection(index > activeIndex ? 1 : -1);
                  }}
                  className={cn(
                    'relative rounded-lg px-5 py-3 text-base font-medium transition-all duration-200',
                    'transform hover:-translate-y-1 active:translate-y-0',
                    'cursor-pointer flex items-center justify-center gap-1.5',
                    'ring-offset-2 focus:outline-none focus:ring-2 focus:ring-brand-blue',
                    'my-2',
                    index === activeIndex
                      ? `bg-gradient-to-r ${feature.gradient} text-white shadow-md shadow-${feature.gradient.split(" ")[0].replace("from-", "")}/20`
                      : 'bg-white text-gray-800 hover:bg-gray-50 shadow-sm hover:shadow-md'
                  )}
                >
                  {feature.icon}
                  {feature.title}
                  {index === activeIndex ? (
                    <CheckCircleIcon className="ml-2 h-4 w-4" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4 opacity-70" />
                  )}
                  
                  {index === activeIndex && (
                    <motion.span 
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.gradient} opacity-20 -z-10`}
                      layoutId="highlight"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <TransitionPanel
          className='aspect-video w-[800px] max-w-full overflow-hidden rounded-xl border border-brand-blue/30 shadow-lg'
          activeIndex={activeIndex}
          custom={direction}
          transition={{
            ease: 'easeOut',
            duration: 0.3,
          }}
          variants={{
            enter: (direction: number) => ({
              x: direction > 0 ? 32 : -32,
              opacity: 0.8,
            }),
            center: {
              x: 0,
              opacity: 1,
            },
            exit: (direction: number) => ({
              x: direction < 0 ? 32 : -32,
              opacity: 0.8,
            }),
          }}
        >
          {CONTACT_FEATURES.map((feature, index) => (
            <div
              className='relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl'
              key={feature.title}
            >
              {feature.video ? (
                <div className="w-full h-full overflow-hidden relative">
                  {/* Decorative gradient overlay to provide a subtle effect */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${index === 0 ? 'from-brand-blue/5' : 'from-green-500/5'} to-transparent z-10 pointer-events-none`}></div>
                  
                  {/* Video element with object-cover to fill the space */}
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={feature.video} type="video/mp4" />
                    <p>Your browser doesn't support HTML5 video.</p>
                  </video>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-blue-100 z-0"></div>
                  <div className="relative z-10 p-8 max-w-xl">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-lg text-gray-700">{feature.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </TransitionPanel>
      </div>
    </div>
  );
}

export function ProspectingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true,
    amount: 0.3
  });
  
  // Set triggerAnimation to true by default instead of depending on isInView
  const [triggerAnimation, setTriggerAnimation] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  
  // State for managing the VideoCard dialog
  const [isVideoCardDialogOpen, setIsVideoCardDialogOpen] = useState(false);
  
  // How many cards to show at once based on screen width
  const [cardsToShow, setCardsToShow] = useState(3);
  
  // Update cards to show based on window width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate the maximum index based on number of cards and how many to show
  // Now using SPEAKER_TYPES.length - 1 to allow navigating to see the very last item
  const maxIndex = SPEAKER_TYPES.length - 1;

  // Navigation functions
  const goToPrev = () => setActiveIndex(prev => Math.max(0, prev - 1));
  const goToNext = () => setActiveIndex(prev => Math.min(maxIndex, prev + 1));

  // Fixed card width instead of distributing across viewport
  const getCardWidth = () => {
    // Increased sizes for all breakpoints by ~10%
    if (windowWidth < 640) {
      return windowWidth * 0.95;
    } else if (windowWidth < 1024) {
      return 270; // Increased from 250
    } else {
      return 330; // Increased from 300
    }
  };

  // Calculate the transform for carousel with right margin limited to container
  const getTransform = () => {
    if (!carouselRef.current) return '0px';
    
    const cardWidth = getCardWidth();
    const cardGap = 15; // Reduced from 20 to bring items closer together
    
    // Maximum content width (same as container max-width)
    const maxContentWidth = 1200;
    const actualContentWidth = Math.min(maxContentWidth, windowWidth - 40);
    
    // Calculate starting position to place first card at 1/5 from the left edge (moved left)
    const startPosition = windowWidth / 5;
    
    // Adjust position based on index
    const indexOffset = activeIndex * (cardWidth + cardGap);
    
    return `${startPosition - indexOffset}px`;
  };

  return (
    <div className="bg-white pt-10 pb-0 sm:pt-12 sm:pb-0" ref={sectionRef}>
      {/* Centered container for headings */}
      <div className="container mx-auto max-w-4xl text-center px-4 mb-8">
        {/* Animated Headline - First Line */}
        <div className="relative mb-4">
          <div className="absolute -z-10 inset-0 bg-gradient-to-r from-transparent via-brand-blue/5 to-transparent blur-lg" />
          <div className="text-center text-3xl sm:text-5xl font-extrabold text-black max-w-3xl mx-auto">
            <TextEffect
              as="span"
              className="inline"
              speedReveal={1.2}
              speedSegment={0.6}
              delay={0.2}
              per="word"
              trigger={triggerAnimation}
            >
              We Dig For
            </TextEffect>{" "}
            <TextEffect
              as="span"
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600"
              speedReveal={1.2}
              speedSegment={0.6}
              delay={0.4}
              per="char"
              trigger={triggerAnimation}
            >
              Gold
            </TextEffect>
          </div>
        </div>

        {/* Animated Headline - Second Line */}
        <div className="relative mb-6">
          <TextEffect
            as="h2"
            className="text-balance text-center text-3xl sm:text-5xl font-extrabold text-black max-w-3xl mx-auto"
            speedReveal={1.2}
            speedSegment={0.6}
            delay={0.5}
            per="word"
            trigger={triggerAnimation}
          >
            So You Don't Have To
          </TextEffect>
        </div>

        {/* Subheading - Reduced width with max-w-lg instead of max-w-2xl */}
        <motion.p 
          className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-lg mx-auto mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SpeakerDrive is the go-to prospecting database, built exclusively for experts like you.
        </motion.p>
        
        {/* Conference Grid with Images - Three rows of two */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6">
          {SAMPLE_ITEMS.map((item, index) => (
            <MorphingDialog
              key={index}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 24,
              }}
            >
              <MorphingDialogTrigger
                className='group relative cursor-pointer overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white'
              >
                {/* Container with moderate padding */}
                <div className="w-full aspect-[4/3] overflow-hidden p-0">
                  <img 
                    src={item.previewImage} 
                    alt={item.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Hover overlay with subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-xs text-white/90">{item.subtitle}</p>
                  </div>
                </div>
              </MorphingDialogTrigger>
              <MorphingDialogContainer>
                <MorphingDialogContent
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    maxHeight: '85vh',
                  }}
                  className='relative w-[500px] bg-white my-8'
                >
                  <MorphingDialogClose className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md" />
                  
                  {item.video ? (
                    <div className="flex flex-col max-h-[85vh]">
                      {/* Video with no padding/margin for edge-to-edge appearance */}
                      <div className="w-full">
                        <video
                          className="w-full h-auto"
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src={item.video} type="video/mp4" />
                          <p>Your browser doesn't support HTML5 video.</p>
                        </video>
                      </div>
                      
                      {/* Content below the video with padding */}
                      <ScrollArea className='max-h-[40vh] overflow-y-auto' type='scroll'>
                        <div className='p-6'>
                          <div className='mb-4 text-left'>
                            <MorphingDialogTitle className='text-2xl font-bold text-black text-left'>
                              {item.title}
                            </MorphingDialogTitle>
                            <MorphingDialogSubtitle className='font-medium text-gray-500 text-lg text-left'>
                              {item.subtitle}
                            </MorphingDialogSubtitle>
                          </div>
                          <div className='text-base text-gray-700'>
                            {formatDescription(item.description)}
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  ) : (
                    <ScrollArea className='max-h-[85vh] overflow-y-auto' type='scroll'>
                      <div className='relative p-6'>
                        <div className='flex justify-center py-10'>
                          <MorphingDialogImage
                            src={item.image}
                            alt={item.title}
                            className='h-auto w-[300px] object-contain'
                          />
                        </div>
                        <div className='text-left'>
                          <MorphingDialogTitle className='text-2xl font-bold text-black text-left'>
                            {item.title}
                          </MorphingDialogTitle>
                          <MorphingDialogSubtitle className='font-medium text-gray-500 text-lg text-left'>
                            {item.subtitle}
                          </MorphingDialogSubtitle>
                          <div className='mt-4 text-base text-gray-700'>
                            {formatDescription(item.description)}
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                  )}
                </MorphingDialogContent>
              </MorphingDialogContainer>
            </MorphingDialog>
          ))}
        </div>
        
        {/* Insert the Contact Feature Panel here */}
        <div className="mt-24">
          <ContactFeaturePanel />
        </div>
        
        {/* Visual separator between sections */}
        <div className="mt-24 mb-12 relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="flex justify-center">
            <div className="bg-white px-6 py-1 relative -top-3 rounded-full border border-gray-200">
              <span className="text-gray-500 text-sm font-medium">Who We Serve</span>
            </div>
          </div>
        </div>
        
        {/* "SpeakerDrive is Perfect For" headline - moved after the paragraph */}
        <div className="relative mb-2">
          <TextEffect
            as="h2"
            className="text-balance text-center text-3xl sm:text-4xl font-extrabold text-black max-w-3xl mx-auto"
            speedReveal={1.2}
            speedSegment={0.6}
            delay={1.2}
            per="word"
            trigger={triggerAnimation}
          >
            SpeakerDrive is Perfect For...
          </TextEffect>
        </div>
        
        {/* New subheadline text - Updated to match "SpeakerDrive is the go-to..." styling */}
        <motion.p 
          className="text-base tracking-wide font-medium text-neutral-700 sm:text-xl max-w-2xl mx-auto mt-4 mb-8"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SpeakerDrive helps professionals who speak, train, and consult take control of their business development.
        </motion.p>
      </div>

      {/* Speaker Types Controls Section - removed the heading */}
      <div className="text-center">
        <div className="flex justify-center space-x-4 relative">
          {/* Left arrow without animation */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md disabled:opacity-30"
            onClick={goToPrev}
            disabled={activeIndex === 0}
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          {/* Right arrow with animation when there's more content */}
          <div className="relative">
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md ${activeIndex < maxIndex ? 'animate-bob arrow-hint-right' : ''} disabled:opacity-30`}
              onClick={goToNext}
              disabled={activeIndex >= maxIndex}
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
            
            {/* Only show scroll indicator when there's more to see - positioned much farther right */}
            {activeIndex < maxIndex && (
              <div className="absolute left-full ml-16 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500 whitespace-nowrap animate-pulse flex items-center">
                <span className="mr-1">More</span>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Carousel container with max-width matching the main container */}
      <div className="w-full overflow-hidden mt-6">
        <div className="relative mx-auto max-w-screen-lg">
          <motion.div 
            ref={carouselRef}
            className="flex"
            animate={{ 
              x: getTransform() 
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            {SPEAKER_TYPES.map((type, idx) => (
              <motion.div
                key={idx}
                className="flex-shrink-0 pb-4"
                style={{ 
                  width: `${getCardWidth()}px`,
                  marginRight: '15px' // Reduced from 20px to bring items closer
                }}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="px-2 flex flex-col h-full">
                  {/* Shorter container height with fixed aspect ratio for the image */}
                  <div className="h-56 sm:h-[18rem] md:h-[20rem] flex items-center justify-center p-6 bg-white">
                    {/* Different styling based on image type with smaller scale */}
                    {type.title === 'Coaches' && (
                      <img
                        src={type.image}
                        alt={type.title}
                        className="max-h-full w-auto object-contain object-top"
                        style={{ transform: 'scale(0.85)' }} 
                      />
                    )}
                    {type.title === 'Consultants' && (
                      <img
                        src={type.image}
                        alt={type.title}
                        className="max-h-full w-auto object-contain object-top"
                        style={{ transform: 'scale(0.85)' }}
                      />
                    )}
                    {type.title === 'Thought Leaders' && (
                      <img
                        src={type.image}
                        alt={type.title}
                        className="max-h-full w-auto object-contain object-top"
                        style={{ transform: 'scale(0.85)' }}
                      />
                    )}
                    {type.title === 'Keynote Speakers' && (
                      <img
                        src={type.image}
                        alt={type.title}
                        className="max-h-full w-auto object-contain"
                        style={{ transform: 'scale(0.85)' }}
                      />
                    )}
                    {type.title === 'Trainer / Facilitators' && (
                      <img
                        src={type.image}
                        alt={type.title}
                        className="max-h-full w-auto object-contain"
                        style={{ transform: 'scale(0.85)' }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Add CSS animation styles */}
      <style jsx global>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        .animate-bob {
          animation: bob 2s ease-in-out infinite;
        }
        
        @keyframes hint-right {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(3px); }
        }
        
        .arrow-hint-right {
          animation: hint-right 1.5s ease-in-out infinite;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          background-color: #f3f4f6;
        }
      `}</style>
      
      {/* Visual transition connector to Referral Trap section - now with positive gradient and copy */}
      <div className="bg-white pt-8 pb-10"> 
        <div className="container mx-auto max-w-4xl px-4 flex flex-col items-center">
          {/* New positive message with custom styling and glow */}
          <div className="text-center mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-blue-50/20 to-transparent rounded-xl -z-10"></div>
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6"
            >
              <h3 className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-xl md:text-2xl font-bold mb-3">
                These opportunities are out there waiting for you.
              </h3>
              <p className="text-lg text-gray-700">
                So why are so many talented experts still struggling to fill their calendars?
              </p>
            </motion.div>
          </div>
          
          {/* Visual transition elements - gradient from blue to red */}
          <div className="flex flex-col items-center">
            <div className="h-24 w-1 bg-gradient-to-b from-brand-blue/50 to-red-300/70"></div>
            
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 my-3">
              <ArrowDownIcon className="h-5 w-5 text-red-600" />
            </div>
            
            <div className="h-8 w-px bg-gradient-to-b from-red-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import for the CheckCircleIcon component
import { Check as CheckCircleIcon } from "lucide-react";