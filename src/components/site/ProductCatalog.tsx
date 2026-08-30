import { useEffect, useState, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";

import cardsImg from "@/assets/cards.jpg";
import cardsVideo from "@/assets/cards.mp4";
import coreBankingUi from "@/assets/core-banking-ui.jpg";
import coreBankingVideo from "@/assets/core-banking-ui.mp4";
import paymentSwitching from "@/assets/payment-switching.jpg";
import paymentSwitchingVideo from "@/assets/payment-switching.mp4";
import reconciliation from "@/assets/reconciliation.jpg";
import reconciliationVideo from "@/assets/reconciliation.mp4";
import riskUi from "@/assets/risk-compliance-ui.jpg";
import riskVideo from "@/assets/risk-compliance-ui.mp4";
import vault from "@/assets/vault.jpg";
import vaultVideo from "@/assets/vault.mp4";
import cardManagementIcon from "@/assets/product-icons/product-card-management-3d.jpg";
import coreBankingIcon from "@/assets/product-icons/product-core-banking-3d.jpg";
import digitalBankingIcon from "@/assets/product-icons/product-digital-banking-3d.jpg";
import enterpriseIcon from "@/assets/product-icons/product-enterprise-3d.jpg";
import merchantIcon from "@/assets/product-icons/product-merchant-3d.jpg";
import npciIcon from "@/assets/product-icons/product-npci-3d.jpg";

import { ProductSection, type Product } from "./ProductSection";
import { productIconSets } from "./ProductIconSets";
import { Reveal } from "./Reveal";

type CatalogProduct = Product & { icon: string };

const products: CatalogProduct[] = [
  {
    id: "next-gen-ai-core-banking",
    label: "Next Gen AI Core Banking Solution",
    shortDescription: "An intelligent foundation for secure, scalable, customer-centric banking.",
    heading: ["AI-Powered", "Core Banking."],
    featureIcons: productIconSets["next-gen-ai-core-banking"].features,
    benefitIcons: productIconSets["next-gen-ai-core-banking"].benefits,
    overview: [
      "An AI-powered core banking platform that streamlines banking operations, automates processes, supports regulatory compliance, and delivers secure, scalable digital banking experiences.",
      "Designed for banks, co-operative institutions, credit societies, and modern financial organisations, the platform connects customer servicing, deposits, lending, transactions, payments, reporting, and management intelligence through one dependable operating foundation. Its modular architecture supports phased transformation without forcing institutions to replace every existing system at once.",
    ],
    subProducts: [
      "Core Banking Platform",
      "Integrated Banking Modules",
      "AI Management Dashboard",
      "Merchant Analytics",
    ],
    keyFeatures: [
      {
        title: "AI and human-assisted helpdesk",
        description:
          "AI triages service requests, recommends resolutions, and gives human support teams the complete context needed to resolve complex cases faster.",
      },
      {
        title: "300+ banking functionalities",
        description:
          "A broad functional library supports customer, account, deposit, loan, teller, transaction, reporting, and compliance workflows from one platform.",
      },
      {
        title: "25+ integrated banking modules",
        description:
          "Connected modules share consistent data and controls across core operations, digital channels, payments, analytics, and administration.",
      },
      {
        title: "Cloud-native microservices architecture",
        description:
          "Independently scalable services reduce release risk, improve resilience, and make it easier to modernise specific capabilities over time.",
      },
      {
        title: "SaaS and on-premises deployment",
        description:
          "Institutions can choose managed cloud delivery or controlled on-premises deployment without compromising the core product experience.",
      },
      {
        title: "RBI and NPCI-ready platform",
        description:
          "Security, audit, payment, and reporting controls are structured to support integration with prevailing RBI and NPCI requirements.",
      },
    ],
    benefits: [
      {
        title: "40-60% reduction in manual operations",
        description:
          "Workflow automation removes repetitive intervention, standardises processing, and allows teams to focus on exceptions and customer service.",
      },
      {
        title: "Faster customer onboarding and transaction processing",
        description:
          "Straight-through journeys, shared data, and configurable approvals reduce wait times from account opening through daily transactions.",
      },
      {
        title: "Real-time AI-driven business insights",
        description:
          "Decision-makers receive timely signals across customers, branches, products, risk, and profitability instead of relying on delayed reports.",
      },
      {
        title: "Self-service reporting without IT intervention",
        description:
          "Authorised teams can access operational and management information directly, reducing report backlogs and dependency on technical resources.",
      },
      {
        title: "Lower total cost of ownership",
        description:
          "A shared platform, modular deployment, and reduced manual work simplify technology operations and improve long-term cost efficiency.",
      },
      {
        title: "Faster time-to-market for new banking products",
        description:
          "Reusable services and configurable workflows help institutions introduce new offerings without rebuilding the underlying banking foundation.",
      },
    ],
    image: coreBankingUi,
    video: coreBankingVideo,
    alt: "AI-powered IDSSPL next-generation core banking platform",
    icon: coreBankingIcon,
  },
  {
    id: "npci-products",
    label: "NPCI Products",
    shortDescription: "Integrated rails for secure, seamless, real-time digital transactions.",
    heading: ["India's Digital", "Payment Ecosystem."],
    featureIcons: productIconSets["npci-products"].features,
    benefitIcons: productIconSets["npci-products"].benefits,
    overview: [
      "A comprehensive suite of NPCI-integrated payment solutions covering high-value national payment rails and enabling seamless, secure, real-time digital transactions.",
      "The suite brings multiple payment journeys into a consistent operational environment so institutions can manage routing, monitoring, reconciliation, exception handling, and customer service with greater control. It is built to support high transaction volumes, always-on availability, and the integration needs of banks expanding their digital payment footprint.",
    ],
    subProducts: [
      "IMPS",
      "AEPS",
      "BBPS",
      "NACH",
      "APBS",
      "NFS ATM Switch",
      "UPI",
      "CTS",
      "E-Mandate",
    ],
    keyFeatures: [
      {
        title: "Real-time transaction processing",
        description:
          "High-availability processing handles payment requests with rapid validation, routing, response management, and complete transaction traceability.",
      },
      {
        title: "NPCI-integrated payment workflows",
        description:
          "Purpose-built workflows connect major NPCI rails while keeping channel-specific rules, statuses, and operational actions consistent.",
      },
      {
        title: "Secure routing with full traceability",
        description:
          "Every transaction is protected through controlled routing, audit-ready events, clear reference trails, and configurable security checks.",
      },
      {
        title: "Scalable channel connectivity",
        description:
          "A flexible integration layer connects mobile, internet, branch, ATM, merchant, and partner channels without duplicating payment logic.",
      },
      {
        title: "Central transaction monitoring",
        description:
          "Operations teams can view traffic, failures, reversals, exceptions, and service performance from a unified monitoring workspace.",
      },
      {
        title: "Compliance-ready operations",
        description:
          "Configurable limits, approvals, audit records, and reporting controls help institutions maintain disciplined payment operations.",
      },
    ],
    benefits: [
      {
        title: "Broader digital payment coverage",
        description:
          "Institutions can serve more customer use cases through a connected portfolio of national payment and collection capabilities.",
      },
      {
        title: "Faster and more reliable transactions",
        description:
          "Optimised processing and resilient routing improve response times while reducing avoidable failures and service disruption.",
      },
      {
        title: "A unified integration layer",
        description:
          "Shared interfaces and operating controls reduce channel-by-channel complexity and make future payment expansion easier.",
      },
      {
        title: "Simplified payment operations",
        description:
          "Central monitoring, exception handling, and traceability give support teams a clearer path from issue detection to resolution.",
      },
      {
        title: "Continuous service availability",
        description:
          "Resilient architecture supports the always-on expectations of modern payment journeys and high-volume transaction periods.",
      },
      {
        title: "Improved access for customers and members",
        description:
          "More payment options and connected channels make essential financial services easier to reach across customer segments.",
      },
    ],
    image: paymentSwitching,
    video: paymentSwitchingVideo,
    alt: "IDSSPL NPCI payment product transaction network",
    icon: npciIcon,
  },
  {
    id: "digital-banking-products",
    label: "Digital Banking Products",
    shortDescription:
      "Connected customer journeys across web, mobile, messaging, and self-service.",
    heading: ["One Connected", "Banking Experience."],
    featureIcons: productIconSets["digital-banking-products"].features,
    benefitIcons: productIconSets["digital-banking-products"].benefits,
    overview: [
      "A complete digital banking ecosystem offering internet banking, mobile banking, customer self-service, digital onboarding, and omnichannel experiences.",
      "Each channel is designed as part of the same customer journey rather than a separate digital island. Shared services, security controls, customer data, and integration patterns help financial institutions deliver consistent experiences while introducing new digital capabilities faster and with less operational duplication.",
    ],
    subProducts: [
      "Internet Banking",
      "Mobile Banking",
      "SMS Banking",
      "WhatsApp Banking",
      "Merchant App",
      "Customer Self Service Portal",
      "Corporate Internet Banking",
      "Digital Onboarding",
      "Digital Account Opening",
    ],
    keyFeatures: [
      {
        title: "Unified omnichannel banking experience",
        description:
          "Customers move between web, mobile, messaging, and assisted channels with consistent services, information, and interaction patterns.",
      },
      {
        title: "Secure digital onboarding workflows",
        description:
          "Configurable identity, document, verification, consent, and approval steps support reliable remote customer acquisition.",
      },
      {
        title: "Responsive web and mobile journeys",
        description:
          "Interfaces adapt across devices and screen sizes while protecting the clarity and accessibility of critical banking tasks.",
      },
      {
        title: "Role-based access and controls",
        description:
          "Permissions, transaction rights, limits, and approvals can be configured for retail, corporate, merchant, and internal users.",
      },
      {
        title: "Multi-language customer interfaces",
        description:
          "Language-ready experiences help institutions serve diverse customer groups without maintaining separate channel applications.",
      },
      {
        title: "Integration-ready digital services",
        description:
          "Reusable APIs and service interfaces connect digital journeys to core banking, payments, identity, analytics, and partner systems.",
      },
    ],
    benefits: [
      {
        title: "Faster customer onboarding",
        description:
          "Digitised verification, document collection, and approvals reduce onboarding effort and shorten the path to an active relationship.",
      },
      {
        title: "Consistent journeys across every channel",
        description:
          "Customers receive familiar services and information regardless of where they start, continue, or complete a banking task.",
      },
      {
        title: "Higher customer self-service adoption",
        description:
          "Clear digital journeys allow customers to complete more requests independently while reducing routine service pressure.",
      },
      {
        title: "Reduced dependency on branch operations",
        description:
          "Common servicing, payment, account, and request journeys can be completed remotely without compromising institutional controls.",
      },
      {
        title: "Broader reach across customer segments",
        description:
          "Multiple channels and language-ready experiences help institutions engage customers across locations, devices, and service preferences.",
      },
      {
        title: "A scalable foundation for digital growth",
        description:
          "Shared platform services make it easier to add channels, features, partners, and new customer journeys as digital adoption grows.",
      },
    ],
    image: vault,
    video: vaultVideo,
    alt: "Secure digital banking channels connected through IDSSPL technology",
    icon: digitalBankingIcon,
  },
  {
    id: "enterprise-solution",
    label: "Enterprise Solution",
    shortDescription: "Connected automation and control across critical banking operations.",
    heading: ["Connected Enterprise", "Operations."],
    featureIcons: productIconSets["enterprise-solution"].features,
    benefitIcons: productIconSets["enterprise-solution"].benefits,
    overview: [
      "Enterprise-grade solutions connecting treasury, identity, reconciliation, lending, compliance, and business process automation to improve operational efficiency.",
      "The platform replaces fragmented hand-offs with structured workflows, shared records, and visible accountability across teams. Institutions gain a clearer operational picture while retaining the flexibility to configure reviews, approvals, documents, controls, and reporting around their own policies and organisational structure.",
    ],
    subProducts: [
      "Treasury Management",
      "E-KYC",
      "C-KYC",
      "Reconciliation",
      "DEM",
      "LOS",
      "LMS",
      "LCS",
      "EFRM",
    ],
    keyFeatures: [
      {
        title: "Centralized enterprise workflows",
        description:
          "Cross-functional processes move through one controlled environment with clear ownership, status visibility, and documented actions.",
      },
      {
        title: "Configurable process automation",
        description:
          "Business rules, routing, approvals, escalations, and service targets can be adapted without rebuilding the entire application.",
      },
      {
        title: "Compliance and audit trails",
        description:
          "Every important change, decision, document, and approval is captured to support review, accountability, and audit readiness.",
      },
      {
        title: "Role-based operational controls",
        description:
          "Granular access, maker-checker controls, and delegated responsibilities protect sensitive processes while keeping work moving.",
      },
      {
        title: "Integrated document and process management",
        description:
          "Records, supporting documents, workflow context, and decision history remain connected throughout the operational lifecycle.",
      },
      {
        title: "Real-time management dashboards",
        description:
          "Leaders can monitor workloads, ageing, exceptions, bottlenecks, and service performance without waiting for manual consolidation.",
      },
    ],
    benefits: [
      {
        title: "Reduced manual processing",
        description:
          "Automation removes repetitive movement of data and documents while reducing the risk of missed steps and inconsistent execution.",
      },
      {
        title: "Improved operational visibility",
        description:
          "Shared dashboards show what is in progress, where delays exist, and which teams or decisions require attention.",
      },
      {
        title: "Faster reviews and approvals",
        description:
          "Context-rich tasks, automated routing, and clear escalation paths shorten decision cycles across enterprise processes.",
      },
      {
        title: "Consistent compliance execution",
        description:
          "Embedded controls and repeatable workflows make important policy steps easier to follow and demonstrate.",
      },
      {
        title: "Connected enterprise data",
        description:
          "Operational records become easier to reconcile, analyse, and reuse when processes share a common information foundation.",
      },
      {
        title: "Higher productivity across teams",
        description:
          "Employees spend less time coordinating routine work and more time resolving exceptions, serving customers, and improving outcomes.",
      },
    ],
    image: reconciliation,
    video: reconciliationVideo,
    alt: "IDSSPL enterprise workflow and reconciliation solution",
    icon: enterpriseIcon,
  },
  {
    id: "merchant-management-solution",
    label: "Merchant Management Solution",
    shortDescription: "End-to-end onboarding, QR, transaction, and merchant intelligence control.",
    heading: ["Intelligent Merchant", "Management."],
    featureIcons: productIconSets["merchant-management-solution"].features,
    benefitIcons: productIconSets["merchant-management-solution"].benefits,
    overview: [
      "An end-to-end platform for merchant onboarding, QR and POS management, settlements, reconciliation, transaction monitoring, and merchant analytics.",
      "The solution gives acquiring institutions a connected view from first application through active servicing and performance management. Merchant profiles, verification, devices, QR assets, transactions, settlements, exceptions, and analytics stay linked so teams can grow the portfolio without losing operational visibility or control.",
    ],
    subProducts: [
      "Merchant Onboarding & Approval Workflow",
      "Merchant KYC Management",
      "QR Code Management",
      "Transaction Dashboard",
      "DEM",
      "Merchant Analytics",
      "User & Role Management",
      "LCS",
      "EFRM",
    ],
    keyFeatures: [
      {
        title: "End-to-end merchant lifecycle management",
        description:
          "Applications, approvals, activation, servicing, monitoring, and closure remain connected through one merchant operating record.",
      },
      {
        title: "QR and POS operations",
        description:
          "Teams can manage QR assets, devices, assignments, status changes, and service actions with clear ownership and history.",
      },
      {
        title: "Real-time transaction monitoring",
        description:
          "Live portfolio views surface transaction activity, failures, unusual patterns, and service issues across merchants and channels.",
      },
      {
        title: "Settlement and reconciliation workflows",
        description:
          "Structured matching, exception handling, and settlement controls improve accuracy from transaction capture to merchant credit.",
      },
      {
        title: "Configurable onboarding approvals",
        description:
          "Institution-specific KYC, risk, pricing, hierarchy, and maker-checker rules can be configured into the acquisition journey.",
      },
      {
        title: "Role-based merchant operations",
        description:
          "Granular permissions protect sensitive merchant data and actions across sales, operations, risk, support, and management teams.",
      },
    ],
    benefits: [
      {
        title: "Faster merchant onboarding",
        description:
          "Digital capture, reusable verification, and guided approvals reduce delays between merchant application and transaction readiness.",
      },
      {
        title: "Stronger merchant KYC control",
        description:
          "Consistent verification, document tracking, approval evidence, and review visibility improve acquisition discipline.",
      },
      {
        title: "Real-time portfolio visibility",
        description:
          "Teams can understand merchant status, activity, service performance, and emerging risk without consolidating multiple systems.",
      },
      {
        title: "Simplified QR and POS management",
        description:
          "A connected asset view makes assignment, activation, replacement, maintenance, and issue resolution easier to manage.",
      },
      {
        title: "Better decisions through merchant analytics",
        description:
          "Portfolio, transaction, category, location, and performance insights help teams focus acquisition and service activity effectively.",
      },
      {
        title: "Reduced operational risk",
        description:
          "Controlled workflows, audit trails, access rules, and active monitoring reduce gaps across the merchant lifecycle.",
      },
    ],
    image: riskUi,
    video: riskVideo,
    alt: "IDSSPL merchant management dashboard and analytics",
    icon: merchantIcon,
  },
  {
    id: "card-management",
    label: "Card Management",
    shortDescription:
      "Secure issuance, PIN control, monitoring, and complete card lifecycle management.",
    heading: ["Secure Card", "Lifecycle Management."],
    featureIcons: productIconSets["card-management"].features,
    benefitIcons: productIconSets["card-management"].benefits,
    overview: [
      "A secure card lifecycle management platform supporting debit card issuance, virtual cards, personalization, PIN management, transaction monitoring, card controls, and fraud prevention.",
      "The platform connects customer requests, card production, activation, PIN services, usage controls, monitoring, and servicing through one operational view. Institutions can deliver dependable physical and virtual card experiences while maintaining the security, traceability, and maker-checker discipline required for sensitive card operations.",
    ],
    subProducts: [
      "Debit Card Issuance",
      "Virtual Card",
      "Card Personalization",
      "PIN Generation",
      "PIN Reset",
      "Merchant Analytics",
      "User & Role Management",
      "LCS",
      "EFRM",
    ],
    keyFeatures: [
      {
        title: "Complete card lifecycle management",
        description:
          "One controlled workflow covers issuance, activation, servicing, status changes, renewal, replacement, hotlisting, and closure.",
      },
      {
        title: "Debit and virtual card issuance",
        description:
          "Institutions can support physical and instant virtual card journeys through consistent customer, approval, and control processes.",
      },
      {
        title: "Secure PIN generation and reset",
        description:
          "Protected PIN workflows allow initial generation and subsequent reset while maintaining strict security and audit controls.",
      },
      {
        title: "Real-time transaction monitoring",
        description:
          "Operational teams can observe card activity, failures, exceptions, and emerging patterns across customers and channels.",
      },
      {
        title: "Configurable card controls",
        description:
          "Usage rules, channel permissions, limits, status controls, and service actions can be adapted to product and customer needs.",
      },
      {
        title: "Integrated fraud prevention",
        description:
          "Monitoring signals, security controls, and rapid operational actions work together to reduce exposure and response time.",
      },
    ],
    benefits: [
      {
        title: "Faster card issuance",
        description:
          "Integrated data, approval, and production workflows shorten the path from eligible customer to active cardholder.",
      },
      {
        title: "Secure customer self-service",
        description:
          "Controlled digital journeys let customers complete common card actions quickly without weakening institutional security.",
      },
      {
        title: "Unified operational controls",
        description:
          "A single view brings card status, requests, permissions, approvals, and servicing history together for support teams.",
      },
      {
        title: "Improved fraud monitoring",
        description:
          "Timely activity visibility and rapid control actions help institutions identify and respond to suspicious behaviour sooner.",
      },
      {
        title: "Simplified card administration",
        description:
          "Reusable workflows and shared records reduce duplicate work across issuance, servicing, support, and operations.",
      },
      {
        title: "A better cardholder experience",
        description:
          "Faster fulfilment, clearer servicing, digital controls, and reliable support improve confidence throughout the card lifecycle.",
      },
    ],
    image: cardsImg,
    video: cardsVideo,
    alt: "IDSSPL secure card management and lifecycle platform",
    icon: cardManagementIcon,
  },
];

function getProductIdFromHash() {
  if (typeof window === "undefined") return products[0].id;
  const requestedId = decodeURIComponent(window.location.hash.slice(1));
  return products.some((product) => product.id === requestedId) ? requestedId : products[0].id;
}

export function ProductCatalog() {
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const selectedProduct =
    products.find((product) => product.id === selectedProductId) ?? products[0];

  useEffect(() => {
    const syncProductFromLocation = () => setSelectedProductId(getProductIdFromHash());
    syncProductFromLocation();
    window.addEventListener("hashchange", syncProductFromLocation);
    window.addEventListener("popstate", syncProductFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncProductFromLocation);
      window.removeEventListener("popstate", syncProductFromLocation);
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== `#${selectedProductId}`) return;
    const timer = window.setTimeout(() => {
      document.getElementById(selectedProductId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 260);
    return () => window.clearTimeout(timer);
  }, [selectedProductId]);

  const selectProduct = (event: MouseEvent<HTMLAnchorElement>, productId: string) => {
    event.preventDefault();
    const nextHash = `#${productId}`;
    if (window.location.hash !== nextHash) window.history.pushState(null, "", nextHash);
    setSelectedProductId(productId);

    if (selectedProductId === productId) {
      document.getElementById(productId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div id="products">
      <ProductSection key={selectedProduct.id} product={selectedProduct} />

      <section className="product-family-selector">
        <div className="shell">
          <div className="product-family-heading section-heading-split">
            <div>
              <Reveal>
                <p className="eyebrow">Product Portfolio</p>
              </Reveal>
              <Reveal delay={70}>
                <h2 className="display section-heading-title">Explore Our Product Portfolio.</h2>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <p className="section-heading-copy">
                Choose one product family to view its complete overview, connected sub-products, key
                capabilities, and measurable business outcomes.
              </p>
            </Reveal>
          </div>

          <div className="product-family-grid" role="tablist" aria-label="Product families">
            {products.map((product, index) => {
              const isSelected = product.id === selectedProduct.id;
              return (
                <Reveal key={product.id} delay={70 + index * 45}>
                  <a
                    href={`#${product.id}`}
                    className={`product-family-button${isSelected ? " is-selected" : ""}`}
                    aria-current={isSelected ? "true" : undefined}
                    onClick={(event) => selectProduct(event, product.id)}
                  >
                    <span className="product-family-button-icon" aria-hidden="true">
                      <img src={product.icon} alt="" loading="lazy" decoding="async" />
                    </span>
                    <span>
                      <strong>{product.label}</strong>
                      <small>{product.shortDescription}</small>
                    </span>
                    <ArrowRight size={17} aria-hidden="true" />
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
