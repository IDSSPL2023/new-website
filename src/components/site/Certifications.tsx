import { Reveal } from "./Reveal";

const marks = [
  { title: "ISO 27001", sub: "Information Security Management" },
  { title: "MSME", sub: "Registered Enterprise" },
  { title: "Startup India", sub: "Recognised Entity" },
  { title: "CERT-In", sub: "Security Audited Practices" },
];

export function Certifications() {
  return (
    <section className="relative overflow-hidden border-t border-hairline py-32 md:py-48">
      <div className="glow-blue pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[760px] -translate-x-1/2 translate-y-1/3 opacity-25" />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow text-center">Certifications</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="display mx-auto mt-8 max-w-[16ch] text-center text-[clamp(1.8rem,4vw,3.2rem)] text-foreground">
            Enterprise trust, independently verified.
          </h2>
        </Reveal>

        <div className="mt-24 grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {marks.map((m, i) => (
            <Reveal key={m.title} delay={i * 100}>
              <div
                className="text-center"
                style={{ animation: `float-slow ${10 + i}s ease-in-out infinite` }}
              >
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-hairline bg-surface/60">
                  <span className="h-8 w-8 rounded-full border border-electric/40 bg-electric/10" />
                </div>
                <p className="mt-7 text-[15px] text-foreground">{m.title}</p>
                <p className="mt-1.5 text-[12.5px] text-muted-foreground">{m.sub}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}