"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Transition,
  Variant,
  Variants,
} from "framer-motion";
import React from "react";

export type PresetType = "blur" | "fade-in-blur" | "scale" | "fade" | "slide";
export type PerType = "word" | "char" | "line";

export type TextEffectProps = {
  /** The text to animate. */
  children: string | React.ReactNode;
  /** Split text by word, char, or line. */
  per?: PerType;
  /** Which HTML element to render, e.g. "h1", "p", "span", etc. */
  as?: keyof React.JSX.IntrinsicElements;
  /** Custom framer-motion variants, if you want more control. */
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  /** Tailwind classes or custom class name. */
  className?: string;
  /** Animation preset style. Default is now "fade-in-blur". */
  preset?: PresetType;
  /** Delay in seconds before the animation starts. */
  delay?: number;
  /** Speed factor controlling overall reveal time. Lower = slower reveal. */
  speedReveal?: number;
  /** Speed factor controlling each segment's transition. */
  speedSegment?: number;
  /** Whether to show/hide the text effect. */
  trigger?: boolean;
  /** Callbacks for animation start/end. */
  onAnimationComplete?: () => void;
  onAnimationStart?: () => void;
  /** Extra class for each segment's wrapper. */
  segmentWrapperClassName?: string;
  /** Additional transitions for the container and segments. */
  containerTransition?: Transition;
  segmentTransition?: Transition;
  style?: React.CSSProperties;
};

const defaultStaggerTimes: Record<PerType, number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

/** Basic container animation: fade in while staggering child items. */
const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

/** Basic item animation: fade in/out. */
const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Animation presets for container + items. */
const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: "blur(12px)" },
      visible: { opacity: 1, filter: "blur(0px)" },
      exit: { opacity: 0, filter: "blur(12px)" },
    },
  },
  "fade-in-blur": {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20, filter: "blur(12px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      exit: { opacity: 0, y: 20, filter: "blur(12px)" },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

/** Single segment animation component. */
const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: PerType;
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  // If splitting by char, we nest each char in a motion.span
  if (per === "char") {
    return (
      <motion.span className="inline-block whitespace-pre">
        {segment.split("").map((char, i) => (
          <motion.span
            key={`char-${i}`}
            variants={variants}
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Otherwise, entire segment is one motion.span
  const content = (
    <motion.span
      variants={variants}
      className={per === "line" ? "block" : "inline-block whitespace-pre"}
    >
      {segment}
    </motion.span>
  );

  if (!segmentWrapperClassName) return content;

  return (
    <span
      className={cn(
        per === "line" ? "block" : "inline-block",
        segmentWrapperClassName
      )}
    >
      {content}
    </span>
  );
});
AnimationComponent.displayName = "AnimationComponent";

/** Check if the text contains HTML tags */
const containsHtml = (text: string): boolean => {
  return /<[^>]*>/i.test(text);
};

/** Splits text by line, word, or preserves whitespace for char. */
const splitText = (text: string, per: PerType) => {
  // Make sure we're working with a string
  if (typeof text !== 'string') {
    return [''];
  }
  
  // If text contains HTML, treat it as a single segment to avoid breaking HTML
  if (containsHtml(text)) {
    return [text];
  }
  
  if (per === "line") return text.split("\n");
  // "word" or "char": we keep whitespace with this approach
  return text.split(/(\s+)/);
};

/** Helper to add transitions to container/item variants. */
const hasTransition = (
  variant: Variant
): variant is TargetAndTransition & { transition?: Transition } => {
  return typeof variant === "object" && variant !== null && "transition" in variant;
};

const createVariantsWithTransition = (
  baseVariants: Variants,
  transition?: Transition & { exit?: Transition }
): Variants => {
  if (!transition) return baseVariants;

  const { exit: exitTransition, ...mainTransition } = transition;

  return {
    ...baseVariants,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(hasTransition(baseVariants.visible) ? baseVariants.visible.transition : {}),
        ...mainTransition,
      },
    },
    exit: {
      ...baseVariants.exit,
      transition: {
        ...(hasTransition(baseVariants.exit) ? baseVariants.exit.transition : {}),
        ...(exitTransition || mainTransition),
        staggerDirection: -1,
      },
    },
  };
};

/**
 * The main TextEffect component that animates text by splitting
 * into line, word, or char segments and applying framer-motion transitions.
 */
export function TextEffect({
  children,
  per = "word",
  as = "p",
  variants,
  className,
  preset = "fade-in-blur", // changed default to "fade-in-blur"
  delay = 0,
  speedReveal = 1,
  speedSegment = 1,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  segmentWrapperClassName,
  containerTransition,
  segmentTransition,
  style,
}: TextEffectProps) {
  // Convert children to string safely
  const textContent = typeof children === 'string' ? children : React.isValidElement(children) 
    ? React.Children.toArray(children).map(child => 
        typeof child === 'string' ? child : ''
      ).join('')
    : '';
  
  const segments = splitText(textContent, per);
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  // Use the user's variants, or fall back to the chosen preset
  const baseVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };

  // The stagger is shortened or lengthened based on "speedReveal"
  const stagger = (defaultStaggerTimes[per] ?? 0.05) / speedReveal;
  // The segment transition duration is adjusted by "speedSegment"
  const baseDuration = 0.3 / speedSegment;

  // Merge user-provided container transitions
  const computedVariants = {
    container: createVariantsWithTransition(
      variants?.container || baseVariants.container,
      {
        staggerChildren: stagger,
        delayChildren: delay,
        ...containerTransition,
        exit: {
          staggerChildren: stagger,
          staggerDirection: -1,
        },
      }
    ),
    item: createVariantsWithTransition(variants?.item || baseVariants.item, {
      duration: baseDuration,
      ...segmentTransition,
    }),
  };

  // If children contains React elements (like spans with gradient styling),
  // use a simpler animation approach that won't try to split the content
  if (React.isValidElement(children)) {
    return (
      <AnimatePresence mode="wait">
        {trigger && (
          <MotionTag
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={computedVariants.container}
            className={className}
            onAnimationComplete={onAnimationComplete}
            onAnimationStart={onAnimationStart}
            style={style}
          >
            {/* Simply wrap the children in a motion element */}
            <motion.span variants={computedVariants.item}>
              {children}
            </motion.span>
          </MotionTag>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {trigger && (
        <MotionTag
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={computedVariants.container}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          {/* For screen readers, show entire text once, hidden visually if per!==line */}
          {per !== "line" ? <span className="sr-only">{textContent}</span> : null}

          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={computedVariants.item}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}