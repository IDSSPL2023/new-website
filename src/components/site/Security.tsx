import vaultImg from "@/assets/vault.jpg";
import vaultVideo from "@/assets/vault.mp4";
import { CinematicMedia } from "./CinematicMedia";
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
    <section className="border-t border-hairline py-16 md:py-24">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Security Architecture</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display section-heading-title text-foreground">
                Built For Banking. Designed For Trust.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="section-heading-copy">
              Layered protection, accountable access, and complete traceability safeguard critical
              financial operations from the foundation up.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid items-stretch gap-5 md:mt-12 lg:grid-cols-[0.72fr_1.28fr]">
          <Reveal delay={170}>
            <div className="frame flex h-full flex-col justify-between rounded-2xl p-6 md:p-7">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-cyan uppercase">
                  Protection By Design
                </p>
                <p className="mt-4 text-[14px] leading-[1.75] text-muted-foreground">
                  Every layer is engineered to protect sensitive banking data while keeping access,
                  activity, and accountability clear.
                </p>
              </div>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {controls.map((control) => (
                  <span
                    key={control}
                    className="rounded-full border border-hairline px-4 py-2 text-[12px] text-muted-foreground"
                  >
                    {control}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative h-full">
              <div className="glow-blue pointer-events-none absolute inset-0 scale-110 opacity-35" />
              <CinematicMedia
                video={vaultVideo}
                poster={vaultImg}
                alt="Minimal 3D secure vault protecting banking data"
                className="relative h-full min-h-[20rem] w-full rounded-2xl border border-hairline object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
