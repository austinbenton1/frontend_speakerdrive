"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageComparisonProps {
  children: React.ReactNode;
  className?: string;
  enableHover?: boolean;
  initialPosition?: number;
}

export function ImageComparison({
  children,
  className,
  enableHover = false,
  initialPosition = 50,
}: ImageComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  useEffect(() => {
    // Ensure initial position is set correctly
    if (containerWidth > 0) {
      const newX = (containerWidth * sliderPosition) / 100;
      x.set(newX);
    }
  }, [containerWidth, sliderPosition, x]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableHover || !containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const newPosition = (mouseX / containerRect.width) * 100;
    
    // Clamp the value between 5 and 95 to avoid hiding the slider completely
    const clampedPosition = Math.min(Math.max(newPosition, 5), 95);
    setSliderPosition(clampedPosition);
  };

  const handleDrag = (_: any, info: any) => {
    if (!containerRef.current) return;
    
    const newX = info.point.x;
    const newPosition = (newX / containerWidth) * 100;
    
    // Clamp the value between 5 and 95
    const clampedPosition = Math.min(Math.max(newPosition, 5), 95);
    setSliderPosition(clampedPosition);
  };

  // Process children to find left and right images and slider
  const leftImage = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.position === 'left'
  );
  
  const rightImage = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.props.position === 'right'
  );
  
  const slider = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && !child.props.position
  );

  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      style={{ touchAction: 'none' }}
    >
      {/* Right image (background) */}
      <div className="absolute inset-0 overflow-hidden">
        {rightImage}
      </div>
      
      {/* Left image (foreground with clip-path) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        {leftImage}
      </div>
      
      {/* Slider component */}
      <motion.div
        drag="x"
        dragConstraints={containerRef}
        dragElastic={0}
        dragMomentum={false}
        onDrag={handleDrag}
        style={{
          left: `${sliderPosition}%`,
          x: 0, // Reset x to 0 to prevent offset
          touchAction: 'none',
        }}
        className="absolute top-0 bottom-0 transform -translate-x-1/2 cursor-ew-resize"
      >
        {slider}
      </motion.div>
    </div>
  );
}

interface ImageComparisonImageProps {
  src: string;
  alt: string;
  position: 'left' | 'right';
  className?: string;
}

export function ImageComparisonImage({
  src,
  alt,
  position,
  className,
}: ImageComparisonImageProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        draggable={false}
      />
    </div>
  );
}

interface ImageComparisonSliderProps {
  className?: string;
  children?: React.ReactNode;
}

export function ImageComparisonSlider({ className, children }: ImageComparisonSliderProps) {
  return (
    <div className={cn("flex justify-center items-center h-full w-1 bg-white", className)}>
      {children || (
        <div className="h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-700"
          >
            <path 
              d="M8.5 18L3.5 12L8.5 6M15.5 6L20.5 12L15.5 18" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}