import { createFileRoute } from "@tanstack/react-router";
import { InteriorHero } from "@/components/site/InteriorHero";
import { ProductCatalog } from "@/components/site/ProductCatalog";
import { Faq } from "@/components/site/Faq";
import { FinalCta } from "@/components/site/FinalCta";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Our Products — IDSSPL" },
      {
        name: "description",
        content: "Explore IDSSPL core banking, payment switching, cards, risk, reconciliation and infrastructure products.",
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SitePage>
      <InteriorHero
        eyebrow="Our Products"
        title="One technology partner. Every critical banking layer."
        body="From core banking and digital payments to reconciliation, risk and secure infrastructure, our products are engineered to work together at institutional scale."
      />
      <ProductCatalog />
      <Faq />
      <FinalCta />
    </SitePage>
  );
}
