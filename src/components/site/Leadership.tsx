import {
  BadgeCheck,
  Handshake,
  Landmark,
  Medal,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";

import arunGawasImg from "@/assets/arun-gawas.png";
import cgoProfileImg from "@/assets/cgo-profile.png";
import vinayakImg from "@/assets/vinayak-more.jpg";
import vishalImg from "@/assets/vishal-singh.jpg";
import surajImg from "@/assets/suraj-pathak.jpg";

import { Reveal } from "./Reveal";

const leaders = [
  {
    name: "Vinayak More",
    role: "Associate Director & CEO",
    focus: "Banking & Strategy Leader",
    photo: vinayakImg,
    credentials: [
      { title: "25+", label: "Years Experience", icon: Medal },
      { title: "Banking Technology", label: "Domain Expertise", icon: Landmark },
      { title: "End-To-End", label: "Strategy Leadership", icon: Route },
    ],
    bio: "With deep expertise across Core Banking, Digital Banking, UPI issuing and acquiring, ATM, POS, AePS, merchant management, and digital payments, he leads IDSSPL's strategy for secure, scalable, and future-ready banking solutions.",
  },
  {
    name: "Vishal Singh",
    role: "Director — Sales & Growth",
    focus: "Sales & Growth Strategist",
    photo: vishalImg,
    credentials: [
      { title: "10+", label: "Years Experience", icon: Medal },
      { title: "Strategic Partnerships", label: "Business Expertise", icon: Handshake },
      { title: "Market Expansion", label: "Growth Focus", icon: TrendingUp },
    ],
    bio: "With a strong understanding of the fintech and banking landscape, he identifies new opportunities, expands market presence, and aligns every solution with client goals and long-term business success.",
  },
  {
    name: "Suraj Pathak",
    role: "Director — Operations",
    focus: "Operations Excellence Leader",
    photo: surajImg,
    credentials: [
      { title: "12+", label: "Years Experience", icon: Medal },
      { title: "Process Excellence", label: "Operational Expertise", icon: Workflow },
      { title: "Client Satisfaction", label: "Quality Focus", icon: BadgeCheck },
    ],
    bio: "He specializes in optimizing workflows, improving operational efficiency, and maintaining high standards of service delivery so every project is executed with precision and consistency.",
  },
];

const chiefOfficers = [
  {
    role: "Chief Technology Officer",
    abbreviation: "CTO",
    functionName: "Technology Strategy & Engineering",
    name: "Krishna Telgave",
    accent: { start: "#1767c8", end: "#4dc8ff", glow: "#38bdf8" },
    bio: "Guides the technology vision, architecture standards, engineering excellence, and secure platform strategy behind IDSSPL's banking solutions.",
  },
  {
    role: "Chief Marketing Officer",
    abbreviation: "CMO",
    functionName: "Brand, Market & Growth",
    name: "Mahesh Waingankar",
    accent: { start: "#6536c9", end: "#c45cff", glow: "#c084fc" },
    bio: "Shapes the brand, market strategy, communication, and growth direction that connects IDSSPL with financial institutions and partners.",
  },
  {
    role: "AVP-Technology (CBS)",
    abbreviation: "AVP CBS",
    functionName: "Core Banking Solutions",
    name: "Arun Gavas",
    photo: arunGawasImg,
    photoAlt: "Arun Gavas, AVP-Technology (CBS) at IDSSPL",
    accent: { start: "#087f72", end: "#39d5bd", glow: "#2dd4bf" },
    bio: "Leads the Core Banking Solutions portfolio, aligning banking-domain expertise, product strategy, implementation quality, and long-term customer outcomes.",
  },
  {
    role: "Chief Growth & Technology Officer",
    abbreviation: "CGTO",
    functionName: "Growth, Technology & Partnerships",
    name: "Prince Singh",
    photo: cgoProfileImg,
    photoAlt: "Prince Singh, Chief Growth & Technology Officer at IDSSPL",
    accent: { start: "#d55725", end: "#ffad4d", glow: "#fb923c" },
    bio: "Leads sustainable business growth, technology direction, strategic partnerships, market expansion, and revenue initiatives that strengthen IDSSPL's long-term impact.",
  },
  {
    role: "Sr. Compliance Officer",
    abbreviation: "SCO",
    functionName: "Compliance, Security & Governance",
    name: "Omkar Bhagwat",
    accent: { start: "#075f8f", end: "#30d6f2", glow: "#22d3ee" },
    bio: "Defines the enterprise security vision, cyber-risk governance, compliance standards, and resilient controls that protect customer data and critical banking systems.",
  },
  {
    role: "Manager - HR & Admin",
    abbreviation: "HR & ADMIN",
    functionName: "People, Culture & Administration",
    name: "Suja Nair",
    accent: { start: "#3157b8", end: "#68a7ff", glow: "#60a5fa" },
    bio: "Builds a high-performing people culture through thoughtful talent acquisition, employee development, engagement, and dependable human-resource operations.",
  },
];

const leadershipValues = [
  {
    title: "Proven Leadership",
    description: "Decades of combined experience in banking technology leadership.",
    icon: BadgeCheck,
  },
  {
    title: "Customer-Centric",
    description: "Focused on delivering solutions that create lasting impact.",
    icon: Users,
  },
  {
    title: "Innovation Driven",
    description: "Continuously evolving to meet future banking challenges.",
    icon: Zap,
  },
  {
    title: "Results Oriented",
    description: "Committed to measurable impact and sustainable business growth.",
    icon: Target,
  },
];

export function Leadership() {
  return (
    <section
      id="leadership"
      className="leadership-section border-b border-hairline pt-24 pb-16 md:pt-28 md:pb-20"
    >
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Leadership</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display section-heading-title text-foreground">Our Leaders</h1>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <p className="section-heading-copy">
              Experienced leaders combining banking expertise, technology insight, and a clear
              direction for IDSSPL&apos;s growth.
            </p>
          </Reveal>
        </div>

        <div className="leadership-card-grid mt-10 md:mt-14">
          {leaders.map((leader, index) => (
            <Reveal key={leader.name} delay={120 + index * 90} className="h-full">
              <article className="leadership-card group">
                <div className="leadership-portrait">
                  <img
                    src={leader.photo}
                    alt={`${leader.name}, ${leader.role} at IDSSPL`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col px-5 pt-5 pb-6 md:px-6 md:pb-7">
                  <div>
                    <span className="leader-role-badge">{leader.role}</span>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-foreground md:text-[1.65rem]">
                      {leader.name}
                    </h2>
                    <p className="mt-2 text-[13px] font-medium text-cyan">{leader.focus}</p>
                  </div>

                  <div className="mt-5 space-y-3 border-t border-hairline pt-4">
                    {leader.credentials.map((credential) => {
                      const Icon = credential.icon;
                      return (
                        <div key={credential.title} className="leader-credential">
                          <span className="leader-credential-icon">
                            <Icon aria-hidden="true" size={15} />
                          </span>
                          <span>
                            <strong>{credential.title}</strong>
                            <small>{credential.label}</small>
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-5 text-[13px] leading-[1.75] text-muted-foreground">
                    {leader.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <section className="chief-leadership mt-12 md:mt-16" aria-labelledby="chief-officers-title">
          <div className="section-heading-split">
            <Reveal>
              <div>
                <p className="eyebrow">Executive Officers</p>
                <h2
                  id="chief-officers-title"
                  className="display section-heading-title text-foreground"
                >
                  Leadership Across Every Function.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="section-heading-copy">
                Meet the executive officers shaping technology, core banking, growth, compliance,
                brand, and people strategy.
              </p>
            </Reveal>
          </div>

          <div className="chief-card-grid mt-8 md:mt-10">
            {chiefOfficers.map((chief, index) => {
              const chiefStyle = {
                "--chief-start": chief.accent.start,
                "--chief-end": chief.accent.end,
                "--chief-glow": chief.accent.glow,
              } as CSSProperties;

              return (
                <Reveal key={chief.abbreviation} delay={140 + index * 90} className="h-full">
                  <article className="chief-card" style={chiefStyle}>
                    <div className="chief-card-visual">
                      {chief.photo ? (
                        <img
                          src={chief.photo}
                          alt={chief.photoAlt ?? `${chief.name}, ${chief.role} at IDSSPL`}
                          loading="lazy"
                          className="chief-card-photo"
                        />
                      ) : (
                        <span className="chief-card-placeholder" aria-hidden="true">
                          <strong>{chief.abbreviation}</strong>
                        </span>
                      )}
                    </div>

                    <div className="chief-card-content">
                      <span className="leader-role-badge">{chief.abbreviation}</span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white md:text-[1.7rem]">
                        {chief.name}
                      </h3>
                      <p className="mt-2 text-[12px] font-medium text-white/62">{chief.role}</p>
                      <p className="chief-card-function mt-4">{chief.functionName}</p>
                      <p className="mt-3 text-[13px] leading-[1.7] text-white/66">{chief.bio}</p>

                      <div className="chief-card-footer mt-auto pt-5">
                        <span className="chief-profile-status">
                          <Users aria-hidden="true" size={14} />
                          Profile Details Coming Soon
                        </span>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal delay={220}>
          <div className="leadership-values mt-10 md:mt-12">
            {leadershipValues.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="leadership-value">
                  <span className="leadership-value-icon">
                    <Icon aria-hidden="true" size={25} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <Sparkles aria-hidden="true" size={13} className="text-cyan" />
            Guided By Experience · Built For What Comes Next
          </div>
        </Reveal>
      </div>
    </section>
  );
}
