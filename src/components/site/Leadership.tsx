import { Reveal } from "./Reveal";

import vinayakImg from "@/assets/vinayak-more.jpg.asset.json";
import vishalImg from "@/assets/vishal-singh.jpg.asset.json";
import surajImg from "@/assets/suraj-pathak.jpg.asset.json";
import arunImg from "@/assets/arun-gavas.jpg.asset.json";
import devendraImg from "@/assets/devendra-sawant.jpg.asset.json";

const leaders = [
  {
    name: "Vinayak More",
    role: "Associate Director & CEO",
    focus: "Banking & Strategy",
    experience: "25+ years",
    photo: vinayakImg.url,
    bio: "With deep expertise across Core Banking, Digital Banking, UPI issuing & acquiring, ATM, POS, AePS, merchant management and digital payments, he leads IDSSPL's strategy to deliver secure, scalable, compliant and future-ready banking solutions.",
  },
  {
    name: "Vishal Singh",
    role: "Director — Sales & Growth",
    focus: "Markets & Partnerships",
    experience: "10+ years",
    photo: vishalImg.url,
    bio: "A strong understanding of the fintech and banking landscape enables him to identify new opportunities and expand market presence. His client-centric approach aligns every solution with business goals and long-term success.",
  },
  {
    name: "Suraj Pathak",
    role: "Director — Operations",
    focus: "Operational Excellence",
    experience: "12+ years",
    photo: surajImg.url,
    bio: "He specialises in optimising workflows, improving operational efficiency and maintaining high standards of service delivery, ensuring every project is executed with precision and consistency.",
  },
];

const coreTeam = [
  {
    name: "Arun Gavas",
    role: "VP — CBS",
    photo: arunImg.url,
    description: "Core banking specialist with strong technical and domain expertise.",
  },
  {
    name: "Devendra Sawant",
    role: "VP — Operations",
    photo: devendraImg.url,
    description: "Operations leader focused on optimization, delivery excellence and team empowerment.",
  },
];


export function Leadership() {
  return (
    <section id="leadership" className="border-t border-hairline py-28 md:py-44">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow">Leadership</p>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display mt-8 max-w-[12ch] text-[clamp(2.3rem,5.4vw,4.8rem)] text-foreground">
                Experience that moves banking forward.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:flex lg:items-end">
            <Reveal delay={150}>
              <p className="max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                A team of banking technologists, growth strategists and operators combining
                deep industry expertise with a clear vision for the future of financial
                infrastructure.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 border-t border-hairline md:mt-28">
          {leaders.map((leader, index) => (
            <Reveal key={leader.name} delay={index * 70}>
              <article className="group grid gap-7 border-b border-hairline py-10 md:grid-cols-12 md:items-center md:gap-10 md:py-12">
                <div className="flex items-center gap-5 md:col-span-4">
                  <img
                    src={leader.photo}
                    alt={`${leader.name}, ${leader.role} at IDSSPL`}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-md border border-hairline object-cover grayscale transition duration-700 group-hover:grayscale-0"
                  />
                  <div>
                    <p className="text-[11px] text-muted-foreground">0{index + 1}</p>
                    <h3 className="mt-1 text-xl font-medium text-foreground">{leader.name}</h3>
                  </div>
                </div>


                <div className="md:col-span-3">
                  <p className="text-[13.5px] text-foreground">{leader.role}</p>
                  <p className="mt-1 text-[12.5px] text-cyan">{leader.focus}</p>
                  <p className="mt-3 text-[11px] text-muted-foreground">
                    {leader.experience} experience
                  </p>
                </div>

                <p className="max-w-lg text-[13.5px] leading-relaxed text-muted-foreground md:col-span-5">
                  {leader.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-10 border-b border-hairline pb-12 md:grid-cols-12 md:items-start">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">Core team</p>
            <h3 className="display mt-6 text-[clamp(1.8rem,3.2vw,2.8rem)] text-foreground">
              Domain depth.<br />Delivery discipline.
            </h3>
          </Reveal>

          <div className="grid gap-px bg-hairline md:col-span-8 md:grid-cols-2">
            {coreTeam.map((member, i) => (
              <Reveal key={member.name} delay={100 + i * 80}>
                <article className="min-h-48 bg-background p-7 md:p-9">
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role} at IDSSPL`}
                    loading="lazy"
                    className="h-16 w-16 rounded-md border border-hairline object-cover grayscale"
                  />
                  <h4 className="mt-6 text-lg font-medium text-foreground">{member.name}</h4>
                  <p className="mt-1 text-[12.5px] text-cyan">{member.role}</p>
                  <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
                    {member.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}