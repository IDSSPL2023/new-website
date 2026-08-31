import { createFileRoute } from "@tanstack/react-router";
import { AboutCompany } from "@/components/site/AboutCompany";
import { InteriorHero } from "@/components/site/InteriorHero";
import { TechApproach } from "@/components/site/TechApproach";
import { Certifications } from "@/components/site/Certifications";
import { Faq } from "@/components/site/Faq";
import { SitePage } from "@/components/site/SitePage";
import aboutLogoReveal from "@/assets/about-logo-reveal.mp4";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About IDSSPL | Banking Technology & Financial Infrastructure" },
      {
        name: "description",
        content:
          "Learn how IDSSPL delivers secure core banking, digital banking, payment switching, card management, and financial infrastructure for institutions.",
      },
      {
        name: "keywords",
        content:
          "banking technology company, core banking solutions, digital banking platform, payment switching, financial technology infrastructure, IDSSPL",
      },
      { name: "robots", content: "index, follow" },
      {
        property: "og:title",
        content: "About IDSSPL | Banking Technology & Financial Infrastructure",
      },
      {
        property: "og:description",
        content:
          "Secure, scalable banking platforms and digital financial infrastructure engineered for banks, fintech companies, and financial institutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "About IDSSPL | Banking Technology & Financial Infrastructure",
      },
      {
        name: "twitter:description",
        content:
          "Discover IDSSPL's banking expertise, secure financial platforms, mission, vision, and technology capabilities.",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SitePage>
      <InteriorHero
        eyebrow="About IDSSPL"
        title="Technology Built For Modern Banking."
        body="IDSSPL designs secure banking platforms and digital financial infrastructure that help banks, fintech companies, and financial institutions modernize operations, connect payment ecosystems, and grow with confidence."
        video={aboutLogoReveal}
        videoLabel="Animated IDSSPL logo reveal"
      />
      <AboutCompany />
      <TechApproach />
      <Certifications />
      <Faq />
    </SitePage>
  );
}
