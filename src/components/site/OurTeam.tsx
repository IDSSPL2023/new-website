"use client";

import {
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Gauge,
  Headphones,
  Palette,
  RotateCcw,
  Smartphone,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import abhishekPhoto from "@/assets/abhishek-chowghale-cutout-card.png";
import chetanPhoto from "@/assets/chetan-patil-cutout-card.png";
import ganeshPhoto from "@/assets/ganesh-shinde-card-v3.png";
import jitendraPhoto from "@/assets/jitendra-shirguppe-cutout-card.png";
import manojPhoto from "@/assets/manoj-shinde-cutout-card.png";
import nehaPhoto from "@/assets/neha-singh-cutout-card-v2.png";
import prathameshPhoto from "@/assets/prathamesh-phadatare-cutout.png";
import sanjayPhoto from "@/assets/sanjay-cutout-card.png";

import { Reveal } from "./Reveal";

type FunctionLead = {
  id: string;
  functionName: string;
  role: string;
  name?: string;
  summary: string;
  monogram: string;
  icon: typeof Code2;
  accent: {
    start: string;
    end: string;
    glow: string;
  };
  photo?: string;
};

type TeamGroup = "Operations & Administration" | "Engineering & AI" | "Design";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: TeamGroup;
  summary: string;
  photo?: string;
};

const functionLeads: FunctionLead[] = [
  {
    id: "ai-automation-lead",
    functionName: "Artificial Intelligence",
    role: "AI & Automation Lead",
    name: "Chetan Patil",
    summary:
      "Drives applied AI, intelligent automation, and data-led capabilities that improve efficiency, decision-making, and customer outcomes.",
    monogram: "CP",
    icon: Sparkles,
    accent: { start: "#ff6531", end: "#ffb347", glow: "#fb923c" },
    photo: chetanPhoto,
  },
  {
    id: "react-engineering-lead",
    functionName: "Frontend Engineering",
    role: "React Engineering Lead",
    name: "Neha Singh",
    summary:
      "Leads React architecture, frontend engineering standards, and the delivery of fast, accessible, and maintainable digital banking experiences.",
    monogram: "NS",
    icon: Code2,
    accent: { start: "#2578ff", end: "#55d6ff", glow: "#38bdf8" },
    photo: nehaPhoto,
  },
  {
    id: "ui-ux-design-lead",
    functionName: "Experience Design",
    role: "UI/UX Design Lead",
    name: "Prathamesh Phadatare",
    summary:
      "Leads user experience strategy and interface design, turning complex banking workflows into clear, intuitive, and accessible products.",
    monogram: "PP",
    icon: Palette,
    accent: { start: "#8338b5", end: "#d266ff", glow: "#c084fc" },
    photo: prathameshPhoto,
  },
  {
    id: "flutter-application-developer",
    functionName: "Mobile Engineering",
    role: "Flutter Application Developer",
    name: "Sanjay Janghid",
    summary:
      "Builds reliable cross-platform mobile applications with Flutter, translating product requirements into responsive and consistent user experiences.",
    monogram: "SJ",
    icon: Smartphone,
    accent: { start: "#0f9275", end: "#54df9d", glow: "#34d399" },
    photo: sanjayPhoto,
  },
  {
    id: "support-head",
    functionName: "Customer Support & Service",
    role: "Support Head",
    name: "Ganesh Shinde",
    summary:
      "Leads customer support operations, service coordination, issue resolution, and dependable assistance across IDSSPL's banking technology ecosystem.",
    monogram: "GS",
    icon: Headphones,
    accent: { start: "#075f8f", end: "#30d6f2", glow: "#22d3ee" },
    photo: ganeshPhoto,
  },
  {
    id: "backend-engineering-lead",
    functionName: "Backend Engineering",
    role: "Backend Engineering Lead",
    name: "Abhishek Chougule",
    summary:
      "Leads secure backend architecture, service development, system integration, and performance engineering for scalable banking platforms.",
    monogram: "AC",
    icon: Boxes,
    accent: { start: "#007f89", end: "#35d7c5", glow: "#2dd4bf" },
    photo: abhishekPhoto,
  },
  {
    id: "database-engineering-lead",
    functionName: "Data Architecture",
    role: "Database Engineering Lead",
    name: "Manoj Shinde",
    summary:
      "Leads database architecture, performance optimization, data integrity, and resilient storage practices across critical platforms.",
    monogram: "MS",
    icon: Database,
    accent: { start: "#2668d8", end: "#54b8ff", glow: "#60a5fa" },
    photo: manojPhoto,
  },
  {
    id: "software-development-lead",
    functionName: "Software Engineering",
    role: "Software Development Lead",
    name: "Jitendra Shirguppe",
    summary:
      "Leads day-to-day software development, engineering coordination, code quality, and dependable delivery across product initiatives.",
    monogram: "JS",
    icon: Code2,
    accent: { start: "#006ec7", end: "#26d2e8", glow: "#22d3ee" },
    photo: jitendraPhoto,
  },
];

const teamGroups = [
  "All Team",
  "Operations & Administration",
  "Engineering & AI",
  "Design",
] as const;

const teamMembers: TeamMember[] = [
  {
    id: "chandani-sagar",
    name: "Chandani Sagar",
    role: "Operations",
    group: "Operations & Administration",
    summary: "Contributes to reliable operations and coordinated delivery across IDSSPL.",
  },
  {
    id: "nahid-mirza",
    name: "Nahid Mirza",
    role: "Accounts",
    group: "Operations & Administration",
    summary: "Contributes to reliable operations and coordinated delivery across IDSSPL.",
  },
  {
    id: "anjali-upadhayay",
    name: "Anjali Upadhayay",
    role: "Human Resources",
    group: "Operations & Administration",
    summary: "Contributes to reliable operations and coordinated delivery across IDSSPL.",
  },
  {
    id: "subajala-nair",
    name: "Subajala Nair",
    role: "HR & Admin Head",
    group: "Operations & Administration",
    summary: "Contributes to reliable operations and coordinated delivery across IDSSPL.",
  },
  {
    id: "sooraj-popiary",
    name: "Sooraj Popiary",
    role: "IT Infrastructure",
    group: "Operations & Administration",
    summary: "Contributes to reliable operations and coordinated delivery across IDSSPL.",
  },
  {
    id: "sadhana-sharma",
    name: "Sadhana Sharma",
    role: "Software Developer",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "kunal-jadhav",
    name: "Kunal Jadhav",
    role: "Software Developer",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "aditya-wadje",
    name: "Aditya Wadje",
    role: "Software Developer",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "hemch-vishwakarma",
    name: "Hemch Vishwakarma",
    role: "Software Developer",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "sandip-sharma",
    name: "Sandip Sharma",
    role: "Software Developer",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "yash-mali",
    name: "Yash Mali",
    role: "Software Developer",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "shweta-sorta",
    name: "Shweta Sorta",
    role: "Software Development",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "smita-nayak",
    name: "Smita Nayak",
    role: "Designer",
    group: "Design",
    summary: "Shapes clear, accessible experiences for complex banking workflows.",
  },
  {
    id: "ashlesh-gavas",
    name: "Ashlesh Gavas",
    role: "Designer",
    group: "Design",
    summary: "Shapes clear, accessible experiences for complex banking workflows.",
  },
  {
    id: "khitij-dorange",
    name: "Khitij Dorange",
    role: "Designer",
    group: "Design",
    summary: "Shapes clear, accessible experiences for complex banking workflows.",
  },
];

const teamAccents: Record<TeamGroup, FunctionLead["accent"]> = {
  "Operations & Administration": { start: "#1767c8", end: "#4dc8ff", glow: "#38bdf8" },
  "Engineering & AI": { start: "#d64f24", end: "#ff9e45", glow: "#fb923c" },
  Design: { start: "#6526a0", end: "#c45cff", glow: "#c084fc" },
};

const cardStyle = (lead: FunctionLead) =>
  ({
    "--function-start": lead.accent.start,
    "--function-end": lead.accent.end,
    "--function-glow": lead.accent.glow,
  }) as CSSProperties;

const memberStyle = (member: TeamMember) => {
  const accent = teamAccents[member.group];
  return {
    "--team-start": accent.start,
    "--team-end": accent.end,
    "--team-glow": accent.glow,
  } as CSSProperties;
};

const getMonogram = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function PersonName({ name }: { name: string }) {
  const [firstName, ...surnameParts] = name.trim().split(/\s+/);
  const surname = surnameParts.join(" ");

  return (
    <>
      <span className="block" aria-hidden="true">
        {firstName}
      </span>
      {surname ? (
        <span className="block" aria-hidden="true">
          {surname}
        </span>
      ) : null}
    </>
  );
}

function TeamHeroVisual() {
  return (
    <div
      className="team-hero-visual"
      aria-label="One connected IDSSPL team turning ideas into secure, dependable banking technology"
    >
      <div className="team-hero-grid" aria-hidden="true" />
      <div className="team-hero-orbit" aria-hidden="true" />
      <div className="team-hero-scan" aria-hidden="true" />

      <div className="team-hero-system" aria-hidden="true">
        <svg className="team-hero-links" viewBox="0 0 720 420" preserveAspectRatio="none">
          <path d="M132 84 C236 84 248 174 360 210" pathLength="1" />
          <path d="M588 84 C484 84 472 174 360 210" pathLength="1" />
          <path d="M132 334 C236 334 248 246 360 210" pathLength="1" />
          <path d="M588 334 C484 334 472 246 360 210" pathLength="1" />
        </svg>

        <div className="team-hero-core">
          <span>IDSSPL Collective</span>
          <strong>One Team</strong>
          <small>Connected By Purpose</small>
        </div>

        <div className="team-hero-node team-hero-node-1">
          <i />
          <strong>Imagine</strong>
          <span>Ideas Into Clarity</span>
        </div>
        <div className="team-hero-node team-hero-node-2">
          <i />
          <strong>Engineer</strong>
          <span>Built To Perform</span>
        </div>
        <div className="team-hero-node team-hero-node-3">
          <i />
          <strong>Secure</strong>
          <span>Trust By Design</span>
        </div>
        <div className="team-hero-node team-hero-node-4">
          <i />
          <strong>Deliver</strong>
          <span>Impact At Scale</span>
        </div>

        <div className="team-hero-story">
          <span>Human Expertise</span>
          <i aria-hidden="true" />
          <span>Connected Delivery</span>
        </div>
      </div>
    </div>
  );
}

function FunctionLeadCard({
  lead,
  flipped,
  onFlip,
}: {
  lead: FunctionLead;
  flipped: boolean;
  onFlip: () => void;
}) {
  const displayName = lead.name ?? "Profile To Be Announced";
  const frontMode = lead.photo ? " has-photo" : "";

  return (
    <article
      className={`function-lead-card${frontMode}`}
      data-lead-id={lead.id}
      style={cardStyle(lead)}
    >
      <div className={`function-lead-inner${flipped ? " is-flipped" : ""}`}>
        <button
          type="button"
          className={`function-lead-face function-lead-front text-left${frontMode}`}
          onClick={onFlip}
          aria-label={`View ${lead.role} details`}
        >
          {lead.photo ? (
            <span className="function-lead-photo" aria-hidden="true">
              <img src={lead.photo} alt="" loading="lazy" />
            </span>
          ) : null}
          {!lead.photo ? (
            <span className="function-lead-monogram" aria-hidden="true">
              {lead.monogram}
            </span>
          ) : null}
          <span className="function-lead-copy mt-auto block">
            <span className="function-lead-function">{lead.functionName}</span>
            <strong
              className="function-lead-person-name mt-3 block text-[1.55rem] font-semibold leading-tight tracking-[-0.035em] text-foreground"
              aria-label={displayName}
            >
              <PersonName name={displayName} />
            </strong>
            <span className="function-lead-designation mt-2 block text-[13px] font-medium leading-snug text-muted-foreground">
              {lead.role}
            </span>
          </span>
          <span className="function-lead-hint">
            <RotateCcw aria-hidden="true" size={13} />
            View Function Profile
          </span>
        </button>

        <div className="function-lead-face function-lead-back">
          <button
            type="button"
            onClick={onFlip}
            className="function-lead-close"
            aria-label={`Return to ${lead.role} overview`}
          >
            <RotateCcw aria-hidden="true" size={15} />
          </button>
          <div>
            <span className="function-lead-function">{lead.functionName}</span>
            <h3
              className="mt-4 max-w-[14ch] text-2xl font-semibold leading-tight text-foreground"
              aria-label={displayName}
            >
              <PersonName name={displayName} />
            </h3>
            <p className="mt-2 text-[12px] text-muted-foreground">{lead.role}</p>
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-muted-foreground">{lead.summary}</p>

          <div className="mt-auto border-t border-hairline pt-5">
            {lead.name ? (
              <span className="function-lead-status">
                <CheckCircle2 aria-hidden="true" size={14} />
                Confirmed Function Lead
              </span>
            ) : (
              <span className="function-lead-status is-pending">
                <Gauge aria-hidden="true" size={14} />
                Profile Announcement Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function TeamMemberCard({
  member,
  flipped,
  onFlip,
}: {
  member: TeamMember;
  flipped: boolean;
  onFlip: () => void;
}) {
  return (
    <article className="team-card" style={memberStyle(member)}>
      <div className={`team-card-inner${flipped ? " is-flipped" : ""}`}>
        <button
          type="button"
          className="team-card-face team-card-front text-left"
          onClick={onFlip}
          aria-label={`View ${member.name} profile`}
        >
          <span className={`team-card-photo${member.photo ? " has-photo" : ""}`} aria-hidden="true">
            {member.photo ? (
              <img src={member.photo} alt="" loading="lazy" />
            ) : (
              <span className="team-card-monogram">{getMonogram(member.name)}</span>
            )}
          </span>
          <span className="team-card-copy mt-auto block">
            <span className="team-card-group">{member.group}</span>
            <strong
              className="team-card-person-name mt-3 block text-[1.55rem] font-semibold leading-tight tracking-[-0.035em] text-white"
              aria-label={member.name}
            >
              <PersonName name={member.name} />
            </strong>
            <span className="team-card-designation mt-2 block text-[12px] leading-snug text-white/62">
              {member.role}
            </span>
          </span>
          <span className="team-card-hint">
            <RotateCcw aria-hidden="true" size={13} />
            View Team Profile
          </span>
        </button>

        <div className="team-card-face team-card-back">
          <button
            type="button"
            onClick={onFlip}
            className="team-card-close"
            aria-label={`Return to ${member.name} overview`}
          >
            <RotateCcw aria-hidden="true" size={15} />
          </button>
          <div>
            <span className="team-card-group">Team Profile</span>
            <h3
              className="mt-5 max-w-[12ch] text-2xl font-semibold leading-tight text-white"
              aria-label={member.name}
            >
              <PersonName name={member.name} />
            </h3>
            <p className="mt-2 text-[12px] text-white/62">{member.role}</p>
          </div>
          <p className="mt-8 text-[13px] leading-relaxed text-white/72">{member.summary}</p>
          <div className="mt-auto border-t border-white/12 pt-5">
            <span className="flex items-center gap-2 text-[11px] text-white/52">
              <UserRound aria-hidden="true" size={14} />
              {member.photo ? "Profile Image Added" : "Personal Image Coming Soon"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function OurTeam() {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [showFullTeam] = useState(false);
  const [activeTeamGroup, setActiveTeamGroup] = useState<(typeof teamGroups)[number]>("All Team");
  const [flippedMemberId, setFlippedMemberId] = useState<string | null>(null);
  const teamCarouselRef = useRef<HTMLDivElement>(null);
  const fullTeamRef = useRef<HTMLElement>(null);
  const visibleTeamMembers =
    activeTeamGroup === "All Team"
      ? teamMembers
      : teamMembers.filter((member) => member.group === activeTeamGroup);

  const scrollTeam = (direction: -1 | 1) => {
    teamCarouselRef.current?.scrollBy({ left: direction * 352, behavior: "smooth" });
  };

  useEffect(() => {
    if (!showFullTeam) return;

    const frame = window.requestAnimationFrame(() => {
      fullTeamRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [showFullTeam]);

  return (
    <main id="team">
      <section className="team-hero border-b border-hairline pt-20 pb-12 md:pt-24 md:pb-14">
        <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Our Team</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-6 max-w-[12ch] text-[clamp(2.7rem,4.8vw,4.8rem)] text-foreground">
                People Behind The Platform.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Functional leaders supported by a multidisciplinary team of banking, engineering,
                delivery, growth, quality, and design specialists.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="glass-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] text-foreground/75">
                  <Sparkles aria-hidden="true" size={14} className="text-cyan" />
                  50+ People
                </span>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal delay={130}>
              <TeamHeroVisual />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="team-showcase border-b border-hairline py-14 md:py-20">
        <div className="shell">
          <div className="section-heading-split">
            <div>
              <Reveal>
                <p className="eyebrow">Functional Leadership</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display section-heading-title text-foreground">
                  Leaders Across Every Function.
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal delay={140}>
                <p className="section-heading-copy">
                  Meet the people responsible for the disciplines that shape our products, delivery,
                  customer relationships, and technology direction.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="function-lead-grid mt-8 md:mt-10">
            {functionLeads.map((lead, index) => (
              <Reveal key={lead.id} delay={80 + (index % 4) * 70} className="h-full">
                <FunctionLeadCard
                  lead={lead}
                  flipped={flippedId === lead.id}
                  onFlip={() => setFlippedId((current) => (current === lead.id ? null : lead.id))}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {showFullTeam ? (
        <section
          ref={fullTeamRef}
          id="full-team"
          className="team-directory border-b border-hairline py-14 md:py-18"
        >
          <div className="shell">
            <div className="section-heading-split">
              <div>
                <Reveal>
                  <p className="eyebrow">Full Team Directory</p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="display section-heading-title text-foreground">
                    Meet The Full Team.
                  </h2>
                </Reveal>
              </div>
              <div>
                <Reveal delay={140}>
                  <p className="section-heading-copy">
                    Meet the people building, delivering, and supporting IDSSPL across every
                    function.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal delay={170}>
              <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:items-center md:justify-between">
                <div className="team-filter-row" aria-label="Filter the full team">
                  {teamGroups.map((group) => (
                    <button
                      key={group}
                      type="button"
                      className={`team-filter${activeTeamGroup === group ? " is-active" : ""}`}
                      onClick={() => {
                        setActiveTeamGroup(group);
                        setFlippedMemberId(null);
                        teamCarouselRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                      }}
                      aria-pressed={activeTeamGroup === group}
                    >
                      {group}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  {visibleTeamMembers.length} Team Profiles
                </span>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="team-carousel-wrap mt-6">
                <div ref={teamCarouselRef} className="team-carousel" aria-live="polite">
                  {visibleTeamMembers.map((member) => (
                    <TeamMemberCard
                      key={member.id}
                      member={member}
                      flipped={flippedMemberId === member.id}
                      onFlip={() =>
                        setFlippedMemberId((current) => (current === member.id ? null : member.id))
                      }
                    />
                  ))}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    className="team-arrow"
                    onClick={() => scrollTeam(-1)}
                    aria-label="View previous team profiles"
                  >
                    <ChevronLeft aria-hidden="true" size={18} />
                  </button>
                  <div className="team-progress" aria-hidden="true">
                    <span
                      style={{ transform: `scaleX(${Math.min(1, 4 / visibleTeamMembers.length)})` }}
                    />
                  </div>
                  <button
                    type="button"
                    className="team-arrow"
                    onClick={() => scrollTeam(1)}
                    aria-label="View more team profiles"
                  >
                    <ChevronRight aria-hidden="true" size={18} />
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}
    </main>
  );
}
