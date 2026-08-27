import { createFileRoute } from "@tanstack/react-router";
import { OurTeam } from "@/components/site/OurTeam";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — IDSSPL" },
      {
        name: "description",
        content: "Meet the functional leaders and wider team delivering IDSSPL banking technology.",
      },
    ],
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
