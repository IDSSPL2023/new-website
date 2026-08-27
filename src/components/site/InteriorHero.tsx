import { Reveal } from "./Reveal";

type InteriorHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function InteriorHero({ eyebrow, title, body }: InteriorHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-hairline px-0 pt-28 pb-16 md:pt-36 md:pb-20">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-electric/15 blur-[110px]" />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="display mt-8 max-w-[14ch] text-[clamp(2.8rem,7vw,6.4rem)] text-foreground">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={150}>
          <p className="mt-9 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
            {body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
