"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "auto" | "always" | "scroll" | "hover";
  hideScrollbar?: boolean;
}

export const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, type = "auto", hideScrollbar = false, ...props }, ref) => {
    const getScrollStyle = () => {
      switch (type) {
        case "auto":
          return "overflow-auto";
        case "always":
          return "overflow-scroll";
        case "scroll":
          return "overflow-auto";
        case "hover":
          return "overflow-hidden hover:overflow-auto";
        default:
          return "overflow-auto";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          getScrollStyle(),
          hideScrollbar && "scrollbar-hide",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";