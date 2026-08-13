import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export type Product = {
  index: string;
  label: string;
  heading: string[];
  body: string;
  points: string[];
  cta: string;
  image: string;
  alt: string;
  reverse?: boolean;
};

export function ProductSection({ product }: { product: Product }) {
  return (
    <section className="border-t border-hairline py-28 md:py-40">
      <div className="shell">
        <div
          className={cn(
            "grid items-center gap-14 lg:grid-cols-12 lg:gap-20",
            product.reverse && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="text-[11px] tracking-[0.2em] text-electric">
                  {product.index}
                </span>
                <span className="h-px w-8 bg-hairline" />
                <span className="eyebrow">{product.label}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="display mt-8 text-[clamp(1.9rem,3.9vw,3.4rem)] text-foreground">
                {product.heading.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </Reveal>

            <Reveal delay={150}>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                {product.body}
              </p>
            </Reveal>

            <Reveal delay={210}>
              <ul className="mt-9 space-y-3.5 border-t border-hairline pt-8">
                {product.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[13.5px] text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-electric" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260}>
              <a
                href="#contact"
                className="group mt-10 inline-flex items-center gap-2 text-[13.5px] font-medium text-foreground"
              >
                {product.cta}
                <ArrowRight className="h-3.5 w-3.5 text-electric transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <div className="frame group relative overflow-hidden rounded-2xl p-1.5 transition-all duration-700 hover:shadow-[0_40px_120px_-40px_color-mix(in_oklab,var(--electric)_45%,transparent)]">
                <img
                  src={product.image}
                  alt={product.alt}
                  loading="lazy"
                  width={1408}
                  height={1008}
                  className="w-full rounded-xl object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}