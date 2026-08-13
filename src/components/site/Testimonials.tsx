import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const stories = [
  {
    quote:
      "The CBS implementation was handled seamlessly from start to finish. Their team was highly responsive and provided excellent support at every stage.",
    name: "Shri Gajanan Nagari Sah. Patsantha Mry.",
    location: "Patolewadi, Kolhapur",
  },
  {
    quote:
      "The solution delivered is secure, scalable, and performs exceptionally well. It has significantly improved our operational efficiency and system reliability.",
    name: "The Shiroda Progressive Urban Co-Op. Credit Society Ltd.",
    location: "Shiroda, Goa",
  },
  {
    quote:
      "Working with IDSSPL has been a great experience. Their deep understanding of banking systems and reliable approach made the entire process smooth and efficient.",
    name: "Shri Vasantrao Chougule Patsantha",
    location: "Kolhapur",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const s = stories[i] ?? stories[0]!;

  return (
    <section id="resources" className="border-t border-hairline py-32 md:py-48">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">What our customers say</p>
        </Reveal>

        <div className="mt-14 min-h-[320px] md:min-h-[300px]">
          <blockquote key={i} className="animate-fade-in">
            <p className="display max-w-[24ch] text-[clamp(1.6rem,3.5vw,3rem)] text-foreground">
              “{s.quote}”
            </p>
            <footer className="mt-12 flex items-center gap-4">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-hairline bg-surface text-[11px] text-electric">
                {s.name.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <p className="text-[13.5px] text-foreground">{s.name}</p>
                <p className="text-[12.5px] text-muted-foreground">{s.location}</p>
              </div>
            </footer>
          </blockquote>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <button
            aria-label="Previous story"
            onClick={() => setI((v) => (v - 1 + stories.length) % stories.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors duration-300 hover:bg-surface hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next story"
            onClick={() => setI((v) => (v + 1) % stories.length)}
            className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors duration-300 hover:bg-surface hover:text-foreground"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
          <span className="ml-3 text-[12px] text-muted-foreground">
            {String(i + 1).padStart(2, "0")} / {String(stories.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}