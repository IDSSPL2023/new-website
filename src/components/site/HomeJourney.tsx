"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { GlassIcon3D } from "./GlassIcon3D";
import type { GlassIconName, GlassIconTone } from "./GlassIcon3D";
import { Reveal } from "./Reveal";

type JourneyIcon = {
  icon: GlassIconName;
  tone: GlassIconTone;
};

const trustMetrics: Array<
  JourneyIcon & {
    value: number;
    suffix: string;
    label: string;
    detail: string;
  }
> = [
  {
    value: 50,
    suffix: "+",
    label: "Banking Specialists",
    detail: "One multidisciplinary team across technology, product, design, and delivery.",
    icon: "bankingSpecialists",
    tone: "blue",
  },
  {
    value: 6,
    suffix: "",
    label: "Product Families",
    detail:
      "Connected capabilities spanning core banking, payments, digital, enterprise, merchants, and cards.",
    icon: "productEcosystem",
    tone: "cyan",
  },
  {
    value: 3,
    suffix: "",
    label: "Published Outcomes",
    detail: "Customer implementation stories supported by direct institutional feedback.",
    icon: "publishedOutcomes",
    tone: "teal",
  },
  {
    value: 2,
    suffix: "",
    label: "Security Certifications",
    detail: "Independent ISO/IEC 27001 and PCI DSS certification coverage.",
    icon: "securityCompliance",
    tone: "blue",
  },
];

function AnimatedMetricValue({ value, suffix }: { value: number; suffix: string }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = valueRef.current;
    if (!element) return;

    let animationFrame = 0;
    let hasStarted = false;

    const revealValue = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animationFrame = window.requestAnimationFrame(() => setDisplayValue(value));
        return;
      }

      const duration = 1450;
      const startedAt = performance.now();

      const animate = (time: number) => {
        const progress = Math.min((time - startedAt) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(value * easedProgress));

        if (progress < 1) animationFrame = window.requestAnimationFrame(animate);
      };

      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          revealValue();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <strong
      className="home-metric-value notranslate"
      aria-label={`${value}${suffix}`}
      data-value={displayValue}
      translate="no"
    >
      <span key={displayValue} ref={valueRef}>
        {displayValue}
      </span>
      {suffix && <em>{suffix}</em>}
    </strong>
  );
}

const architectureFlow: Array<JourneyIcon & { step: string; title: string; detail: string }> = [
  {
    step: "01",
    title: "Channels",
    detail: "Mobile · Web · Branch · ATM · UPI",
    icon: "omnichannelBanking",
    tone: "blue",
  },
  {
    step: "02",
    title: "IDSSPL Platform",
    detail: "Products · Workflows · Integration",
    icon: "enterpriseAutomation",
    tone: "cyan",
  },
  {
    step: "03",
    title: "AI Intelligence",
    detail: "Signals · Automation · Decision Support",
    icon: "aiIntelligence",
    tone: "teal",
  },
  {
    step: "04",
    title: "Banking Systems",
    detail: "Core · Payments · Cards · Enterprise",
    icon: "coreBanking",
    tone: "blue",
  },
];

const industries: Array<JourneyIcon & { title: string; description: string }> = [
  {
    title: "Co-operative Banks",
    description:
      "Practical, scalable banking technology designed around customer service and operational continuity.",
    icon: "omnichannelBanking",
    tone: "teal",
  },
  {
    title: "NBFCs",
    description:
      "Digital workflows, integrations, reporting, and customer journeys for modern lending operations.",
    icon: "dataAnalytics",
    tone: "teal",
  },
  {
    title: "Credit Societies",
    description:
      "Dependable systems that simplify member servicing, financial operations, and controlled expansion.",
    icon: "securityCompliance",
    tone: "teal",
  },
];

const implementationStories = [
  {
    index: "01",
    institution: "Shri Gajanan Nagari Sah. Patsantha Mry.",
    location: "Patolewadi, Kolhapur",
    focus: "Core Banking Implementation",
    result:
      "A seamless end-to-end CBS implementation supported by a responsive team throughout delivery.",
    quote:
      "The CBS implementation was handled seamlessly from start to finish. Their team was highly responsive and provided excellent support at every stage.",
  },
  {
    index: "02",
    institution: "The Shiroda Progressive Urban Co-Op. Credit Society Ltd.",
    location: "Shiroda, Goa",
    focus: "Operational Reliability",
    result:
      "The institution reported stronger operational efficiency and system reliability after implementation.",
    quote:
      "The solution delivered is secure, scalable, and performs exceptionally well. It has significantly improved our operational efficiency and system reliability.",
  },
  {
    index: "03",
    institution: "Shri Vasantrao Chougule Patsantha",
    location: "Kolhapur",
    focus: "Banking Systems Delivery",
    result:
      "Banking-domain understanding and a dependable delivery approach supported a smooth implementation experience.",
    quote:
      "Working with IDSSPL has been a great experience. Their deep understanding of banking systems and reliable approach made the entire process smooth and efficient.",
  },
];

export function HomeTrustMetrics() {
  return (
    <section id="trust" className="home-metrics border-b border-hairline py-16 md:py-22">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">IDSSPL At A Glance</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display section-heading-title text-foreground">
                Built To Deliver At Scale.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="section-heading-copy">
              A focused banking-technology team, connected product ecosystem, published delivery
              outcomes, and independently certified security practices.
            </p>
          </Reveal>
        </div>

        <div className="home-metrics-grid mt-9 md:mt-12">
          {trustMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={70 + index * 70}>
              <article className="home-metric-card">
                <div className="home-metric-card-top">
                  <GlassIcon3D name={metric.icon} tone={metric.tone} size="lg" />
                </div>
                <div className="home-metric-card-copy">
                  <AnimatedMetricValue value={metric.value} suffix={metric.suffix} />
                  <h3>{metric.label}</h3>
                  <p>{metric.detail}</p>
                </div>
                <i className="home-metric-card-line" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BankingArchitectureFlow() {
  return (
    <section className="banking-flow-section border-t border-hairline py-16 md:py-22">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">How It Works</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display section-heading-title text-foreground">
                One Connected Banking Flow.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="section-heading-copy">
              Customer channels connect through IDSSPL products and an intelligence layer to the
              banking systems institutions already operate.
            </p>
          </Reveal>
        </div>

        <div className="banking-flow-track mt-9 md:mt-12" aria-label="IDSSPL banking system flow">
          {architectureFlow.map((item, index) => (
            <Reveal key={item.title} delay={80 + index * 80} className="banking-flow-reveal">
              <article className="banking-flow-node">
                <span className="banking-flow-step">{item.step}</span>
                <span className="banking-flow-pulse" aria-hidden="true" />
                <span className="banking-flow-icon">
                  <GlassIcon3D name={item.icon} tone={item.tone} size="md" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
              {index < architectureFlow.length - 1 && (
                <span className="banking-flow-connector" aria-hidden="true">
                  <i />
                  <ArrowRight size={15} />
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function IndustrySolutions() {
  return (
    <section className="industry-solutions border-t border-hairline py-16 md:py-22">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Solutions By Industry</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display section-heading-title text-foreground">
                Designed For Financial Institutions.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="section-heading-copy">
              A modular banking ecosystem that adapts to different institution types without losing
              security, control, or integration discipline.
            </p>
          </Reveal>
        </div>

        <div className="industry-grid mt-9 md:mt-12">
          {industries.map((industry, index) => (
            <Reveal key={industry.title} delay={70 + (index % 3) * 70}>
              <article className="industry-card">
                <div className="industry-card-visual">
                  <GlassIcon3D name={industry.icon} tone={industry.tone} size="md" />
                  <span className="industry-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3>{industry.title}</h3>
                  <p>{industry.description}</p>
                </div>
                <span className="industry-card-line" aria-hidden="true" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CustomerOutcomes() {
  const [activeStory, setActiveStory] = useState(0);
  const story = implementationStories[activeStory] ?? implementationStories[0]!;

  const showPreviousStory = () => {
    setActiveStory((current) => (current === 0 ? implementationStories.length - 1 : current - 1));
  };

  const showNextStory = () => {
    setActiveStory((current) => (current + 1) % implementationStories.length);
  };

  return (
    <section
      id="customer-outcomes"
      className="customer-outcomes border-t border-hairline py-16 md:py-22"
    >
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Customer Outcomes</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display section-heading-title text-foreground">
                Real Delivery. Real Experiences.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="section-heading-copy">
              Explore implementation outcomes and direct reflections from financial institutions
              that have worked with IDSSPL.
            </p>
          </Reveal>
        </div>

        <div className="customer-outcomes-layout mt-9 md:mt-12">
          <Reveal className="outcome-story-list" delay={80}>
            <div role="tablist" aria-label="Customer outcome stories">
              {implementationStories.map((item, index) => (
                <button
                  key={item.institution}
                  type="button"
                  role="tab"
                  aria-selected={activeStory === index}
                  aria-controls="customer-outcome-panel"
                  className={`outcome-story-selector ${activeStory === index ? "is-active" : ""}`}
                  onClick={() => setActiveStory(index)}
                >
                  <span className="outcome-selector-index">{item.index}</span>
                  <span className="outcome-selector-copy">
                    <small>{item.focus}</small>
                    <strong>{item.institution}</strong>
                    <span>{item.location}</span>
                  </span>
                  <span className="outcome-selector-marker" aria-hidden="true" />
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <article
              id="customer-outcome-panel"
              role="tabpanel"
              className="customer-outcome-panel"
              aria-live="polite"
            >
              <div className="outcome-panel-orbit" aria-hidden="true" />
              <div key={story.institution} className="customer-outcome-content animate-fade-in">
                <div className="outcome-quote-mark" aria-hidden="true">
                  <Quote />
                </div>
                <p className="outcome-panel-label">In Their Words</p>
                <blockquote>“{story.quote}”</blockquote>

                <div className="outcome-delivery-summary">
                  <div>
                    <small>Delivery Outcome</small>
                    <p>{story.result}</p>
                  </div>
                  <footer>
                    <strong>{story.institution}</strong>
                    <span>{story.location}</span>
                  </footer>
                </div>
              </div>

              <div className="outcome-panel-controls">
                <div>
                  <button
                    type="button"
                    onClick={showPreviousStory}
                    aria-label="Previous customer outcome"
                  >
                    <ArrowLeft />
                  </button>
                  <button type="button" onClick={showNextStory} aria-label="Next customer outcome">
                    <ArrowRight />
                  </button>
                </div>
                <span key={story.index}>
                  {story.index} / {String(implementationStories.length).padStart(2, "0")}
                </span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
