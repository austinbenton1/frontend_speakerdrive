"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

interface TransitionPanelProps {
  children: React.ReactNode[];
  activeIndex: number;
  className?: string;
  variants?: any;
  transition?: any;
  custom?: any;
}

export function TransitionPanel({
  children,
  activeIndex,
  className,
  variants,
  transition,
  custom,
}: TransitionPanelProps) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence custom={custom} mode="wait" initial={false}>
        <motion.div
          key={activeIndex}
          custom={custom}
          variants={variants}
          initial="enter"
          animate="center"
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