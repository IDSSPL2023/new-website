import type { GlassIconName } from "./GlassIcon3D";

type ProductIconSet = {
  features: GlassIconName[];
  benefits: GlassIconName[];
};

export const productIconSets: Record<string, ProductIconSet> = {
  "next-gen-ai-core-banking": {
    features: ["brain", "boxes", "layers", "cloud", "server", "shield"],
    benefits: ["workflow", "userCheck", "activity", "file", "trending", "zap"],
  },
  "npci-products": {
    features: ["network", "arrows", "route", "activity", "refresh", "shield"],
    benefits: ["zap", "timer", "trending", "circleCheck", "scale", "globe"],
  },
  "digital-banking-products": {
    features: ["smartphone", "globe", "bell", "userCheck", "settings", "link"],
    benefits: ["users", "timer", "target", "trending", "layers", "handshake"],
  },
  "enterprise-solution": {
    features: ["workflow", "settings", "clipboard", "userCog", "file", "panel"],
    benefits: ["zap", "eye", "timer", "shield", "database", "trending"],
  },
  "merchant-management-solution": {
    features: ["store", "userCheck", "qr", "activity", "receipt", "users"],
    benefits: ["timer", "badge", "eye", "qr", "trending", "shield"],
  },
  "card-management": {
    features: ["creditCard", "wallet", "lock", "activity", "settings", "shield"],
    benefits: ["zap", "fingerprint", "panel", "shield", "settings", "users"],
  },
};
