import { useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What banking solutions does IDSSPL provide?",
    a: "IDSSPL delivers comprehensive technology solutions for financial institutions, including core banking platforms, digital banking systems, payment switching solutions, card management systems, reconciliation engines, and secure infrastructure services.",
  },
  {
    q: "Which payment systems are supported?",
    a: "Our switching platform supports UPI, IMPS, ATM networks and payment gateway integrations, with intelligent transaction routing across channels and settlement cycles.",
  },
  {
    q: "How does IDSSPL ensure security and compliance?",
    a: "Security-first architecture with end-to-end encryption, role-based access control, multi-factor authentication, comprehensive audit trails and alignment with applicable regulatory requirements.",
  },
  {
    q: "Can your solutions integrate with existing banking systems?",
    a: "Yes. Our platforms are built to interoperate with existing core systems, third-party applications and network infrastructure through standards-based interfaces and APIs.",
  },
  {
    q: "What is the benefit of reconciliation and settlement engines?",
    a: "Automated reconciliation reduces manual effort and operational risk, accelerates settlement cycles and gives finance teams an accurate, auditable view of every transaction.",
  },
  {
    q: "Who can benefit from IDSSPL's technology solutions?",
    a: "Banks, co-operative banks, credit societies, NBFCs and payment institutions that need reliable, well-structured technology foundations for their operations.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-hairline py-16 md:py-24">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Knowledge Center</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="display section-heading-title text-foreground">Common Questions.</h2>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="section-heading-copy">
              Clear answers about IDSSPL&apos;s banking platforms, payment capabilities, security,
              integration, and institutional fit.
            </p>
          </Reveal>
        </div>

        <div className="mt-9 border-t border-hairline md:mt-12">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-b border-hairline">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-start gap-5 py-5 text-left"
                  >
                    <span className="mt-1 text-[11px] tracking-[0.18em] text-muted-foreground/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[16px] text-foreground md:text-[18px]">{f.q}</span>
                    <Plus
                      className={cn(
                        "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-500",
                        isOpen && "rotate-45 text-electric",
                      )}
                    />
                  </button>
                  <div
                    className="grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 pl-10 text-[14px] leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
