import { createFileRoute } from "@tanstack/react-router";
import { OurTeam } from "@/components/site/OurTeam";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "IDSSPL Team | Banking, Product & Engineering Experts" },
      {
        name: "description",
        content:
          "Meet the banking, product, engineering, AI, design, operations, and delivery experts building IDSSPL financial technology.",
      },
      {
        name: "keywords",
        content:
          "IDSSPL team, banking software engineers, fintech product team, AI banking experts, financial technology careers",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "IDSSPL Team | Banking & Engineering Experts" },
      {
        property: "og:description",
        content:
          "Meet the multidisciplinary team building, delivering, and supporting IDSSPL banking platforms.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/team" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/team" }],
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
