import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import { getCatalogProduct, ProductCatalog } from "@/components/site/ProductCatalog";
import { SitePage } from "@/components/site/SitePage";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/products")({
  head: () =>
    createSeoHead({
      title: "IDSSPL Banking Products | Core Banking, NPCI & Digital",
      description:
        "Explore IDSSPL core banking, NPCI payments, digital banking, enterprise automation, merchant management and card management platforms.",
      path: "/products",
      keywords:
        "core banking software, NPCI products, digital banking platform, enterprise banking automation, merchant management system, card management system",
      imageAlt: "IDSSPL core banking, payments and digital banking product portfolio",
    }),
  component: ProductsPage,
});

function ProductsPage() {
  useEffect(() => {
    const legacyProductId = decodeURIComponent(window.location.hash.slice(1));
    if (getCatalogProduct(legacyProductId)) {
      window.location.replace(`/products/${legacyProductId}`);
    }
  }, []);

  return (
    <SitePage>
      <ProductCatalog />
    </SitePage>
  );
}
