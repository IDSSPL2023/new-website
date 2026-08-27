import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { Statement } from "@/components/site/Statement";
import { AILayer } from "@/components/site/AILayer";
import { Testimonials } from "@/components/site/Testimonials";
import { BrochureDownload } from "@/components/site/BrochureDownload";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IDSSPL — The Infrastructure Behind Modern Banking" },
      {
        name: "description",
        content:
          "IDSSPL builds secure, scalable, AI-powered banking and payments technology for financial institutions.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SitePage>
      <Hero />
      <Statement />
      <AILayer />
      <Testimonials />
      <BrochureDownload />
      <Faq />
      <FinalCta />
    </SitePage>
  );
}
