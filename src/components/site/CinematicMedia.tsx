import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
 * Shows its poster and a touch-friendly play action if the browser blocks autoplay.
 */
export function CinematicMedia({ video, poster, alt, className, pauseWhenHidden = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const inViewRef = useRef(!pauseWhenHidden);
  const [needsInteraction, setNeedsInteraction] = useState(false);

  const playVideo = () => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    if (el.readyState === HTMLMediaElement.HAVE_NOTHING) el.load();

    void el
      .play()
      .then(() => setNeedsInteraction(false))
      .catch(() => {
        if (inViewRef.current) setNeedsInteraction(true);
      });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let active = true;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    const attemptPlayback = () => {
      if (!active || !inViewRef.current || document.visibilityState === "hidden") return;

      void el
        .play()
        .then(() => {
          if (active) setNeedsInteraction(false);
        })
        .catch(() => {
          if (active && inViewRef.current) setNeedsInteraction(true);
        });
    };

    const handlePlaying = () => setNeedsInteraction(false);
    const handlePlaybackError = () => {
      if (inViewRef.current) setNeedsInteraction(true);
    };
    const handleVisibility = () => {
      if (document.visibilityState === "visible") attemptPlayback();
    };
    const handlePageShow = () => attemptPlayback();

    el.addEventListener("canplay", attemptPlayback);
    el.addEventListener("loadeddata", attemptPlayback);
    el.addEventListener("playing", handlePlaying);
    el.addEventListener("error", handlePlaybackError);
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pageshow", handlePageShow);

    let observer: IntersectionObserver | undefined;

    if (pauseWhenHidden && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const isVisible = Boolean(entries[0]?.isIntersecting);
          inViewRef.current = isVisible;

          if (isVisible) attemptPlayback();
          else el.pause();
        },
        { rootMargin: "96px 0px", threshold: 0.01 },
      );
      observer.observe(el);
    } else {
      inViewRef.current = true;
      attemptPlayback();
    }

    if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) attemptPlayback();

    return () => {
      active = false;
      observer?.disconnect();
      el.removeEventListener("canplay", attemptPlayback);
      el.removeEventListener("loadeddata", attemptPlayback);
      el.removeEventListener("playing", handlePlaying);
      el.removeEventListener("error", handlePlaybackError);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [pauseWhenHidden]);

  return (
    <>
      <video
        ref={ref}
        poster={poster}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        className={cn("cinematic-media-video w-full object-cover", className)}
        {...{ "webkit-playsinline": "true" }}
      >
        <source src={video} type="video/mp4" />
      </video>
      {needsInteraction ? (
        <button
          type="button"
          className="cinematic-media-play"
          onClick={playVideo}
          aria-label={`Play ${alt}`}
        >
          <Play aria-hidden="true" size={18} fill="currentColor" />
          <span>Play animation</span>
        </button>
      ) : null}
    </>
  );
}
