import vaultImg from "@/assets/vault.jpg";
import { Reveal } from "./Reveal";

const controls = [
  "End-to-end encryption",
  "Multi-factor authentication",
  "Role-based access control",
  "Comprehensive audit trails",
  "Regulatory compliance",
];

export function Security() {
  return (
    <section className="border-t border-hairline py-32 md:py-48">
      <div className="shell grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Security architecture</p>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="display mt-8 text-[clamp(2rem,4.6vw,3.9rem)] text-foreground">
              Built for banking.
              <br />
              Designed for trust.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Security-first architecture with end-to-end encryption, role-based access
              control, multi-factor authentication, comprehensive audit trails and regulatory
              compliance.
            </p>
          </Reveal>
          <Reveal delay={210}>
            <div className="mt-10 flex flex-wrap gap-2.5">
              {controls.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-hairline px-4 py-2 text-[12px] text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative">
            <div className="glow-blue pointer-events-none absolute inset-0 scale-125 opacity-40" />
            <img
              src={vaultImg}
              alt="Minimal 3D secure vault protecting banking data"
              loading="lazy"
              width={1200}
              height={1200}
              className="relative w-full rounded-2xl border border-hairline object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}