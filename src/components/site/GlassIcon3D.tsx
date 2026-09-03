import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  Bell,
  Box,
  Boxes,
  BrainCircuit,
  Building2,
  Check,
  CircleCheckBig,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Cloud,
  Code2,
  CreditCard,
  Database,
  Eye,
  FileCheck2,
  FileText,
  Fingerprint,
  Gauge,
  Globe2,
  Handshake,
  Landmark,
  Layers3,
  Link2,
  ListChecks,
  LockKeyhole,
  Network,
  PanelsTopLeft,
  QrCode,
  Receipt,
  RefreshCw,
  Route,
  Scale,
  ScanLine,
  Search,
  Server,
  Settings2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Terminal,
  Timer,
  TrendingUp,
  UserCog,
  UserRoundCheck,
  UsersRound,
  WalletCards,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import aiIntelligenceArtwork from "@/assets/glass-icons-generated/ai-intelligence-v2.webp";
import bankingSpecialistsArtwork from "@/assets/glass-icons-generated/banking-specialists-v2.webp";
import cardManagementArtwork from "@/assets/glass-icons-generated/card-management-v2.webp";
import coreBankingArtwork from "@/assets/glass-icons-generated/core-banking-v2.webp";
import dataAnalyticsArtwork from "@/assets/glass-icons-generated/data-analytics-v2.webp";
import digitalBankingArtwork from "@/assets/glass-icons-generated/digital-banking-v2.webp";
import enterpriseAutomationArtwork from "@/assets/glass-icons-generated/enterprise-automation-v2.webp";
import featureAiHelpdeskArtwork from "@/assets/glass-icons-generated/feature-ai-helpdesk-v2.webp";
import featureBankingFunctionsArtwork from "@/assets/glass-icons-generated/feature-banking-functions-v2.webp";
import featureCloudMicroservicesArtwork from "@/assets/glass-icons-generated/feature-cloud-microservices-v2.webp";
import featureHybridDeploymentArtwork from "@/assets/glass-icons-generated/feature-hybrid-deployment-v2.webp";
import featureIntegratedModulesArtwork from "@/assets/glass-icons-generated/feature-integrated-modules-v2.webp";
import featureRegulatoryReadyArtwork from "@/assets/glass-icons-generated/feature-regulatory-ready-v2.webp";
import merchantManagementArtwork from "@/assets/glass-icons-generated/merchant-management-v2.webp";
import npciPaymentsArtwork from "@/assets/glass-icons-generated/npci-payments-v2.webp";
import omnichannelBankingArtwork from "@/assets/glass-icons-generated/omnichannel-banking-v2.webp";
import productEcosystemArtwork from "@/assets/glass-icons-generated/product-ecosystem-v2.webp";
import publishedOutcomesArtwork from "@/assets/glass-icons-generated/published-outcomes-v2.webp";
import securityComplianceArtwork from "@/assets/glass-icons-generated/security-compliance-v2.webp";

export type GlassIconName =
  | "activity"
  | "aiHelpdesk"
  | "aiIntelligence"
  | "arrows"
  | "badge"
  | "bank"
  | "bankingFunctionalities"
  | "bankingSpecialists"
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
  | "cloudMicroservices"
  | "code"
  | "creditCard"
  | "cardManagement"
  | "coreBanking"
  | "database"
  | "dataAnalytics"
  | "digitalBanking"
  | "enterpriseAutomation"
  | "eye"
  | "file"
  | "fileCheck"
  | "fingerprint"
  | "gauge"
  | "globe"
  | "handshake"
  | "hybridDeployment"
  | "integratedModules"
  | "layers"
  | "link"
  | "list"
  | "lock"
  | "money"
  | "merchantManagement"
  | "network"
  | "npciPayments"
  | "omnichannelBanking"
  | "panel"
  | "productEcosystem"
  | "publishedOutcomes"
  | "qr"
  | "receipt"
  | "regulatoryReady"
  | "refresh"
  | "route"
  | "scale"
  | "scan"
  | "search"
  | "server"
  | "settings"
  | "securityCompliance"
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

const iconMap: Partial<Record<GlassIconName, LucideIcon>> = {
  activity: Activity,
  arrows: ArrowLeftRight,
  badge: BadgeCheck,
  bank: Landmark,
  bell: Bell,
  box: Box,
  boxes: Boxes,
  brain: BrainCircuit,
  building: Building2,
  check: Check,
  circleCheck: CircleCheckBig,
  clipboard: ClipboardCheck,
  clock: Clock3,
  cloud: Cloud,
  code: Code2,
  creditCard: CreditCard,
  database: Database,
  eye: Eye,
  file: FileText,
  fileCheck: FileCheck2,
  fingerprint: Fingerprint,
  gauge: Gauge,
  globe: Globe2,
  handshake: Handshake,
  layers: Layers3,
  link: Link2,
  list: ListChecks,
  lock: LockKeyhole,
  money: CircleDollarSign,
  network: Network,
  panel: PanelsTopLeft,
  qr: QrCode,
  receipt: Receipt,
  refresh: RefreshCw,
  route: Route,
  scale: Scale,
  scan: ScanLine,
  search: Search,
  server: Server,
  settings: Settings2,
  shield: ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  store: Store,
  target: Target,
  terminal: Terminal,
  timer: Timer,
  trending: TrendingUp,
  userCheck: UserRoundCheck,
  userCog: UserCog,
  users: UsersRound,
  wallet: WalletCards,
  workflow: Workflow,
  zap: Zap,
};

const artworkMap: Partial<Record<GlassIconName, string>> = {
  aiHelpdesk: featureAiHelpdeskArtwork,
  aiIntelligence: aiIntelligenceArtwork,
  bankingFunctionalities: featureBankingFunctionsArtwork,
  bankingSpecialists: bankingSpecialistsArtwork,
  cardManagement: cardManagementArtwork,
  cloudMicroservices: featureCloudMicroservicesArtwork,
  coreBanking: coreBankingArtwork,
  dataAnalytics: dataAnalyticsArtwork,
  digitalBanking: digitalBankingArtwork,
  enterpriseAutomation: enterpriseAutomationArtwork,
  hybridDeployment: featureHybridDeploymentArtwork,
  integratedModules: featureIntegratedModulesArtwork,
  merchantManagement: merchantManagementArtwork,
  npciPayments: npciPaymentsArtwork,
  omnichannelBanking: omnichannelBankingArtwork,
  productEcosystem: productEcosystemArtwork,
  publishedOutcomes: publishedOutcomesArtwork,
  regulatoryReady: featureRegulatoryReadyArtwork,
  securityCompliance: securityComplianceArtwork,
};

export function GlassIcon3D({
  name,
  artwork: artworkOverride,
  tone = "cyan",
  size = "md",
  className = "",
}: {
  name: GlassIconName;
  artwork?: string;
  tone?: GlassIconTone;
  size?: GlassIconSize;
  className?: string;
}) {
  const Icon = iconMap[name];
  const artwork = artworkOverride ?? artworkMap[name];

  return (
    <span
      className={`glass-icon-3d glass-icon-3d-${size} glass-icon-3d-${tone}${artwork ? " is-artwork" : ""}${artworkOverride ? " is-product-artwork" : ""} ${className}`.trim()}
      aria-hidden="true"
      data-icon={name}
    >
      <span className="glass-icon-3d-aura" />
      {artwork ? (
        <img
          className="glass-icon-3d-artwork-image"
          src={artwork}
          alt=""
          loading={size === "hero" ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <span className="glass-icon-3d-shell">
          <span className="glass-icon-3d-reflection" />
          {Icon ? <Icon className="glass-icon-3d-glyph" strokeWidth={1.7} /> : null}
          <span className="glass-icon-3d-depth" />
        </span>
      )}
      <span className="glass-icon-3d-shadow" />
    </span>
  );
}
