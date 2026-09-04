import { useEffect, useState } from "react";
import heroVideo from "@/assets/idsspl-hero.mp4";
import heroPoster from "@/assets/idsspl-hero-poster.jpg";
import { CinematicMedia } from "./CinematicMedia";

export function Hero() {
  const [y, setY] = useState(0);

  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden border-b border-hairline">
      <div className="absolute inset-0 h-full w-full">
        <div
          className="relative h-full w-full transition-transform duration-100"
          style={{ transform: `scale(1.035) translateY(${Math.min(y * 0.018, 14)}px)` }}
        >
          <CinematicMedia
            video={heroVideo}
            poster={heroPoster}
            alt="Cinematic visualization of the infrastructure behind modern banking"
            className="h-full min-h-[100svh] w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/10" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/35" />
          <div className="hero-vignette pointer-events-none absolute inset-0" />

        </div>
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] items-center pt-24 pb-12 md:pt-20 md:pb-10">
        <div className="max-w-4xl md:w-[60%]">
          <p className="eyebrow animate-fade-in">AI-Powered Banking Technology</p>
          <h1
            className="display mt-6 max-w-[11ch] text-[clamp(2.8rem,5vw,5rem)] text-foreground"
            aria-label="Intelligent Infrastructure For The Future Of Banking."
          >
            <span className="block">Intelligent</span>{" "}
            <span className="block">Infrastructure For</span>{" "}
            <span className="block text-muted-foreground">The Future Of Banking.</span>
          </h1>
          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Secure, scalable technology for core banking, payments, cards, risk and financial
            infrastructure — engineered for institutions that move economies forward.
          </p>
        </div>
      </div>
    </section>
  );
}
