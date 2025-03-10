"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BarShineProps {
  className?: string;
}

export function BarShine({ className }: BarShineProps) {
  return (
    <motion.div
      className={cn(
        "absolute top-0 left-0 z-10 h-[1px] w-full bg-gradient-to-r from-transparent from-10% via-brand-blue via-30% to-transparent to-90%",
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
    />
  );
}