"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  AppleMusic,
  A24,
  Pixar,
  Prada,
  Salomon,
  Sony,
  Strava,
  OpenAI,
} from "@/components/icons";

const LOGOS = [
  { Component: AppleMusic, name: "AppleMusic" },
  { Component: A24, name: "A24" },
  { Component: Pixar, name: "Pixar" },
  { Component: Prada, name: "Prada" },
  { Component: Salomon, name: "Salomon" },
  { Component: OpenAI, name: "OpenAI" },
  { Component: Sony, name: "Sony" },
  { Component: Strava, name: "Strava" },
];

export function LogoCloud() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [currentLogos, setCurrentLogos] = useState(LOGOS.slice(0, 8));

  const rotateLogs = () => {
    setCurrentLogos((prevLogos) => {
      const newLogos = [...prevLogos];
      const lastLogo = newLogos.pop()!;
      return [lastLogo, ...newLogos];
    });
  };

  useEffect(() => {
    if (!isInView) return;

    rotateLogs();

    const interval = setInterval(rotateLogs, 4000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div className="w-full" ref={containerRef}>
      <div className="mx-auto flex max-w-xl flex-col items-center justify-center space-y-6 px-6 lg:px-8">
        <div className="flex w-full flex-col items-center gap-4 space-x-2 md:flex-row">
          <div className="grid w-full grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            <AnimatePresence initial={false} mode="popLayout">
              {currentLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="relative flex h-10 w-full items-center justify-center overflow-hidden"
                >
                  <motion.div
                    initial={{ y: -40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="absolute inset-0 flex items-center justify-center"
                    key={`${logo.name}-${index}`}
                  >
                    <logo.Component className="h-full w-full max-w-[80px] text-black" />
                  </motion.div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}