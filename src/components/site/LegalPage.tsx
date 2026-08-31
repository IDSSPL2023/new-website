import { Mail, ShieldCheck } from "lucide-react";

import { Reveal } from "./Reveal";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalPage({
  eyebrow,
  title,
  summary,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <article className="legal-page">
      <header className="legal-hero border-b border-hairline">
        <div className="shell legal-hero-grid">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="display legal-title">{title}</h1>
          </Reveal>
          <Reveal delay={100} className="legal-hero-summary">
            <p>{summary}</p>
            <span>Last updated: {updated}</span>
          </Reveal>
        </div>
      </header>

      <div className="shell legal-layout">
        <Reveal className="legal-navigation">
          <div className="legal-navigation-card">
            <span className="legal-navigation-icon" aria-hidden="true">
              <ShieldCheck size={20} />
            </span>
            <p>On this page</p>
            <nav aria-label={`${title} sections`}>
              {sections.map((section, index) => (
                <a key={section.id} href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              ))}
            </nav>
          </div>
        </Reveal>

        <div className="legal-content">
          {sections.map((section, index) => (
            <Reveal key={section.id} delay={Math.min(index * 35, 180)}>
              <section id={section.id} className="legal-section">
                <span className="legal-section-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}

          <Reveal>
            <aside className="legal-contact-card">
              <span aria-hidden="true">
                <Mail size={20} />
              </span>
              <div>
                <p>Questions about this policy?</p>
                <a href="mailto:info@idsspl.com">info@idsspl.com</a>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </article>
  );
}
