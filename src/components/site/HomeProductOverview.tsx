import { ArrowRight } from "lucide-react";

import coreBanking from "@/assets/core-banking-ui.jpg";
import coreBankingVideo from "@/assets/core-banking-ui.mp4";
import paymentSwitching from "@/assets/payment-switching.jpg";
import paymentSwitchingVideo from "@/assets/payment-switching.mp4";
import reconciliation from "@/assets/reconciliation.jpg";
import reconciliationVideo from "@/assets/reconciliation.mp4";
import vault from "@/assets/vault.jpg";
import vaultVideo from "@/assets/vault.mp4";

import { CinematicMedia } from "./CinematicMedia";
import { Reveal } from "./Reveal";

const featuredProducts = [
  {
    label: "Next Gen AI Core Banking Solution",
    description: "An intelligent foundation for secure, scalable, customer-centric banking.",
    href: "/products#next-gen-ai-core-banking",
    image: coreBanking,
    video: coreBankingVideo,
    alt: "IDSSPL core and digital banking platform",
  },
  {
    label: "NPCI Products",
    description: "Integrated rails for secure, seamless, real-time digital transactions.",
    href: "/products#npci-products",
    image: paymentSwitching,
    video: paymentSwitchingVideo,
    alt: "IDSSPL payment switching network",
  },
  {
    label: "Digital Banking Products",
    description: "Connected customer journeys across web, mobile, messaging, and self-service.",
    href: "/products#digital-banking-products",
    image: vault,
    video: vaultVideo,
    alt: "IDSSPL digital banking products",
  },
  {
    label: "Enterprise Solution",
    description: "Connected automation and control across critical banking operations.",
    href: "/products#enterprise-solution",
    image: reconciliation,
    video: reconciliationVideo,
    alt: "IDSSPL enterprise banking solution",
  },
];

export function HomeProductOverview() {
  return (
    <section className="home-products border-t border-hairline py-16 md:py-22">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Explore Our Core Products</p>
            </Reveal>
            <Reveal delay={70}>
              <h2 className="display section-heading-title text-foreground">
                One Connected Product Ecosystem.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={130}>
            <div className="home-products-intro">
              <p className="section-heading-copy">
                Start with four product families, then explore the complete portfolio of core,
                payments, digital, enterprise, merchant, and card technologies.
              </p>
              <a href="/products">
                Explore All Products
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="home-product-grid mt-9 md:mt-12">
          {featuredProducts.map((product, productIndex) => (
            <Reveal key={product.label} delay={80 + productIndex * 70}>
              <a href={product.href} className="home-product-card group">
                <CinematicMedia
                  video={product.video}
                  poster={product.image}
                  alt={product.alt}
                  pauseWhenHidden={false}
                  className="home-product-media"
                />
                <span className="home-product-overlay" aria-hidden="true" />
                <span className="home-product-copy">
                  <strong>{product.label}</strong>
                  <span>{product.description}</span>
                  <span className="home-product-link">
                    View Product Overview
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
