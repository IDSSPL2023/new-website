import {
  ArrowUpRight,
  BadgeCheck,
  Code2,
  Handshake,
  Landmark,
  Linkedin,
  Medal,
  Megaphone,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import type { CSSProperties } from "react";

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
    linkedin: undefined,
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
    linkedin: undefined,
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
    linkedin: undefined,
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
    name: "Profile To Be Announced",
    icon: Code2,
    accent: { start: "#1767c8", end: "#4dc8ff", glow: "#38bdf8" },
    bio: "Guides the technology vision, architecture standards, engineering excellence, and secure platform strategy behind IDSSPL's banking solutions.",
    linkedin: undefined,
  },
  {
    role: "Chief Marketing Officer",
    abbreviation: "CMO",
    functionName: "Brand, Market & Growth",
    name: "Profile To Be Announced",
    icon: Megaphone,
    accent: { start: "#6536c9", end: "#c45cff", glow: "#c084fc" },
    bio: "Shapes the brand, market strategy, communication, and growth direction that connects IDSSPL with financial institutions and partners.",
    linkedin: undefined,
  },
  {
    role: "Vice President — CBS",
    abbreviation: "VP CBS",
    functionName: "Core Banking Solutions",
    name: "Profile To Be Announced",
    icon: Landmark,
    accent: { start: "#087f72", end: "#39d5bd", glow: "#2dd4bf" },
    bio: "Leads the Core Banking Solutions portfolio, aligning banking-domain expertise, product strategy, implementation quality, and long-term customer outcomes.",
    linkedin: undefined,
  },
  {
    role: "Vice President — Operations",
    abbreviation: "VP OPS",
    functionName: "Enterprise Operations & Delivery",
    name: "Profile To Be Announced",
    icon: Workflow,
    accent: { start: "#d55725", end: "#ffad4d", glow: "#fb923c" },
    bio: "Directs enterprise operations and delivery governance, strengthening execution, coordination, quality, and dependable service across every engagement.",
    linkedin: undefined,
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
      className="leadership-section border-b border-hairline pt-28 pb-20 md:pt-36 md:pb-28"
    >
      <div className="shell">
        <div>
          <Reveal>
            <p className="eyebrow">Leadership</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-8 max-w-[14ch] text-[clamp(2.8rem,7vw,6.4rem)] text-foreground">
              Our Leaders
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-9 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              Experienced leaders driving innovation and excellence in banking technology,
              combining deep industry expertise with a clear vision for the future of
              financial infrastructure.
            </p>
          </Reveal>
        </div>

        <div className="leadership-card-grid mt-14 md:mt-20">
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
                  <span className="leadership-card-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  {leader.linkedin ? (
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="leadership-photo-link"
                      aria-label={`View ${leader.name} on LinkedIn`}
                    >
                      <Linkedin aria-hidden="true" size={16} />
                    </a>
                  ) : (
                    <span className="leadership-photo-link is-pending" title="LinkedIn link pending">
                      <Linkedin aria-hidden="true" size={16} />
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col px-6 pt-6 pb-7 md:px-7 md:pb-8">
                  <div>
                    <span className="leader-role-badge">{leader.role}</span>
                    <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-foreground md:text-[1.65rem]">
                      {leader.name}
                    </h2>
                    <p className="mt-2 text-[13px] font-medium text-cyan">{leader.focus}</p>
                  </div>

                  <div className="mt-6 space-y-3 border-t border-hairline pt-5">
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

                  <p className="mt-6 text-[13px] leading-[1.75] text-muted-foreground">{leader.bio}</p>

                  <div className="mt-auto pt-7">
                    {leader.linkedin ? (
                      <a
                        href={leader.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="leader-link"
                      >
                        <Linkedin aria-hidden="true" size={15} />
                        View LinkedIn Profile
                        <ArrowUpRight aria-hidden="true" size={14} />
                      </a>
                    ) : (
                      <span className="leader-link is-pending" title="Add the leader's LinkedIn URL later">
                        <Linkedin aria-hidden="true" size={15} />
                        LinkedIn Link Pending
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <section className="chief-leadership mt-16 md:mt-24" aria-labelledby="chief-officers-title">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] md:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">Executive Officers</p>
                <h2
                  id="chief-officers-title"
                  className="display mt-6 max-w-[14ch] text-[clamp(2.35rem,5vw,4.8rem)] text-foreground"
                >
                  Leadership Across Technology, Banking, And Operations.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground md:justify-self-end md:text-[15px]">
                The chief and vice president roles shaping IDSSPL's technology, brand,
                core banking, and enterprise operations alongside the board and directors.
              </p>
            </Reveal>
          </div>

          <div className="chief-card-grid mt-10 md:mt-14">
            {chiefOfficers.map((chief, index) => {
              const Icon = chief.icon;
              const chiefStyle = {
                "--chief-start": chief.accent.start,
                "--chief-end": chief.accent.end,
                "--chief-glow": chief.accent.glow,
              } as CSSProperties;

              return (
                <Reveal key={chief.abbreviation} delay={140 + index * 90} className="h-full">
                  <article className="chief-card" style={chiefStyle}>
                    <div className="chief-card-visual">
                      <span className="chief-card-icon" aria-hidden="true">
                        <Icon size={30} />
                      </span>
                      <span className="chief-card-number" aria-hidden="true">
                        0{leaders.length + index + 1}
                      </span>
                      <span className="chief-card-placeholder" aria-hidden="true">
                        <strong>{chief.abbreviation}</strong>
                      </span>
                    </div>

                    <div className="chief-card-content">
                      <span className="leader-role-badge">{chief.abbreviation}</span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] text-white md:text-[1.7rem]">
                        {chief.role}
                      </h3>
                      <p className="mt-2 text-[12px] font-medium text-white/62">{chief.name}</p>
                      <p className="chief-card-function mt-5">{chief.functionName}</p>
                      <p className="mt-4 text-[13px] leading-[1.75] text-white/66">{chief.bio}</p>

                      <div className="chief-card-footer mt-auto pt-6">
                        <span className="chief-profile-status">
                          <Users aria-hidden="true" size={14} />
                          Profile Details Coming Soon
                        </span>
                        {chief.linkedin ? (
                          <a
                            href={chief.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="chief-linkedin"
                            aria-label={`View ${chief.role} on LinkedIn`}
                          >
                            <Linkedin aria-hidden="true" size={15} />
                            View LinkedIn Profile
                            <ArrowUpRight aria-hidden="true" size={14} />
                          </a>
                        ) : (
                          <span className="chief-linkedin is-pending">
                            <Linkedin aria-hidden="true" size={15} />
                            LinkedIn Link Pending
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <Reveal delay={220}>
          <div className="leadership-values mt-16 md:mt-20">
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
          <div className="mt-8 flex items-center justify-center gap-2 text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <Sparkles aria-hidden="true" size={13} className="text-cyan" />
            Guided By Experience · Built For What Comes Next
          </div>
        </Reveal>
      </div>
    </section>
  );
}
