import { createFileRoute } from "@tanstack/react-router";
import { Leadership } from "@/components/site/Leadership";
import { SitePage } from "@/components/site/SitePage";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/leadership")({
  head: () =>
    createSeoHead({
      title: "IDSSPL Leadership | Banking Technology Leaders",
      description:
        "Meet the banking technology, growth, operations, compliance and people leaders guiding IDSSPL and its financial infrastructure platforms.",
      path: "/leadership",
      keywords:
        "IDSSPL leadership, banking technology leaders, fintech leadership India, core banking experts",
      imageAlt: "IDSSPL banking technology leadership team",
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
