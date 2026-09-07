import { createFileRoute, notFound } from "@tanstack/react-router";

import { getCatalogProduct, ProductCatalog } from "@/components/site/ProductCatalog";
import { SitePage } from "@/components/site/SitePage";
import { createSeoHead, SITE_URL } from "@/lib/seo";

const productSeoTitles: Record<string, string> = {
  "npci-products": "NPCI Payment Products & Switching Solutions | IDSSPL",
  "enterprise-solution": "Enterprise Banking Automation Solutions | IDSSPL",
  "card-management": "Card Management System for Banks | IDSSPL",
};

export const Route = createFileRoute("/products_/$productId")({
  beforeLoad: ({ params }) => {
    if (!getCatalogProduct(params.productId)) throw notFound();
  },
  head: ({ params }) => {
    const product = getCatalogProduct(params.productId);
    if (!product) {
      return createSeoHead({
        title: "Banking Product Not Found | IDSSPL",
        description: "The requested IDSSPL banking technology product could not be found.",
        path: `/products/${params.productId}`,
        robots: "noindex, nofollow",
      });
    }

    return createSeoHead({
      title: productSeoTitles[product.id] ?? `${product.label} | IDSSPL`,
      description: `${product.shortDescription} Review its features, benefits and fit for banks and financial institutions.`,
      path: `/products/${product.id}`,
      keywords: `${product.label}, banking technology platform, financial infrastructure, IDSSPL`,
      imageAlt: `${product.label} by IDSSPL`,
    });
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = Route.useParams();
  const product = getCatalogProduct(productId);

  if (!product) return null;

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: `${SITE_URL}/products`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.label,
        item: `${SITE_URL}/products/${product.id}`,
      },
    ],
  });

  return (
    <SitePage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbSchema }} />
      <ProductCatalog productId={product.id} />
    </SitePage>
  );
}
