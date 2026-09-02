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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDSSPL | AI Banking Infrastructure, Core Banking & Payments" },
      {
        name: "description",
        content:
          "IDSSPL delivers AI-powered core banking, NPCI payments, digital banking, merchant, card, and enterprise technology for banks, co-operative banks, NBFCs, fintechs, and payment providers.",
      },
      {
        name: "keywords",
        content:
          "AI core banking software, digital banking platform, NPCI payment products, banking technology company India, co-operative bank software, NBFC technology, fintech infrastructure, card management, merchant management, IDSSPL",
      },
      { name: "robots", content: "index, follow" },
      {
        property: "og:title",
        content: "IDSSPL | Intelligent Infrastructure for the Future of Banking",
      },
      {
        property: "og:description",
        content:
          "Secure, scalable banking technology for core banking, digital payments, cards, merchants, and enterprise operations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/" }],
  }),
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
