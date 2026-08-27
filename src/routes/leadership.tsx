import { createFileRoute } from "@tanstack/react-router";
import { Leadership } from "@/components/site/Leadership";
import { FinalCta } from "@/components/site/FinalCta";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — IDSSPL" },
      {
        name: "description",
        content: "Meet the banking technology, growth and operations leaders guiding IDSSPL.",
      },
    ],
  }),
  component: LeadershipPage,
});

function LeadershipPage() {
  return (
    <SitePage>
      <Leadership />
      <FinalCta />
    </SitePage>
  );
}
