import { Reveal } from "./Reveal";

export function Statement() {
  return (
    <section id="about" className="py-32 md:py-52">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Powering the future of financial technology</p>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display mt-10 max-w-[20ch] text-[clamp(2rem,5.4vw,4.6rem)] text-foreground">
            Technology that helps financial institutions operate smarter, scale faster and
            serve better.
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-12 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
            IDSSPL is a trusted technology partner for secure, scalable and high-performance
            banking solutions — delivering the systems that run core banking, payments and
            financial operations every day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}