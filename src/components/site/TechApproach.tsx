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
    <section id="technology" className="border-t border-hairline py-32 md:py-48">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">IDSSPL Technology Approach</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display mt-8 text-[clamp(2rem,4.4vw,3.8rem)] text-foreground">
                A trusted technology partner.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                Secure, scalable and high-performance banking solutions, built on an
                architecture designed for institutions that cannot afford downtime.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="group h-full bg-background p-8 transition-colors duration-500 hover:bg-surface">
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 transition-colors duration-500 group-hover:bg-cyan" />
                      <h3 className="text-[15px] font-medium tracking-[-0.01em] text-foreground">
                        {p.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}