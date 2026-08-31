import { createFileRoute } from "@tanstack/react-router";
import { Leadership } from "@/components/site/Leadership";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "IDSSPL Leadership | Banking Technology Leaders" },
      {
        name: "description",
        content:
          "Meet the experienced banking technology, growth, operations, compliance, and people leaders guiding IDSSPL.",
      },
      {
        name: "keywords",
        content:
          "IDSSPL leadership, banking technology leaders, fintech leadership India, core banking experts",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "IDSSPL Leadership | Banking Technology Leaders" },
      {
        property: "og:description",
        content:
          "Meet the leaders shaping IDSSPL's banking technology, operations, growth, compliance, and innovation.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/leadership" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/leadership" }],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  return (
    <SitePage>
      <Leadership />
    </SitePage>
  );
}
