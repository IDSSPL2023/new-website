import { Reveal } from "./Reveal";

const pillars = [
  { title: "Secure", desc: "End-to-end encryption, RBAC and multi-factor authentication." },
  { title: "Scalable", desc: "Architecture that grows with transaction and branch volume." },
  { title: "High Performance", desc: "Low-latency processing across core and payment rails." },
  { title: "Reliable", desc: "Resilient systems engineered for continuous banking uptime." },
  { title: "Compliant", desc: "Regulatory alignment with comprehensive audit trails." },
  { title: "Integrated", desc: "Interoperable with existing banking and third-party systems." },
];

export function TechApproach() {
  return (
    <section id="technology" className="border-t border-hairline py-16 md:py-24">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">IDSSPL Technology Approach</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display section-heading-title text-foreground">
                Trusted Technology. Built To Perform.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="section-heading-copy">
              Secure, scalable, and high-performance banking solutions built for institutions that
              cannot afford downtime.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 70}>
              <article className="glossy-panel group h-full p-6 transition-all duration-500 hover:-translate-y-0.5 hover:border-cyan/25">
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 transition-colors duration-500 group-hover:bg-cyan" />
                  <h3 className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                  {pillar.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
