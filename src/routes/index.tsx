import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { HomeProductOverview } from "@/components/site/HomeProductOverview";
import { AILayer } from "@/components/site/AILayer";
import { CertificateTrust } from "@/components/site/CertificateTrust";
import { Testimonials } from "@/components/site/Testimonials";
import { Faq } from "@/components/site/Faq";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDSSPL | AI-Powered Core Banking & Digital Payments" },
      {
        name: "description",
        content:
          "IDSSPL delivers AI-powered core banking, NPCI payment products, digital banking, merchant, card, and enterprise technology for financial institutions.",
      },
      {
        name: "keywords",
        content:
          "AI core banking software, digital banking platform, NPCI payment products, banking technology company India, card management, merchant management, IDSSPL",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "IDSSPL | Intelligent Banking Infrastructure" },
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
      <Statement />
      <HomeProductOverview />
      <AILayer />
      <CertificateTrust />
      <Testimonials />
      <Faq />
    </SitePage>
  );
}
