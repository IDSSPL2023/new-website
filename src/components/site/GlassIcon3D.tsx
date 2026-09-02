import aiIcon from "@/assets/glass-icons/ai.webp";
import automationIcon from "@/assets/glass-icons/automation.webp";
import bankIcon from "@/assets/glass-icons/bank.webp";
import cardManagementIcon from "@/assets/glass-icons/card-management.webp";
import dataIcon from "@/assets/glass-icons/data.webp";
import digitalBankingIcon from "@/assets/glass-icons/digital-banking.webp";
import merchantIcon from "@/assets/glass-icons/merchant.webp";
import paymentsIcon from "@/assets/glass-icons/payments.webp";
import realtimeIcon from "@/assets/glass-icons/realtime.webp";
import securityIcon from "@/assets/glass-icons/security.webp";

export type GlassIconName =
  | "activity"
  | "arrows"
  | "badge"
  | "bank"
  | "bell"
  | "box"
  | "boxes"
  | "brain"
  | "building"
  | "check"
  | "circleCheck"
  | "clipboard"
  | "clock"
  | "cloud"
  | "code"
  | "creditCard"
  | "database"
  | "eye"
  | "file"
  | "fileCheck"
  | "fingerprint"
  | "gauge"
  | "globe"
  | "handshake"
  | "layers"
  | "link"
  | "list"
  | "lock"
  | "money"
  | "network"
  | "panel"
  | "qr"
  | "receipt"
  | "refresh"
  | "route"
  | "scale"
  | "scan"
  | "search"
  | "server"
  | "settings"
  | "shield"
  | "smartphone"
  | "sparkles"
  | "store"
  | "target"
  | "terminal"
  | "timer"
  | "trending"
  | "userCheck"
  | "userCog"
  | "users"
  | "wallet"
  | "workflow"
  | "zap";

export type GlassIconTone = "cyan" | "blue" | "teal" | "gold";
export type GlassIconSize = "xs" | "sm" | "md" | "lg" | "hero";

const iconMap: Record<GlassIconName, string> = {
  activity: realtimeIcon,
  arrows: paymentsIcon,
  badge: securityIcon,
  bank: bankIcon,
  bell: digitalBankingIcon,
  box: automationIcon,
  boxes: automationIcon,
  brain: aiIcon,
  building: bankIcon,
  check: securityIcon,
  circleCheck: securityIcon,
  clipboard: securityIcon,
  clock: realtimeIcon,
  cloud: dataIcon,
  code: automationIcon,
  creditCard: cardManagementIcon,
  database: dataIcon,
  eye: dataIcon,
  file: dataIcon,
  fileCheck: securityIcon,
  fingerprint: securityIcon,
  gauge: realtimeIcon,
  globe: digitalBankingIcon,
  handshake: merchantIcon,
  layers: dataIcon,
  link: paymentsIcon,
  list: automationIcon,
  lock: securityIcon,
  money: merchantIcon,
  network: paymentsIcon,
  panel: dataIcon,
  qr: merchantIcon,
  receipt: merchantIcon,
  refresh: realtimeIcon,
  route: paymentsIcon,
  scale: bankIcon,
  scan: securityIcon,
  search: dataIcon,
  server: dataIcon,
  settings: automationIcon,
  shield: securityIcon,
  smartphone: digitalBankingIcon,
  sparkles: aiIcon,
  store: merchantIcon,
  target: realtimeIcon,
  terminal: automationIcon,
  timer: realtimeIcon,
  trending: dataIcon,
  userCheck: digitalBankingIcon,
  userCog: automationIcon,
  users: digitalBankingIcon,
  wallet: cardManagementIcon,
  workflow: automationIcon,
  zap: realtimeIcon,
};

export function GlassIcon3D({
  name,
  tone = "cyan",
  size = "md",
  className = "",
}: {
  name: GlassIconName;
  tone?: GlassIconTone;
  size?: GlassIconSize;
  className?: string;
}) {
  return (
    <span
      className={`glass-icon-3d glass-icon-3d-${size} glass-icon-3d-${tone} ${className}`.trim()}
      aria-hidden="true"
    >
      <span className="glass-icon-3d-aura" />
      <img
        className="glass-icon-3d-image"
        src={iconMap[name]}
        alt=""
        loading={size === "hero" ? "eager" : "lazy"}
        decoding="async"
      />
      <span className="glass-icon-3d-shadow" />
    </span>
  );
}
