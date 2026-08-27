import { createFileRoute } from "@tanstack/react-router";
import { InteriorHero } from "@/components/site/InteriorHero";
import { TechApproach } from "@/components/site/TechApproach";
import { Security } from "@/components/site/Security";
import { Certifications } from "@/components/site/Certifications";
import { FinalCta } from "@/components/site/FinalCta";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — IDSSPL" },
      {
        name: "description",
        content: "Learn how IDSSPL builds secure, scalable and reliable financial technology infrastructure.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SitePage>
      <InteriorHero
        eyebrow="About IDSSPL"
        title="Technology foundations for modern finance."
        body="IDSSPL is a banking technology partner focused on secure architecture, dependable delivery and infrastructure that helps financial institutions operate and grow with confidence."
      />
      <TechApproach />
      <Security />
      <Certifications />
      <FinalCta />
    </SitePage>
  );
}
