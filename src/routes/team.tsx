import { createFileRoute } from "@tanstack/react-router";
import { OurTeam } from "@/components/site/OurTeam";
import { SitePage } from "@/components/site/SitePage";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/team")({
  head: () =>
    createSeoHead({
      title: "IDSSPL Team | Banking, Product & Engineering Experts",
      description:
        "Meet the banking, product, engineering, AI, design, operations and delivery experts building and supporting IDSSPL financial technology.",
      path: "/team",
      keywords:
        "IDSSPL team, banking software engineers, fintech product team, AI banking experts, financial technology careers",
      imageAlt: "IDSSPL banking, product and engineering team",
    }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <SitePage>
      <OurTeam />
    </SitePage>
  );
}
