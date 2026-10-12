"use client";
import { useEffect, useRef } from "react";

interface LazyVideoProps {
  src: string;
  poster?: string;
  /** The file's real pixel size. It reserves the box, so the page doesn't jump when the video arrives. */
  width: number;
  height: number;
  className?: string;
}

// A muted, looping demo clip that downloads and plays only while it is near
// the screen, and pauses once it scrolls away. Before, every clip on the page
// started downloading at once on page load, which made scrolling stutter.
export function LazyVideo({ src, poster, width, height, className = "" }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.play().catch(() => {
        // Autoplay refused (e.g. iOS Low Power Mode): the poster stays up.
      });
    };

    if (!("IntersectionObserver" in window)) {
      play();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ aspectRatio: `${width} / ${height}`, height: "auto" }}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
