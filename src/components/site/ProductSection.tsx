import subproductModuleIcon from "@/assets/product-icons/subproduct-module-3d.jpg";

import { CinematicMedia } from "./CinematicMedia";
import { Reveal } from "./Reveal";

export type ProductPoint = {
  title: string;
  description: string;
};

export type Product = {
  id: string;
  label: string;
  shortDescription: string;
  heading: string[];
  overview: string[];
  subProducts: string[];
  keyFeatures: ProductPoint[];
  featureIcons: string[];
  benefits: ProductPoint[];
  benefitIcons: string[];
  image: string;
  video: string;
  alt: string;
};

function ProductPointGrid({
  eyebrow,
  title,
  introduction,
  points,
  icons,
  variant,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  points: ProductPoint[];
  icons: string[];
  variant: "feature" | "benefit";
}) {
  return (
    <section className={`product-point-section product-point-section-${variant}`}>
      <Reveal>
        <div className="product-point-heading">
          <div>
            <span>{eyebrow}</span>
            <h3>{title}</h3>
          </div>
          <p>{introduction}</p>
        </div>
      </Reveal>

      <div className="product-point-grid">
        {points.map((point, index) => {
          const icon = icons[index % icons.length];
          return (
            <Reveal key={point.title} delay={50 + index * 55}>
              <article className="product-point-card">
                <span className="product-point-icon" aria-hidden="true">
                  <img src={icon} alt="" loading="lazy" decoding="async" />
                </span>
                <div>
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ProductSection({ product }: { product: Product }) {
  return (
    <section id={product.id} className="product-detail-section product-single-detail">
      <div className="shell">
        <div className="product-detail-hero">
          <Reveal className="product-detail-hero-copy">
            <div className="product-detail-kicker">
              <span>{product.label}</span>
            </div>
            <h2 className="display product-detail-title" aria-label={product.heading.join(" ")}>
              {product.heading.map((line) => (
                <span key={line} aria-hidden="true">
                  {line}{" "}
                </span>
              ))}
            </h2>
            <p className="product-detail-summary">{product.shortDescription}</p>
            <div className="product-detail-overview">
              <span>Overview</span>
              {product.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="product-detail-hero-media">
            <div className="product-cinematic-frame group">
              <CinematicMedia
                video={product.video}
                poster={product.image}
                alt={product.alt}
                className="product-cinematic-media"
              />
              <div className="product-cinematic-shade" aria-hidden="true" />
              <div className="product-cinematic-label">
                <span>Product Experience</span>
                <strong>{product.label}</strong>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <section className="product-subproducts-section">
            <div className="product-point-heading">
              <div>
                <span>Connected Product Ecosystem</span>
                <h3>Sub-products</h3>
              </div>
              <p>
                Modular capabilities that can be adopted independently or connected as one cohesive
                banking platform.
              </p>
            </div>
            <div className="product-subproduct-grid">
              {product.subProducts.map((item) => (
                <article key={item}>
                  <span className="product-subproduct-icon" aria-hidden="true">
                    <img src={subproductModuleIcon} alt="" loading="lazy" decoding="async" />
                  </span>
                  <strong>{item}</strong>
                </article>
              ))}
            </div>
          </section>
        </Reveal>

        <ProductPointGrid
          eyebrow="Platform Capability"
          title="Key Features"
          introduction="Purpose-built technology that brings intelligence, control, security, and operational depth into every banking workflow."
          points={product.keyFeatures}
          icons={product.featureIcons}
          variant="feature"
        />

        <ProductPointGrid
          eyebrow="Measurable Business Value"
          title="Benefits"
          introduction="Clear operational and customer outcomes designed to improve efficiency today while creating room for sustainable growth."
          points={product.benefits}
          icons={product.benefitIcons}
          variant="benefit"
        />
      </div>
    </section>
  );
}
