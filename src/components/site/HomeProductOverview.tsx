import { ArrowRight } from "lucide-react";

import cardManagement from "@/assets/product-showcase-generated/card-management.jpg";
import coreBanking from "@/assets/product-showcase-generated/core-banking.jpg";
import digitalBanking from "@/assets/product-showcase-generated/digital-banking.jpg";
import enterpriseSolution from "@/assets/product-showcase-generated/enterprise-solution.jpg";
import merchantManagement from "@/assets/product-showcase-generated/merchant-management.jpg";
import npciProducts from "@/assets/product-showcase-generated/npci-products.jpg";

import { Reveal } from "./Reveal";

const featuredProducts = [
  {
    label: "Next Gen AI Core Banking Solution",
    description: "An intelligent foundation for secure, scalable, customer-centric banking.",
    href: "/products#next-gen-ai-core-banking",
    image: coreBanking,
    alt: "AI-powered core banking infrastructure with connected data and intelligence systems",
  },
  {
    label: "NPCI Products",
    description: "Integrated rails for secure, seamless, real-time digital transactions.",
    href: "/products#npci-products",
    image: npciProducts,
    alt: "Connected NPCI payment channels with banking, ATM, mobile, and merchant terminals",
  },
  {
    label: "Digital Banking Products",
    description: "Connected customer journeys across web, mobile, messaging, and self-service.",
    href: "/products#digital-banking-products",
    image: digitalBanking,
    alt: "Secure mobile and web digital banking experience",
  },
  {
    label: "Enterprise Solution",
    description: "Connected automation and control across critical banking operations.",
    href: "/products#enterprise-solution",
    image: enterpriseSolution,
    alt: "Enterprise banking workflow automation and connected operations",
  },
  {
    label: "Merchant Management Solution",
    description: "Connected onboarding, QR operations, servicing, settlement, and intelligence.",
    href: "/products#merchant-management-solution",
    image: merchantManagement,
    alt: "Merchant management network with point-of-sale, QR, analytics, and settlement systems",
  },
  {
    label: "Card Management",
    description: "Secure issuance, controls, monitoring, and complete card lifecycle operations.",
    href: "/products#card-management",
    image: cardManagement,
    alt: "Secure card management ecosystem with issuance, controls, and analytics",
  },
];

export function HomeProductOverview() {
  return (
    <section className="home-products border-t border-hairline py-16 md:py-22">
      <div className="shell">
        <div className="section-heading-split">
          <div>
            <Reveal>
              <p className="eyebrow">Product Ecosystem</p>
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
                Explore six connected product families spanning core banking, payments, digital
                channels, enterprise operations, merchants, and cards.
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
                <span className="home-product-visual">
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="home-product-media"
                    loading="lazy"
                    decoding="async"
                    width={1672}
                    height={941}
                  />
                </span>
                <span className="home-product-motion" aria-hidden="true" />
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
