import { Download, ExternalLink, FileText, ShieldCheck, Sparkles } from "lucide-react";

import brochureCover from "@/assets/idsspl-brochure-cover.jpg";

import { Reveal } from "./Reveal";

const brochureUrl = "/downloads/IDSSPL-Brochure.pdf";

export function BrochureDownload() {
  return (
    <section id="brochure" className="brochure-section border-b border-hairline py-20 md:py-28">
      <div className="shell">
        <div className="brochure-panel">
          <div className="brochure-copy">
            <Reveal>
              <p className="eyebrow">Company Brochure</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display mt-7 max-w-[12ch] text-[clamp(2.5rem,5.8vw,5.6rem)] text-foreground">
                Discover The Technology Behind Modern Banking.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-xl text-[14px] leading-relaxed text-muted-foreground md:text-[16px]">
                Explore IDSSPL's AI-driven core banking, intelligent payments, digital
                infrastructure, products, services, and enterprise capabilities in one
                concise company overview.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <div className="brochure-facts mt-8">
                <span>
                  <FileText aria-hidden="true" size={16} />
                  17 Pages
                </span>
                <span>
                  <ShieldCheck aria-hidden="true" size={16} />
                  Banking Division
                </span>
                <span>
                  <Sparkles aria-hidden="true" size={16} />
                  PDF · 5.5 MB
                </span>
              </div>
            </Reveal>

            <Reveal delay={230}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={brochureUrl}
                  download="IDSSPL-Banking-Division-Brochure.pdf"
                  className="shiny-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-semibold"
                >
                  <Download aria-hidden="true" size={16} />
                  Download Brochure
                </a>
                <a
                  href={brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-button inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-semibold text-foreground"
                >
                  Open In Browser
                  <ExternalLink aria-hidden="true" size={15} />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="brochure-preview-wrap">
            <a
              href={brochureUrl}
              target="_blank"
              rel="noreferrer"
              className="brochure-preview group"
              aria-label="Open the IDSSPL company brochure in a new tab"
            >
              <span className="brochure-preview-glow" aria-hidden="true" />
              <img
                src={brochureCover}
                alt="Cover of the IDSSPL Banking Division company brochure"
                loading="lazy"
              />
              <span className="brochure-preview-badge">
                <FileText aria-hidden="true" size={15} />
                IDSSPL Company Brochure
              </span>
              <span className="brochure-preview-action" aria-hidden="true">
                <ExternalLink size={17} />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
