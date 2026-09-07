import brandLogo from "@/assets/idsspl-logo-light.png";
import socialPreview from "@/assets/idsspl-hero-poster.jpg";

export const SITE_NAME = "IDSSPL";
export const SITE_URL = "https://www.idsspl.com";

export const absoluteUrl = (path: string) => new URL(path, `${SITE_URL}/`).href;

export const BRAND_LOGO_URL = absoluteUrl(brandLogo);
export const SOCIAL_PREVIEW_URL = absoluteUrl(socialPreview);

type SeoHeadOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  imageAlt?: string;
  robots?: string;
};

export function createSeoHead({
  title,
  description,
  path,
  keywords,
  imageAlt = "IDSSPL intelligent banking technology infrastructure",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
}: SeoHeadOptions) {
  const canonical = absoluteUrl(path);

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(keywords ? [{ name: "keywords", content: keywords }] : []),
      { name: "robots", content: robots },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: SOCIAL_PREVIEW_URL },
      { property: "og:image:secure_url", content: SOCIAL_PREVIEW_URL },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1280" },
      { property: "og:image:height", content: "720" },
      { property: "og:image:alt", content: imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: SOCIAL_PREVIEW_URL },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [
      { rel: "canonical", href: canonical },
      { rel: "alternate", hrefLang: "en", href: canonical },
      { rel: "alternate", hrefLang: "x-default", href: canonical },
    ],
  };
}
