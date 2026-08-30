import { Reveal } from "./Reveal";

export function Statement() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="shell section-heading-split">
        <div>
          <Reveal>
            <p className="eyebrow">Powering Financial Technology</p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="display section-heading-title text-foreground">
              Technology That Moves Banking Forward.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={220}>
          <p className="section-heading-copy">
            IDSSPL delivers secure, scalable systems for core banking, payments, and financial
            operations—helping institutions operate smarter and grow with confidence.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
