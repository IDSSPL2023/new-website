import { Reveal } from "./Reveal";
import { AILayerParticles } from "./AILayerParticles";
import { useAILayerMotion } from "./useAILayerMotion";
import "./ai-layer.css";

const inputs = ["Transactions", "Customers", "Branches", "Payments", "Operations"];
const outputs = ["Insights", "Automation", "Decision Support", "Reporting"];

export function AILayer() {
  const stageRef = useAILayerMotion();
  return (
    <section
      id="ai-intelligence"
      className="relative overflow-hidden border-t border-hairline py-16 md:py-24"
    >
      <div className="glow-blue pointer-events-none absolute top-1/2 left-1/2 h-[440px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="shell relative">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">The Intelligence Layer</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display section-heading-title text-foreground">
                Intelligence Built Into Banking.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <p className="section-heading-copy">
              AI connects operational data with automation, reporting, and decision support across
              the banking ecosystem.
            </p>
          </Reveal>
        </div>

        <div
          ref={stageRef}
          className="ai-motion-stage mx-auto mt-10 max-w-4xl md:mt-12"
          data-motion="paused"
        >
          <div className="ai-motion-atmosphere" aria-hidden="true" />
          <AILayerParticles stageRef={stageRef} />
          <Reveal delay={140}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {inputs.map((i) => (
                <span
                  key={i}
                  className="rounded-full border border-hairline px-4 py-2 text-[12px] text-muted-foreground"
                >
                  {i}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="ai-motion-stream relative my-6 h-16" aria-hidden="true">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
          </div>

          <Reveal delay={180}>
            <div className="ai-motion-panel frame rounded-2xl px-6 py-7 text-center md:px-8">
              <p className="text-[11px] tracking-[0.22em] text-electric uppercase">
                AI Intelligence Layer
              </p>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                An invisible intelligence layer inside the banking infrastructure — AI-powered
                management dashboards, chatbot assistance and natural language reporting, working
                across every system you already run.
              </p>
            </div>
          </Reveal>

          <div className="ai-motion-stream relative my-6 h-16" aria-hidden="true" />

          <Reveal delay={220}>
            <div className="flex flex-wrap justify-center gap-2.5">
              {outputs.map((o) => (
                <span
                  key={o}
                  className="rounded-full border border-electric/30 bg-electric/10 px-4 py-2 text-[12px] text-foreground"
                >
                  {o}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
