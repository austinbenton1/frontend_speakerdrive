'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextScrambleProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: boolean;
  onScrambleComplete?: () => void;
}

export function TextScramble({
  children,
  className,
  as: Component = 'div',
  trigger = true,
  onScrambleComplete,
}: TextScrambleProps) {
  const [text, setText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    if (trigger && !isScrambling) {
      scramble();
    }
  }, [trigger, children]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scramble = () => {
    setIsScrambling(true);
    
    let iterations = 0;
    const finalText = children;
    const maxIterations = 10;
    
    const updateText = () => {
      if (iterations >= maxIterations) {
        setText(finalText);
        setIsScrambling(false);
        if (onScrambleComplete) onScrambleComplete();
        return;
      }
      
      const progress = iterations / maxIterations;
      const newText = finalText.split('').map((char, idx) => {
        if (char === ' ') return ' ';
        
        // Increase probability of showing final character as iterations increase
        if (Math.random() < progress) {
          return char;
        }
        
        // Get a random character from the chars string
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
      setText(newText);
      iterations += 1;
      
      // Schedule next update
      timeoutRef.current = setTimeout(updateText, 50);
    };
    
    updateText();
  };

  return (
    <Component className={cn(className)}>
      {text}
    </Component>
  );
}