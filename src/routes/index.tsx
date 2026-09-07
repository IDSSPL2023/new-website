import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { HomeProductOverview } from "@/components/site/HomeProductOverview";
import { AILayer } from "@/components/site/AILayer";
import { CertificateTrust } from "@/components/site/CertificateTrust";
import { Faq } from "@/components/site/Faq";
import {
  BankingArchitectureFlow,
  CustomerOutcomes,
  HomeTrustMetrics,
  IndustrySolutions,
} from "@/components/site/HomeJourney";
import { SitePage } from "@/components/site/SitePage";
import { createSeoHead } from "@/lib/seo";
import heroPoster from "@/assets/idsspl-hero-poster.jpg";

export const Route = createFileRoute("/")({
  head: () => {
    const seo = createSeoHead({
      title: "IDSSPL | AI Core Banking, Digital Banking & Payments",
      description:
        "IDSSPL provides AI-powered core banking, NPCI payments, digital banking, card and merchant platforms for banks, NBFCs and financial institutions.",
      path: "/",
      keywords:
        "AI core banking software, digital banking platform, NPCI payment products, banking technology company India, co-operative bank software, NBFC technology, fintech infrastructure, card management, merchant management, IDSSPL",
      imageAlt: "IDSSPL infrastructure for AI-powered core banking and digital payments",
    });

    return {
      ...seo,
      links: [...seo.links, { rel: "preload", href: heroPoster, as: "image", type: "image/jpeg" }],
    };
  },
  component: HomePage,
});

function HomePage() {
  return (
    <SitePage>
      <Hero />
      <HomeTrustMetrics />
      <HomeProductOverview />
      <AILayer />
      <BankingArchitectureFlow />
      <IndustrySolutions />
      <CertificateTrust />
      <CustomerOutcomes />
      <Faq />
    </SitePage>
  );
}
