"use client";

import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Boxes,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Gauge,
  Image as ImageIcon,
  Linkedin,
  Megaphone,
  Palette,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  UserRound,
  Workflow,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import prathameshCardArtwork from "@/assets/prathamesh-design-lead-card.png";
import prathameshPhoto from "@/assets/prathamesh-phadatare.jpg";

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
  cardArtwork?: string;
  linkedin?: string;
};

type TeamGroup = "Operations & Administration" | "Engineering & AI" | "Design";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: TeamGroup;
  summary: string;
  photo?: string;
  linkedin?: string;
};

const functionLeads: FunctionLead[] = [
  {
    id: "cto",
    functionName: "Technology Strategy",
    role: "CTO",
    summary:
      "Sets the technology vision, architecture standards, and engineering direction behind secure, scalable banking platforms.",
    monogram: "CT",
    icon: Code2,
    accent: { start: "#2578ff", end: "#55d6ff", glow: "#38bdf8" },
  },
  {
    id: "cmo",
    functionName: "Marketing & Brand",
    role: "CMO",
    summary:
      "Shapes market positioning, brand strategy, and communication that connects IDSSPL with the institutions it serves.",
    monogram: "CM",
    icon: Megaphone,
    accent: { start: "#6455ff", end: "#b26dff", glow: "#a78bfa" },
  },
  {
    id: "design-lead",
    functionName: "Product Design",
    role: "Design Lead",
    name: "Prathamesh Phadatare",
    summary:
      "Leads the design of clear, intuitive experiences that make sophisticated banking workflows easier to understand and use.",
    monogram: "PP",
    icon: Palette,
    accent: { start: "#8338b5", end: "#d266ff", glow: "#c084fc" },
    photo: prathameshPhoto,
    cardArtwork: prathameshCardArtwork,
  },
  {
    id: "development-lead",
    functionName: "Software Engineering",
    role: "Development Lead",
    name: "Neha Singh",
    summary:
      "Coordinates product engineering with a focus on scalable architecture, dependable delivery, and maintainable software.",
    monogram: "NS",
    icon: Code2,
    accent: { start: "#ff6531", end: "#ffb347", glow: "#fb923c" },
  },
  {
    id: "product-lead",
    functionName: "Product Management",
    role: "Product Lead",
    summary:
      "Turns banking needs into focused product priorities, aligning customer value, domain requirements, and delivery outcomes.",
    monogram: "PL",
    icon: Boxes,
    accent: { start: "#007f89", end: "#35d7c5", glow: "#2dd4bf" },
  },
  {
    id: "delivery-lead",
    functionName: "Projects & Delivery",
    role: "Project / Delivery Lead",
    name: "Devendra Sawant",
    summary:
      "Leads dependable execution, process quality, and coordinated delivery across complex banking technology programs.",
    monogram: "DS",
    icon: Workflow,
    accent: { start: "#2668d8", end: "#54b8ff", glow: "#60a5fa" },
  },
  {
    id: "qa-lead",
    functionName: "Quality Assurance",
    role: "QA Lead",
    summary:
      "Owns the quality strategy that keeps banking products stable, compliant, predictable, and ready for real-world scale.",
    monogram: "QA",
    icon: ShieldCheck,
    accent: { start: "#0f9275", end: "#54df9d", glow: "#34d399" },
  },
  {
    id: "business-sales-lead",
    functionName: "Business & Sales",
    role: "Business / Sales Lead",
    name: "Vishal Singh",
    summary:
      "Builds strategic partnerships, identifies market opportunities, and aligns solutions with long-term client growth.",
    monogram: "VS",
    icon: BriefcaseBusiness,
    accent: { start: "#006ec7", end: "#26d2e8", glow: "#22d3ee" },
  },
];

const teamGroups = ["All Team", "Operations & Administration", "Engineering & AI", "Design"] as const;

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
    id: "omkar-bhagwat",
    name: "Omkar Bhagwat",
    role: "Compliance Security",
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
    id: "sanjay-jangid",
    name: "Sanjay Jangid",
    role: "Software Development",
    group: "Engineering & AI",
    summary: "Builds and supports secure, scalable financial technology products.",
  },
  {
    id: "chetan-patil",
    name: "Chetan Patil",
    role: "AI & Automation",
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

const teamGroupIcons: Record<TeamGroup, typeof Code2> = {
  "Operations & Administration": BriefcaseBusiness,
  "Engineering & AI": Code2,
  Design: Palette,
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

function TeamHeroVisual() {
  return (
    <div className="team-hero-visual" aria-label="Reserved area for the IDSSPL team photograph">
      <div className="team-hero-grid" aria-hidden="true" />
      <div className="team-hero-orbit" aria-hidden="true" />
      <div className="relative z-10 grid h-full grid-cols-6 grid-rows-6 gap-3 p-5 sm:p-8">
        {functionLeads.slice(0, 5).map((lead, index) => (
          <div
            key={lead.id}
            className={`team-hero-person team-hero-person-${index + 1}`}
            style={
              {
                "--team-start": lead.accent.start,
                "--team-end": lead.accent.end,
                "--team-glow": lead.accent.glow,
              } as CSSProperties
            }
          >
            <span>{lead.monogram}</span>
          </div>
        ))}
        <div className="team-hero-label">
          <ImageIcon aria-hidden="true" size={16} />
          <span>Team Image Ready</span>
        </div>
      </div>
    </div>
  );
}

function FunctionLeadCard({
  lead,
  index,
  flipped,
  onFlip,
}: {
  lead: FunctionLead;
  index: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  const Icon = lead.icon;
  const displayName = lead.name ?? "Profile To Be Announced";
  const frontMode = lead.cardArtwork ? " has-artwork" : lead.photo ? " has-photo" : "";

  return (
    <article className={`function-lead-card${frontMode}`} style={cardStyle(lead)}>
      <div className={`function-lead-inner${flipped ? " is-flipped" : ""}`}>
        <button
          type="button"
          className={`function-lead-face function-lead-front text-left${frontMode}`}
          onClick={onFlip}
          aria-label={`View ${lead.role} details`}
        >
          {lead.cardArtwork ? (
            <img
              src={lead.cardArtwork}
              alt=""
              aria-hidden="true"
              className="function-lead-artwork"
              loading="lazy"
            />
          ) : null}
          {lead.photo && !lead.cardArtwork ? (
            <span className="function-lead-photo" aria-hidden="true">
              <img src={lead.photo} alt="" loading="lazy" />
            </span>
          ) : null}
          <span className="function-lead-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="function-lead-icon" aria-hidden="true">
            <Icon size={30} />
          </span>
          {!lead.photo ? (
            <span className="function-lead-monogram" aria-hidden="true">
              {lead.monogram}
            </span>
          ) : null}
          <span className="function-lead-copy mt-auto block">
            <span className="function-lead-function">{lead.functionName}</span>
            <strong className="mt-3 block text-[1.4rem] font-semibold leading-tight tracking-[-0.035em] text-foreground">
              {lead.role}
            </strong>
            <span className={`function-lead-person-name mt-3 block text-[12px] ${lead.name ? "text-muted-foreground" : "text-muted-foreground/65"}`}>
              {displayName}
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
            <h3 className="mt-4 max-w-[12ch] text-2xl font-semibold leading-tight text-foreground">
              {lead.role}
            </h3>
            <p className="mt-2 text-[12px] text-muted-foreground">{displayName}</p>
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

            {lead.name ? (
              lead.linkedin ? (
                <a
                  href={lead.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="function-lead-link mt-3"
                >
                  <Linkedin aria-hidden="true" size={14} />
                  View LinkedIn
                </a>
              ) : (
                <span className="function-lead-link is-pending mt-3">
                  <Linkedin aria-hidden="true" size={14} />
                  LinkedIn Link Pending
                </span>
              )
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function TeamMemberCard({
  member,
  index,
  flipped,
  onFlip,
}: {
  member: TeamMember;
  index: number;
  flipped: boolean;
  onFlip: () => void;
}) {
  const Icon = teamGroupIcons[member.group];

  return (
    <article className="team-card" style={memberStyle(member)}>
      <div className={`team-card-inner${flipped ? " is-flipped" : ""}`}>
        <button
          type="button"
          className="team-card-face team-card-front text-left"
          onClick={onFlip}
          aria-label={`View ${member.name} profile`}
        >
          <span className="team-card-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="team-card-function-icon" aria-hidden="true">
            <Icon size={30} />
          </span>
          <span className={`team-card-photo${member.photo ? " has-photo" : ""}`} aria-hidden="true">
            {member.photo ? (
              <img src={member.photo} alt="" loading="lazy" />
            ) : (
              <span className="team-card-monogram">{getMonogram(member.name)}</span>
            )}
          </span>
          <span className="team-card-copy mt-auto block">
            <span className="team-card-group">{member.group}</span>
            <strong className="mt-3 block text-[1.55rem] font-semibold leading-tight tracking-[-0.035em] text-white">
              {member.role}
            </strong>
            <span className="mt-2 block text-[12px] text-white/62">{member.name}</span>
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
            <h3 className="mt-5 max-w-[12ch] text-2xl font-semibold leading-tight text-white">
              {member.name}
            </h3>
            <p className="mt-2 text-[12px] text-white/62">{member.role}</p>
          </div>
          <p className="mt-8 text-[13px] leading-relaxed text-white/72">{member.summary}</p>
          <div className="mt-auto border-t border-white/12 pt-5">
            <span className="flex items-center gap-2 text-[11px] text-white/52">
              <UserRound aria-hidden="true" size={14} />
              {member.photo ? "Profile Image Added" : "Personal Image Coming Soon"}
            </span>
            {member.linkedin ? (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="team-linkedin mt-4"
              >
                <Linkedin aria-hidden="true" size={14} />
                View LinkedIn
                <ArrowUpRight aria-hidden="true" size={13} />
              </a>
            ) : (
              <span className="team-linkedin is-pending mt-4">
                <Linkedin aria-hidden="true" size={14} />
                LinkedIn Link Pending
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function OurTeam() {
  const [flippedId, setFlippedId] = useState<string | null>(null);
  const [showFullTeam, setShowFullTeam] = useState(false);
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

  const revealFullTeam = () => {
    if (showFullTeam) {
      fullTeamRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setShowFullTeam(true);
  };

  return (
    <main id="team">
      <section className="team-hero border-b border-hairline pt-24 pb-14 md:pt-32 md:pb-18">
        <div className="shell grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Our Team</p>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="display mt-7 max-w-[11ch] text-[clamp(3rem,6.4vw,6rem)] text-foreground">
                The People Behind Intelligent Banking.
              </h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                Functional leaders supported by a multidisciplinary team of banking,
                engineering, delivery, growth, quality, and design specialists.
              </p>
            </Reveal>
            <Reveal delay={210}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <span className="glass-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] text-foreground/75">
                  <Sparkles aria-hidden="true" size={14} className="text-cyan" />
                  40+ People
                </span>
                <span className="glass-button rounded-full px-4 py-2 text-[11px] text-foreground/75">
                  8 Core Functions
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

      <section className="team-showcase border-b border-hairline py-18 md:py-26">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Reveal>
                <p className="eyebrow">Functional Leadership</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-7 max-w-[12ch] text-[clamp(2.5rem,5.2vw,4.8rem)] text-foreground">
                  Eight Functions. One Shared Direction.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <Reveal delay={140}>
                <p className="max-w-lg text-[14px] leading-relaxed text-muted-foreground">
                  Meet the people responsible for the disciplines that shape our products,
                  delivery, customer relationships, and technology direction.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="function-lead-grid mt-11 md:mt-14">
            {functionLeads.map((lead, index) => (
              <Reveal key={lead.id} delay={80 + (index % 4) * 70} className="h-full">
                <FunctionLeadCard
                  lead={lead}
                  index={index}
                  flipped={flippedId === lead.id}
                  onFlip={() => setFlippedId((current) => (current === lead.id ? null : lead.id))}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="full-team-section border-b border-hairline py-14 md:py-18">
        <div className="shell">
          <Reveal>
            <div className="full-team-cta">
              <div>
                <p className="eyebrow">Meet The Full Team</p>
                <h2 className="display mt-6 max-w-[12ch] text-[clamp(2.5rem,5vw,4.6rem)] text-foreground">
                  40+ People. One Team.
                </h2>
                <p className="mt-6 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">
                  Behind every functional lead is a wider team of specialists working
                  together to build, deliver, and support dependable financial technology.
                </p>
              </div>
              <button
                type="button"
                onClick={revealFullTeam}
                aria-controls="full-team"
                aria-expanded={showFullTeam}
                className="shiny-button inline-flex w-fit items-center justify-center gap-2 rounded-full px-6 py-3 text-[12px] font-semibold"
              >
                Meet Our Full Team
                <ArrowDown aria-hidden="true" size={15} />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {showFullTeam ? (
      <section ref={fullTeamRef} id="full-team" className="team-directory border-b border-hairline py-16 md:py-22">
        <div className="shell">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow">Full Team Directory</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="display mt-6 max-w-[13ch] text-[clamp(2.6rem,5.1vw,4.7rem)] text-foreground">
                  Meet The People Who Make It Possible.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <Reveal delay={140}>
                <p className="max-w-lg text-[14px] leading-relaxed text-muted-foreground">
                  Meet the people building, delivering, and supporting IDSSPL across every function.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={170}>
            <div className="mt-10 flex flex-col gap-6 md:mt-12 md:flex-row md:items-center md:justify-between">
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
            <div className="team-carousel-wrap mt-8">
              <div ref={teamCarouselRef} className="team-carousel" aria-live="polite">
                {visibleTeamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    index={index}
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
                  <span style={{ transform: `scaleX(${Math.min(1, 4 / visibleTeamMembers.length)})` }} />
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
