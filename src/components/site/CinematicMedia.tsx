import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  video: string;
  poster: string;
  alt: string;
  className?: string;
  pauseWhenHidden?: boolean;
};

/**
 * Autoplaying, muted, looping cinematic clip that only plays while in view.
 * Falls back to the poster still if the browser blocks autoplay.
 */
export function CinematicMedia({ video, poster, alt, className, pauseWhenHidden = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set imperatively: some browsers ignore React's muted prop for autoplay.
    el.muted = true;
    el.defaultMuted = true;

    if (!pauseWhenHidden) {
      void el.play().catch(() => undefined);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [pauseWhenHidden]);

  return (
    <video
      ref={ref}
      src={video}
      poster={poster}
      aria-label={alt}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={cn("w-full object-cover", className)}
    />
  );
}
