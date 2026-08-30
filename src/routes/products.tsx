import { createFileRoute } from "@tanstack/react-router";
import { ProductCatalog } from "@/components/site/ProductCatalog";
import { SitePage } from "@/components/site/SitePage";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "IDSSPL Banking Products | Core Banking, NPCI & Digital" },
      {
        name: "description",
        content:
          "Explore IDSSPL AI-powered core banking, NPCI payments, digital banking, enterprise automation, merchant management, and card management products.",
      },
      {
        name: "keywords",
        content:
          "core banking software, NPCI products, digital banking platform, enterprise banking automation, merchant management system, card management system",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "IDSSPL Banking Technology Products" },
      {
        property: "og:description",
        content:
          "Explore six connected banking product families engineered for secure, scalable financial operations.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/products" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/products" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SitePage>
      <ProductCatalog />
    </SitePage>
  );
}
