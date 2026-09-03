import cardLifecycleArtwork from "@/assets/product-icons/product-card-management-3d.jpg";
import type { GlassIconName } from "./GlassIcon3D";

export type ProductVisualIcon = {
  name: GlassIconName;
  artwork: string;
};

type ProductIconSet = {
  subProducts: GlassIconName[];
  features: ProductVisualIcon[];
  benefits: ProductVisualIcon[];
};

const productArtworkModules = import.meta.glob<string>(
  "../../assets/product-icons/product-specific/*.jpg",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);

function productArtwork(
  family: "core" | "npci" | "digital" | "enterprise" | "merchant" | "cards",
  section: "feature" | "benefit",
  names: GlassIconName[],
): ProductVisualIcon[] {
  return names.map((name, index) => {
    const filename = `${family}-${section}-${String(index + 1).padStart(2, "0")}.jpg`;
    const modulePath = `../../assets/product-icons/product-specific/${filename}`;
    const artwork = productArtworkModules[modulePath];

    if (!artwork) {
      throw new Error(`Missing product icon artwork: ${filename}`);
    }

    return { name, artwork };
  });
}

export const productIconSets = {
  "next-gen-ai-core-banking": {
    subProducts: ["bank", "boxes", "brain", "trending"],
    features: productArtwork("core", "feature", [
      "aiHelpdesk",
      "bankingFunctionalities",
      "integratedModules",
      "cloudMicroservices",
      "hybridDeployment",
      "regulatoryReady",
    ]),
    benefits: productArtwork("core", "benefit", [
      "workflow",
      "userCheck",
      "activity",
      "file",
      "trending",
      "zap",
    ]),
  },
  "npci-products": {
    subProducts: [
      "zap",
      "fingerprint",
      "receipt",
      "refresh",
      "userCheck",
      "network",
      "smartphone",
      "scan",
      "fileCheck",
    ],
    features: productArtwork("npci", "feature", [
      "network",
      "arrows",
      "route",
      "activity",
      "refresh",
      "shield",
    ]),
    benefits: productArtwork("npci", "benefit", [
      "zap",
      "timer",
      "trending",
      "circleCheck",
      "scale",
      "globe",
    ]),
  },
  "digital-banking-products": {
    subProducts: [
      "globe",
      "smartphone",
      "bell",
      "users",
      "store",
      "userCheck",
      "building",
      "fingerprint",
      "fileCheck",
    ],
    features: productArtwork("digital", "feature", [
      "smartphone",
      "globe",
      "bell",
      "userCheck",
      "settings",
      "link",
    ]),
    benefits: productArtwork("digital", "benefit", [
      "users",
      "timer",
      "target",
      "trending",
      "layers",
      "handshake",
    ]),
  },
  "enterprise-solution": {
    subProducts: [
      "money",
      "fingerprint",
      "scan",
      "refresh",
      "file",
      "route",
      "list",
      "scale",
      "shield",
    ],
    features: productArtwork("enterprise", "feature", [
      "workflow",
      "settings",
      "clipboard",
      "userCog",
      "file",
      "panel",
    ]),
    benefits: productArtwork("enterprise", "benefit", [
      "zap",
      "eye",
      "timer",
      "shield",
      "database",
      "trending",
    ]),
  },
  "merchant-management-solution": {
    subProducts: [
      "userCheck",
      "fingerprint",
      "qr",
      "gauge",
      "file",
      "trending",
      "userCog",
      "scale",
      "shield",
    ],
    features: productArtwork("merchant", "feature", [
      "store",
      "userCheck",
      "qr",
      "activity",
      "receipt",
      "users",
    ]),
    benefits: productArtwork("merchant", "benefit", [
      "timer",
      "badge",
      "eye",
      "qr",
      "trending",
      "shield",
    ]),
  },
  "card-management": {
    subProducts: [
      "creditCard",
      "wallet",
      "settings",
      "lock",
      "refresh",
      "trending",
      "userCog",
      "scale",
      "shield",
    ],
    features: productArtwork("cards", "feature", [
      "creditCard",
      "wallet",
      "lock",
      "activity",
      "settings",
      "shield",
    ]).map((visual, index) =>
      index === 0 ? { ...visual, artwork: cardLifecycleArtwork } : visual,
    ),
    benefits: productArtwork("cards", "benefit", [
      "zap",
      "fingerprint",
      "panel",
      "shield",
      "settings",
      "users",
    ]),
  },
} satisfies Record<string, ProductIconSet>;
