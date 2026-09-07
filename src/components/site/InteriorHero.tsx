import { Reveal } from "./Reveal";
import { CinematicMedia } from "./CinematicMedia";

type InteriorHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
  video?: string;
  videoPoster?: string;
  videoLabel?: string;
};

export function InteriorHero({
  eyebrow,
  title,
  body,
  video,
  videoPoster,
  videoLabel,
}: InteriorHeroProps) {
  return (
    <section className="interior-hero relative overflow-hidden border-b border-hairline px-0 pt-24 pb-12 md:pt-28 md:pb-16">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-electric/15 blur-[110px]" />
      <div className={`shell interior-hero-layout relative ${video ? "has-media" : ""}`}>
        <div className="interior-hero-copy">
          <Reveal>
            <p className="eyebrow">{eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display mt-6 max-w-[15ch] text-[clamp(2.6rem,4.8vw,4.8rem)] text-foreground">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              {body}
            </p>
          </Reveal>
        </div>

        {video ? (
          <Reveal delay={120} className="interior-hero-media-shell">
            <div className="interior-hero-media" aria-label={videoLabel}>
              <CinematicMedia
                className="interior-hero-video"
                video={video}
                poster={videoPoster ?? ""}
                alt={videoLabel ?? "Animated IDSSPL banking technology visual"}
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
