"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type MorphingDialogContextType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transition?: any;
};

const MorphingDialogContext = createContext<MorphingDialogContextType | null>(null);

function useMorphingDialogContext() {
  const context = useContext(MorphingDialogContext);
  if (!context) {
    throw new Error('useMorphingDialogContext must be used within a MorphingDialog');
  }
  return context;
}

export function MorphingDialog({ 
  children, 
  transition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  }
}: { 
  children: React.ReactNode;
  transition?: any;
}) {
  const [open, setOpen] = useState(false);

  return (
    <MorphingDialogContext.Provider value={{ open, setOpen, transition }}>
      {children}
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({ 
  children,
  className,
  style,
}: { 
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { setOpen } = useMorphingDialogContext();

  return (
    <div
      onClick={() => setOpen(true)}
      className={cn("cursor-pointer", className)}
      style={style}
    >
      {children}
    </div>
  );
}

export function MorphingDialogContainer({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = useMorphingDialogContext();

  // Better implementation for backdrop click to close
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          {/* Backdrop - clicking this will close the dialog */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={closeDialog}
            aria-hidden="true"
          />
          
          {/* Dialog content wrapper - preventing the click from propagating to backdrop */}
          <div 
            className="relative z-50 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { transition, setOpen } = useMorphingDialogContext();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [setOpen]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={transition}
      className={cn("relative", className)}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h3
      layoutId="title"
      className={cn("text-lg font-medium", className)}
    >
      {children}
    </motion.h3>
  );
}

export function MorphingDialogSubtitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      layoutId="subtitle"
      className={cn("text-sm", className)}
    >
      {children}
    </motion.p>
  );
}

export function MorphingDialogImage({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.img
      layoutId="image"
      src={src}
      alt={alt}
      className={className}
      style={style}
    />
  );
}

export function MorphingDialogClose({
  className,
}: {
  className?: string;
}) {
  const { setOpen } = useMorphingDialogContext();

  return (
    <button
      onClick={() => setOpen(false)}
      className={cn("absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100", className)}
      aria-label="Close dialog"
    >
      <X size={20} />
    </button>
  );
}