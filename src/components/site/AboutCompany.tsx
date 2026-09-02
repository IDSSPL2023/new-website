"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import infrastructureImg from "@/assets/infrastructure.jpg";
import infrastructureVideo from "@/assets/infrastructure.mp4";

import { CinematicMedia } from "./CinematicMedia";
import { GlassIcon3D, type GlassIconName } from "./GlassIcon3D";
import { Reveal } from "./Reveal";

const strengths: Array<{
  title: string;
  description: string;
  icon: GlassIconName;
}> = [
  {
    title: "Banking Domain Expertise",
    description:
      "Deep banking knowledge informs every workflow, integration, control, and operational decision across our financial technology platforms.",
    icon: "bank",
  },
  {
    title: "Security-First Infrastructure",
    description:
      "Layered security, access controls, auditability, and resilient infrastructure protect sensitive financial operations and customer data.",
    icon: "shield",
  },
  {
    title: "Scalable Financial Platforms",
    description:
      "Modular architectures support higher transaction volumes, expanding branch networks, and new digital services without unnecessary disruption.",
    icon: "layers",
  },
  {
    title: "Real-Time Payment Engineering",
    description:
      "Connected payment capabilities support dependable routing, monitoring, reconciliation, and transaction processing across modern banking channels.",
    icon: "activity",
  },
  {
    title: "Compliance-Ready Architecture",
    description:
      "Traceable processes, configurable controls, and structured reporting strengthen oversight and help institutions operate with regulatory confidence.",
    icon: "clipboard",
  },
  {
    title: "Enterprise Implementation Support",
    description:
      "Experienced teams guide discovery, integration, migration, rollout, and long-term platform stability across complex banking environments.",
    icon: "handshake",
  },
];

const institutions: Array<{
  title: string;
  description: string;
  icon: GlassIconName;
}> = [
  {
    title: "Banks & Co-Operative Institutions",
    description:
      "Modernize core operations, digital channels, payments, customer servicing, and institutional control on a dependable technology foundation.",
    icon: "bank",
  },
  {
    title: "Fintech & Payment Providers",
    description:
      "Launch connected financial experiences with scalable transaction infrastructure, integration-ready services, and real-time visibility.",
    icon: "network",
  },
  {
    title: "Growing Financial Enterprises",
    description:
      "Replace fragmented processes with secure enterprise workflows that improve accuracy, governance, productivity, and readiness for growth.",
    icon: "building",
  },
];

const principles = [
  "Understand the institution before defining the solution.",
  "Engineer security, reliability, and observability from the beginning.",
  "Design modular systems that integrate with existing banking environments.",
  "Support measurable outcomes beyond implementation and go-live.",
];

export function AboutCompany() {
  const [activeStrength, setActiveStrength] = useState(0);
  const capabilityCardsRef = useRef<Array<HTMLElement | null>>([]);
  const strength = strengths[activeStrength];

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveCapability = () => {
      animationFrame = 0;
      const viewportAnchor = window.innerHeight * 0.48;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      capabilityCardsRef.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardAnchor = rect.top + rect.height * 0.5;
        const distance = Math.abs(cardAnchor - viewportAnchor);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveStrength(closestIndex);
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateActiveCapability);
    };

    updateActiveCapability();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <section className="about-story border-b border-hairline py-14 md:py-20">
        <div className="shell grid items-center gap-9 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <div className="about-media-frame">
              <CinematicMedia
                video={infrastructureVideo}
                poster={infrastructureImg}
                alt="Connected digital banking infrastructure supporting secure financial operations"
                className="about-media"
              />
              <div className="about-media-caption" aria-hidden="true">
                <span>Core Banking</span>
                <span>Digital Payments</span>
                <span>Enterprise Systems</span>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Banking Technology Company</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-6 max-w-[13ch] text-[clamp(2.3rem,4.4vw,4.3rem)] text-foreground">
                Built For Banking. Ready For Scale.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-6 grid gap-4 text-[14px] leading-[1.8] text-muted-foreground md:text-[15px]">
                <p>
                  IDSSPL develops secure banking technology and digital financial infrastructure for
                  banks, fintech companies, payment providers, and financial institutions.
                </p>
                <p>
                  Our expertise spans AI-powered core banking, NPCI payment products, digital
                  channels, merchant and card management, enterprise automation, reconciliation, and
                  secure infrastructure.
                </p>
                <p>
                  Banking-domain understanding, product engineering, and operational discipline come
                  together in platforms designed for real transaction volumes, regulatory change,
                  and long-term institutional growth.
                </p>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="about-story-tags mt-7">
                <span>Secure By Design</span>
                <span>Integration Ready</span>
                <span>Built For Scale</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="about-strength-section border-b border-hairline py-14 md:py-20">
        <div className="shell">
          <div className="section-heading-split">
            <div>
              <Reveal>
                <p className="eyebrow">Why Financial Institutions Choose IDSSPL</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display section-heading-title text-foreground">
                  Banking Expertise. Engineered.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="section-heading-copy">
                Explore the capabilities that make IDSSPL a dependable banking technology partner,
                from secure architecture and real-time payments to implementation and support.
              </p>
            </Reveal>
          </div>

          <div className="about-capability-scroll mt-9 md:mt-11">
            <div className="about-capability-track" aria-label="IDSSPL core capabilities">
              {strengths.map((item, index) => (
                <article
                  key={item.title}
                  ref={(node) => {
                    capabilityCardsRef.current[index] = node;
                  }}
                  className={`about-capability-card${activeStrength === index ? " is-active" : ""}`}
                  aria-current={activeStrength === index ? "step" : undefined}
                >
                  <span className="about-capability-card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="about-capability-card-visual" aria-hidden="true">
                    <GlassIcon3D name={item.icon} size="md" tone="cyan" />
                  </div>
                  <div>
                    <small>Core Capability</small>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="about-capability-sticky">
              <div
                id="about-capability-panel"
                className="about-capability-stage"
                role="region"
                aria-live="polite"
                aria-label={`${strength.title}: ${strength.description}`}
              >
                <div className="about-capability-orbit" aria-hidden="true" />
                <div key={`${strength.title}-visual`} className="about-capability-visual">
                  <GlassIcon3D name={strength.icon} size="hero" tone="blue" />
                </div>
                <article key={strength.title} className="about-capability-copy">
                  <span>
                    Core Capability · {String(activeStrength + 1).padStart(2, "0")} /{" "}
                    {strengths.length}
                  </span>
                  <h3>{strength.title}</h3>
                  <p>{strength.description}</p>
                </article>
                <div className="about-capability-progress" aria-hidden="true">
                  <span>Scroll To Explore</span>
                  <div>
                    <i
                      style={{ transform: `scaleX(${(activeStrength + 1) / strengths.length})` }}
                    />
                  </div>
                  <strong>
                    {String(activeStrength + 1).padStart(2, "0")} / {strengths.length}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-institutions border-b border-hairline py-14 md:py-20">
        <div className="shell">
          <div className="section-heading-split">
            <div>
              <Reveal>
                <p className="eyebrow">Who We Build For</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display section-heading-title text-foreground">
                  Built For Financial Institutions.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="section-heading-copy">
                Purpose-built platforms for banks, fintech companies, payment providers, and
                institutions managing complex financial operations.
              </p>
            </Reveal>
          </div>

          <div className="mt-9 grid gap-4 md:mt-11 md:grid-cols-3">
            {institutions.map((institution, index) => (
              <Reveal key={institution.title} delay={100 + index * 80} className="h-full">
                <article className="about-institution-card group">
                  <span className="about-institution-visual" aria-hidden="true">
                    <GlassIcon3D name={institution.icon} size="md" tone="teal" />
                  </span>
                  <h3>{institution.title}</h3>
                  <p>{institution.description}</p>
                  <span className="about-card-line" aria-hidden="true" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-purpose border-b border-hairline py-14 md:py-20">
        <div className="shell">
          <div className="section-heading-split mb-9 md:mb-11">
            <div>
              <Reveal>
                <p className="eyebrow">Mission & Vision</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display section-heading-title text-foreground">
                  Purpose In Motion.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="section-heading-copy">
                A clear mission guides what we build today. A focused vision keeps every platform
                ready for the future of secure financial services.
              </p>
            </Reveal>
          </div>

          <div className="about-purpose-grid">
            <Reveal className="h-full">
              <article className="about-purpose-card about-purpose-card-mission h-full">
                <span className="about-purpose-number" aria-hidden="true">
                  01
                </span>
                <div className="about-purpose-visual" aria-hidden="true">
                  <span />
                  <GlassIcon3D name="target" size="hero" tone="cyan" />
                </div>
                <div className="about-purpose-copy">
                  <span className="about-purpose-kicker">Our Mission</span>
                  <h3>Make Banking Technology Dependable.</h3>
                  <p>
                    Equip financial institutions with secure, scalable, and practical technology
                    that strengthens operations, improves customer experiences, and simplifies
                    digital banking.
                  </p>
                </div>
              </article>
            </Reveal>

            <Reveal delay={100} className="h-full">
              <article className="about-purpose-card is-vision h-full">
                <span className="about-purpose-number" aria-hidden="true">
                  02
                </span>
                <div className="about-purpose-visual" aria-hidden="true">
                  <span />
                  <GlassIcon3D name="eye" size="hero" tone="blue" />
                </div>
                <div className="about-purpose-copy">
                  <span className="about-purpose-kicker">Our Vision</span>
                  <h3>Advance The Future Of Finance.</h3>
                  <p>
                    Become a trusted technology partner for institutions building intelligent,
                    connected, and resilient financial services aligned with real industry needs.
                  </p>
                </div>
              </article>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="about-principles mt-4">
              <div>
                <p className="eyebrow">How We Work</p>
                <h2 className="display mt-5 max-w-[12ch] text-[clamp(2rem,3.7vw,3.6rem)] text-foreground">
                  Built With Discipline.
                </h2>
              </div>
              <ul>
                {principles.map((principle) => (
                  <li key={principle}>
                    <CheckCircle2 aria-hidden="true" size={16} />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
