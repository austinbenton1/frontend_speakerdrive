"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  HTMLMotionProps,
} from "framer-motion";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  index?: number;
  onIndexChange?: (index: number) => void;
  autoPlay?: boolean;
  interval?: number;
  loop?: boolean;
  disableDrag?: boolean;
  maxVisibleItems?: number;
  carouselItems?: number;
}

interface CarouselContextProps {
  carouselRef: React.RefObject<HTMLDivElement | null>;
  api?: {
    canScrollPrev: boolean;
    canScrollNext: boolean;
    scrollPrev: () => void;
    scrollNext: () => void;
    setIndex: (index: number) => void;
  };
  currentIndex: number;
  maxVisibleItems?: number;
  disableDrag?: boolean;
  transitionOptions?: any;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      children,
      className,
      index = 0,
      onIndexChange,
      autoPlay = false,
      interval = 5000,
      loop = false,
      disableDrag = false,
      maxVisibleItems,
      carouselItems,
      ...props
    },
    ref
  ) => {
    const carouselRef = React.useRef<HTMLDivElement | null>(null);
    const [currentIndex, setCurrentIndex] = React.useState(index);
    const [maxIndex, setMaxIndex] = React.useState(
      carouselItems ? carouselItems - 1 : 0
    );

    const handleIndexChange = React.useCallback(
      (newIndex: number) => {
        let boundedIndex = newIndex;
        if (newIndex < 0) {
          boundedIndex = loop ? maxIndex : 0;
        } else if (newIndex > maxIndex) {
          boundedIndex = loop ? 0 : maxIndex;
        }
        setCurrentIndex(boundedIndex);
        onIndexChange?.(boundedIndex);
      },
      [maxIndex, loop, onIndexChange]
    );

    React.useEffect(() => {
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }, [index]);

    React.useEffect(() => {
      if (!autoPlay) return;
      const timer = setInterval(() => {
        const nextIndex = currentIndex + 1;
        handleIndexChange(nextIndex);
      }, interval);

      return () => clearInterval(timer);
    }, [autoPlay, currentIndex, handleIndexChange, interval]);

    React.useEffect(() => {
      if (carouselItems !== undefined) {
        setMaxIndex(carouselItems - 1);
      } else if (carouselRef.current) {
        const items = carouselRef.current.querySelectorAll(
          '[role="group"][data-carousel-item]'
        );
        setMaxIndex(Math.max(0, items.length - 1));
      }
    }, [carouselItems, children]);

    const api = React.useMemo(
      () => ({
        canScrollPrev: currentIndex > 0 || loop,
        canScrollNext: currentIndex < maxIndex || loop,
        scrollPrev: () => handleIndexChange(currentIndex - 1),
        scrollNext: () => handleIndexChange(currentIndex + 1),
        setIndex: handleIndexChange,
      }),
      [currentIndex, handleIndexChange, loop, maxIndex]
    );

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          currentIndex,
          maxVisibleItems,
          disableDrag,
        }}
      >
        <div
          ref={carouselRef}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

interface CarouselContentProps
  extends Omit<HTMLMotionProps<"div">, "onDrag" | "ref"> {
  className?: string;
  transition?: any;
}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, transition, ...props }, ref) => {
    const { carouselRef, currentIndex, disableDrag } = useCarousel();
    const x = useMotionValue(0);
    const containerWidth = useMotionValue(0);
    const contentWidth = useMotionValue(0);

    // We'll combine x, containerWidth, and contentWidth to compute dragProgress
    const combinedValues = useMotionValue<[number, number, number]>([0, 0, 0]);

    React.useEffect(() => {
      const updateCombinedValues = () => {
        combinedValues.set([x.get(), containerWidth.get(), contentWidth.get()]);
      };

      const unsubscribeX = x.on("change", updateCombinedValues);
      const unsubscribeContainer = containerWidth.on("change", updateCombinedValues);
      const unsubscribeContent = contentWidth.on("change", updateCombinedValues);

      return () => {
        unsubscribeX();
        unsubscribeContainer();
        unsubscribeContent();
      };
    }, [x, containerWidth, contentWidth, combinedValues]);

    useAnimationFrame(() => {
      if (!carouselRef.current) return;
      const container = carouselRef.current;
      const content = container.querySelector('[data-carousel-content=""]');
      if (!content) return;

      containerWidth.set(container.clientWidth);
      contentWidth.set((content as HTMLElement).scrollWidth);
    });

    const baseTransition = {
      type: "spring",
      damping: 20,
      stiffness: 150,
    };
    const appliedTransition = transition || baseTransition;

    const itemWidth = React.useRef(0);

    React.useEffect(() => {
      if (!carouselRef.current) return;
      const firstItem = carouselRef.current.querySelector(
        '[role="group"][data-carousel-item]'
      );
      if (!firstItem) return;

      const computedStyle = window.getComputedStyle(firstItem as Element);
      const width =
        (firstItem as Element).clientWidth +
        parseInt(computedStyle.marginLeft || "0") +
        parseInt(computedStyle.marginRight || "0");

      itemWidth.current = width;
    }, [carouselRef]);

    React.useEffect(() => {
      if (itemWidth.current === 0) return;
      x.set(-currentIndex * itemWidth.current);
    }, [currentIndex, x]);

    return (
      <div className="overflow-hidden">
        <motion.div
          ref={ref}
          data-carousel-content=""
          drag={disableDrag ? false : "x"}
          dragConstraints={{
            left: -(contentWidth.get() - containerWidth.get()),
            right: 0,
          }}
          dragElastic={0.1}
          dragMomentum={false}
          style={{ x }}
          className={cn("flex", className)}
          transition={appliedTransition}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        data-carousel-item=""
        className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { api } = useCarousel();

    return (
      <button
        ref={ref}
        className={cn(
          "absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md",
          className
        )}
        disabled={!api?.canScrollPrev}
        onClick={() => api?.scrollPrev()}
        {...props}
      />
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<"button">>(
  ({ className, ...props }, ref) => {
    const { api } = useCarousel();

    return (
      <button
        ref={ref}
        className={cn(
          "absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md",
          className
        )}
        disabled={!api?.canScrollNext}
        onClick={() => api?.scrollNext()}
        {...props}
      />
    );
  }
);
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
