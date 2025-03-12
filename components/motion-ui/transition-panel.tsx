"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface AnimationProps {
  animate?: any;
  transition?: any;
  variants?: any;
  custom?: any;
}

interface TransitionPanelProps {
  children: React.ReactNode[];
  activeIndex: number;
  className?: string;
  // Add animation props
  animate?: AnimationProps["animate"];
  transition?: AnimationProps["transition"];
  variants?: AnimationProps["variants"];
  custom?: AnimationProps["custom"];
}

/**
 * Renders only the active child with a simple crossfade or slide transition,
 * using AnimatePresence from framer-motion.
 */
export function TransitionPanel({
  children,
  activeIndex,
  className,
  variants,
  transition,
  custom,
  animate,
}: TransitionPanelProps) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence custom={custom}>
        <motion.div
          key={activeIndex}
          animate={animate}
          custom={custom}
          variants={variants}
          initial="enter"
          animate={animate || "center"}
          exit="exit"
          transition={transition}
          className="absolute inset-0"
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
