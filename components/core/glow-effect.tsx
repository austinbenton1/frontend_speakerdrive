"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type GlowEffectProps = {
  colors?: string[];
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static';
  blur?: 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none';
  className?: string;
  style?: React.CSSProperties;
  scale?: number;
  duration?: number;
  transition?: any;
};

const getBlurValue = (blur: string): string => {
  switch (blur) {
    case 'softest': return '10px';
    case 'soft': return '20px';
    case 'medium': return '30px';
    case 'strong': return '40px';
    case 'stronger': return '50px';
    case 'strongest': return '60px';
    case 'none': return '0px';
    default: return '30px';
  }
};

export function GlowEffect({
  colors = ['#3CB4FF', '#81DA5C', '#3CB4FF', '#81DA5C'],
  mode = 'rotate',
  blur = 'medium',
  className,
  style,
  scale = 1,
  duration = 5,
  transition,
}: GlowEffectProps) {
  const blurValue = getBlurValue(blur);

  // Create gradient background
  const gradientColors = colors.join(', ');
  const background = `linear-gradient(45deg, ${gradientColors})`;

  // Animation settings based on mode
  let animationClass = '';
  let animationStyle = {};

  switch (mode) {
    case 'rotate':
      animationClass = 'animate-spin-slow';
      break;
    case 'pulse':
      animationStyle = {
        animation: `pulse ${duration}s ease-in-out infinite`,
      };
      break;
    case 'breathe':
      animationClass = 'animate-breathe';
      break;
    case 'colorShift':
      animationClass = 'animate-color-shift';
      break;
    case 'flowHorizontal':
      animationClass = 'animate-flow-horizontal';
      break;
    case 'static':
    default:
      // No animation
      break;
  }

  return (
    <div 
      className={cn(
        "absolute inset-0",
        className
      )}
      style={{
        zIndex: 0,
        ...style
      }}
    >
      <motion.div
        className={cn("absolute top-1/2 left-1/2", animationClass)}
        style={{
          width: `${100 * scale}%`,
          height: `${100 * scale}%`,
          background,
          borderRadius: 'inherit',
          filter: `blur(${blurValue})`,
          transform: 'translate(-50%, -50%)',
          ...animationStyle
        }}
        initial={transition ? {} : undefined}
        animate={transition ? {} : undefined}
        transition={transition}
      />
    </div>
  );
}