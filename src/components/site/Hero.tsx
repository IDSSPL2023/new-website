import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/idsspl-hero.mp4";
import heroPoster from "@/assets/idsspl-hero-poster.jpg";
import { CinematicMedia } from "./CinematicMedia";

const nodes = [
  { label: "Core Banking", pos: "left-[4%] top-[26%]" },
  { label: "Digital Banking", pos: "left-[2%] top-[52%]" },
  { label: "Payments", pos: "left-[8%] top-[78%]" },
  { label: "UPI", pos: "right-[6%] top-[22%]" },
  { label: "Cards", pos: "right-[3%] top-[44%]" },
  { label: "Risk", pos: "right-[5%] top-[64%]" },
  { label: "Compliance", pos: "right-[10%] top-[84%]" },
  { label: "Data", pos: "left-[16%] top-[10%]" },
];

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

          {nodes.map((n, i) => (
            <span
              key={n.label}
              className={`pointer-events-none absolute hidden items-center gap-2 lg:flex ${n.pos}`}
              style={{ animation: `float-slow ${9 + i}s ease-in-out infinite` }}
            >
              <span className="h-1 w-1 rounded-full bg-cyan" />
              <span className="h-px w-8 bg-gradient-to-r from-cyan/70 to-transparent" />
              <span className="text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {n.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] items-center pt-24 pb-12 md:pt-20 md:pb-10">
        <div className="max-w-4xl md:w-[60%]">
          <p className="eyebrow animate-fade-in">AI-Powered Banking Technology</p>
          <h1 className="display mt-6 max-w-[10ch] text-[clamp(3.2rem,6vw,6.5rem)] text-foreground">
            <span className="block">The</span>
            <span className="block">Infrastructure</span>
            <span className="block">
              Behind <span className="text-muted-foreground">Modern</span>
            </span>
            <span className="block text-muted-foreground">Banking.</span>
          </h1>
          <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Secure, scalable technology for core banking, payments, cards, risk and financial
            infrastructure — engineered for institutions that move economies forward.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/products"
              className="shiny-button group inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-semibold"
            >
              Explore our solutions
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/#contact"
              className="glass-button rounded-full px-5 py-3 text-[13.5px] text-foreground"
            >
              Request a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
