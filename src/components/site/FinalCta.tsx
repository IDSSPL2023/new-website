import heroImg from "@/assets/hero-infrastructure.jpg";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-hairline">
      <img
        src={heroImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.13]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />

      <div className="shell relative py-28 md:py-36">
        <Reveal>
          <p className="eyebrow">Ready for the next generation of banking?</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display mt-10 max-w-[13ch] text-[clamp(2.4rem,7vw,6rem)] text-foreground">
            Build a smarter financial future.
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-10 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            If your current systems are slowing you down or limiting your operations, it may be
            time to take a closer look at your technology foundation. Connect with our team to
            explore how IDSSPL can support your banking and financial systems with reliable,
            well-structured solutions.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="mailto:info@idsspl.com"
              className="shiny-button rounded-full px-6 py-3.5 text-[13.5px] font-semibold"
            >
              Contact Us
            </a>
            <a
              href="mailto:info@idsspl.com?subject=Request%20a%20Demo"
              className="glass-button rounded-full px-6 py-3.5 text-[13.5px] text-foreground"
            >
              Request Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
