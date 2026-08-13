import { Reveal } from "./Reveal";

const institutions = [
  "Shri Gajanan Nagari Sah. Patsantha",
  "Shiroda Progressive Urban Co-Op",
  "Shri Vasantrao Chougule Patsantha",
  "Kolhapur District Co-Op Bank",
  "Sahyadri Urban Credit Society",
  "Konkan Nagari Sah. Bank",
];

export function TrustedBy() {
  const strip = [...institutions, ...institutions];

  return (
    <section className="border-y border-hairline py-14">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Trusted by financial institutions</p>
        </Reveal>
      </div>
      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="flex w-max items-center gap-16 whitespace-nowrap"
          style={{ animation: "marquee 46s linear infinite" }}
        >
          {strip.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-[13px] tracking-[0.06em] text-muted-foreground/45 uppercase transition-colors duration-500 hover:text-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}