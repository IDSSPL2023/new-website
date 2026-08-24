import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroVideo from "@/assets/idsspl-hero.mp4.asset.json";
import heroPoster from "@/assets/idsspl-hero-poster.jpg.asset.json";
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
    <section id="top" className="relative min-h-[88vh] overflow-hidden border-b border-hairline pt-28 md:min-h-[94vh] md:pt-0">
      <div className="absolute inset-x-0 top-0 h-full md:left-[43%]">
        <div
          className="relative h-full transition-transform duration-100"
          style={{ transform: `translateY(${Math.min(y * 0.025, 22)}px)` }}
        >
          <CinematicMedia
            video={heroVideo.url}
            poster={heroPoster.url}
            alt="Cinematic visualization of the infrastructure behind modern banking"
            className="h-full min-h-[88vh] object-cover md:min-h-[94vh]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/65 to-background/5" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/35" />

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

      <div className="shell relative z-10 flex min-h-[calc(88vh-7rem)] items-end pb-16 md:min-h-[94vh] md:items-center md:pb-0">
        <div className="max-w-3xl md:w-[58%]">
          <p className="eyebrow animate-fade-in">AI-Powered Banking Technology</p>
          <h1 className="display mt-7 text-[clamp(2.9rem,6.6vw,6.8rem)] text-foreground">
            The infrastructure
            <br />
            behind <span className="text-muted-foreground">modern banking.</span>
          </h1>
          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
            Secure, scalable technology for core banking, payments, cards, risk and financial
            infrastructure — engineered for institutions that move economies forward.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13.5px] font-medium text-background transition-opacity duration-300 hover:opacity-85"
            >
              Explore our solutions
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-hairline px-5 py-3 text-[13.5px] text-foreground transition-colors duration-300 hover:bg-surface-2"
            >
              Request a demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}