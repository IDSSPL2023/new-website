import { createFileRoute } from "@tanstack/react-router";
import { AboutCompany } from "@/components/site/AboutCompany";
import { InteriorHero } from "@/components/site/InteriorHero";
import { TechApproach } from "@/components/site/TechApproach";
import { Certifications } from "@/components/site/Certifications";
import { Faq } from "@/components/site/Faq";
import { SitePage } from "@/components/site/SitePage";
import aboutLogoReveal from "@/assets/about-logo-reveal.mp4";
import aboutLogoPoster from "@/assets/idsspl-logo-light.png";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    createSeoHead({
      title: "About IDSSPL | Banking Technology Infrastructure",
      description:
        "Learn how IDSSPL delivers secure core banking, digital banking, payment switching, card management and financial infrastructure for institutions.",
      path: "/about",
      keywords:
        "banking technology company, core banking solutions, digital banking platform, payment switching, financial technology infrastructure, IDSSPL",
      imageAlt: "About IDSSPL banking technology and financial infrastructure",
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
        videoPoster={aboutLogoPoster}
        videoLabel="Animated IDSSPL logo reveal"
      />
      <AboutCompany />
      <TechApproach />
      <Certifications />
      <Faq />
    </SitePage>
  );
}
