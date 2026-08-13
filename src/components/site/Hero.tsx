import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-infrastructure.jpg";
import heroVideo from "@/assets/hero-infrastructure.mp4.asset.json";
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
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="glow-blue pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 opacity-40" />

      <div className="shell relative">
        <p className="eyebrow animate-fade-in">AI-Powered Banking Technology</p>

        <h1 className="display mt-7 max-w-[16ch] text-[clamp(2.65rem,8.2vw,7.2rem)] text-foreground">
          Enabling <span className="text-muted-foreground">Secure. Scalable.</span>
          <br />
          Future-Ready Banking Technology.
        </h1>

        <div className="mt-10 flex max-w-4xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            Delivering secure and innovative technology solutions for banks and financial
            institutions — core banking, payments, cards, risk and infrastructure, engineered
            for the Indian financial ecosystem.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <a
              href="#products"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-[13.5px] font-medium text-background transition-opacity duration-300 hover:opacity-85"
            >
              Explore Our Solution
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="rounded-full border border-hairline px-5 py-3 text-[13.5px] text-foreground transition-colors duration-300 hover:bg-surface-2"
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>

      <div className="shell relative mt-20 md:mt-28">
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-2xl border border-hairline"
            style={{ transform: `translateY(${Math.min(y * 0.05, 40)}px)` }}
          >
            <CinematicMedia
              video={heroVideo.url}
              poster={heroImg}
              alt="3D visualization of IDSSPL's banking infrastructure architecture"
              className="h-[52vh] md:h-[76vh]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background/40" />

            {nodes.map((n, i) => (
              <span
                key={n.label}
                className={`pointer-events-none absolute hidden items-center gap-2 md:flex ${n.pos}`}
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
      </div>
    </section>
  );
}