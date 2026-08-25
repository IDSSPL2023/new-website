import { createFileRoute } from "@tanstack/react-router";

import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { TrustedBy } from "@/components/site/TrustedBy";
import { ProductSection, type Product } from "@/components/site/ProductSection";
import { AILayer } from "@/components/site/AILayer";
import { TechApproach } from "@/components/site/TechApproach";
import { Security } from "@/components/site/Security";
import { Leadership } from "@/components/site/Leadership";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { Certifications } from "@/components/site/Certifications";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

import coreBankingUi from "@/assets/core-banking-ui.jpg";
import paymentSwitching from "@/assets/payment-switching.jpg";
import cardsImg from "@/assets/cards.jpg";
import riskUi from "@/assets/risk-compliance-ui.jpg";
import reconciliation from "@/assets/reconciliation.jpg";
import infrastructure from "@/assets/infrastructure.jpg";

import coreBankingVideo from "@/assets/core-banking-ui.mp4.asset.json";
import paymentSwitchingVideo from "@/assets/payment-switching.mp4.asset.json";
import cardsVideo from "@/assets/cards.mp4.asset.json";
import riskVideo from "@/assets/risk-compliance-ui.mp4.asset.json";
import reconciliationVideo from "@/assets/reconciliation.mp4.asset.json";
import infrastructureVideo from "@/assets/infrastructure.mp4.asset.json";

const products: Product[] = [
  {
    index: "01",
    label: "Core & Digital Banking",
    heading: ["AI-Powered", "Next-Generation", "Core Banking"],
    body: "Redefine banking with an AI-enabled core banking platform designed to simplify operations, empower employees, and enhance customer experiences through intelligent automation and advanced analytics.",
    points: [
      "AI-powered management dashboards, chatbot assistance and natural language reporting.",
      "Drag-and-drop AI report builder with integrated Data Lake for instant business insights.",
      "Multi-language support, customizable user experience and enterprise-grade security.",
    ],
    cta: "Explore core banking",
    image: coreBankingUi,
    video: coreBankingVideo.url,
    alt: "AI management dashboard of the IDSSPL core banking platform",
  },
  {
    index: "02",
    label: "Payment Switching",
    heading: ["UPI, IMPS & ATM", "Switching at", "national scale"],
    body: "A high-throughput switching platform that routes transactions across UPI, IMPS, ATM networks and payment gateways with deterministic performance and full traceability.",
    points: [
      "Intelligent transaction routing across channels and acquirers.",
      "Real-time monitoring of authorisation, decline and settlement flows.",
      "Resilient architecture engineered for continuous availability.",
    ],
    cta: "Explore switching",
    image: paymentSwitching,
    video: paymentSwitchingVideo.url,
    alt: "3D visualization of a payment switching network routing transactions",
    reverse: true,
  },
  {
    index: "03",
    label: "Card & Payment Management",
    heading: ["Complete card", "and payment", "lifecycle control"],
    body: "Issue, manage and monitor cards across the full lifecycle with a unified management console covering authorisation, limits, disputes and transaction intelligence.",
    points: [
      "Card issuance, activation, limits and lifecycle management.",
      "Transaction monitoring with dispute and chargeback workflows.",
      "Integration with existing switching and core banking systems.",
    ],
    cta: "Explore card management",
    image: cardsImg,
    video: cardsVideo.url,
    alt: "3D stack of premium matte black and chrome banking cards",
  },
  {
    index: "04",
    label: "Risk & Compliance",
    heading: ["Financial risk,", "continuously", "under control"],
    body: "A risk and compliance platform that surfaces exposure in real time, automates regulatory workflows and maintains a complete, auditable record of every action.",
    points: [
      "Real-time risk scoring and fraud monitoring.",
      "Regulatory reporting with comprehensive audit trails.",
      "Role-based access control and policy management.",
    ],
    cta: "Explore risk & compliance",
    image: riskUi,
    video: riskVideo.url,
    alt: "Enterprise risk and compliance monitoring interface",
    reverse: true,
  },
  {
    index: "05",
    label: "Reconciliation & Settlement",
    heading: ["Every transaction", "reconciled.", "Every cycle settled."],
    body: "Automated reconciliation and settlement engines that converge transaction data from every channel into a single, accurate and auditable financial position.",
    points: [
      "Multi-source matching across switches, banks and networks.",
      "Exception management with automated resolution workflows.",
      "Faster settlement cycles with reduced operational risk.",
    ],
    cta: "Explore reconciliation",
    image: reconciliation,
    video: reconciliationVideo.url,
    alt: "Transaction data streams converging into a reconciliation engine",
  },
  {
    index: "06",
    label: "Secure Networking & Infrastructure",
    heading: ["Infrastructure", "engineered for", "financial uptime"],
    body: "Secure networking and infrastructure services that keep banking systems connected, protected and performant across branches, data centres and channels.",
    points: [
      "Hardened network design with segmentation and encryption.",
      "High-availability data centre and branch connectivity.",
      "Continuous monitoring and infrastructure support.",
    ],
    cta: "Explore infrastructure",
    image: infrastructure,
    video: infrastructureVideo.url,
    alt: "3D enterprise server infrastructure network",
    reverse: true,
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDSSPL — The Infrastructure Behind Modern Banking" },
      {
        name: "description",
        content:
          "IDSSPL builds secure, scalable, AI-powered core banking, payments, cards, risk and infrastructure technology for banks and financial institutions.",
      },
      { property: "og:title", content: "IDSSPL — The Infrastructure Behind Modern Banking" },
      {
        property: "og:description",
        content:
          "Secure, scalable and future-ready banking technology: AI-powered core banking, UPI/IMPS/ATM switching, cards, risk and settlement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustedBy />
        <Statement />
        <div id="products">
          {products.map((p) => (
            <ProductSection key={p.index} product={p} />
          ))}
        </div>
        <div id="solutions">
          <AILayer />
        </div>
        <TechApproach />
        <Security />
        <Leadership />
        <Testimonials />
        <Faq />
        <Certifications />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
