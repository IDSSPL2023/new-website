const productNames = [
  "Next Gen AI Core Banking Solution",
  "NPCI Products",
  "Digital Banking Products",
  "Enterprise Solution",
  "Merchant Management Solution",
  "Card Management",
  "Core Banking",
  "Core Banking Platform",
  "Integrated Banking Modules",
  "AI Management Dashboard",
  "Merchant Analytics",
  "IMPS",
  "AEPS",
  "BBPS",
  "NACH",
  "APBS",
  "NFS ATM Switch",
  "UPI",
  "CTS",
  "E-Mandate",
  "Internet Banking",
  "Mobile Banking",
  "SMS Banking",
  "WhatsApp Banking",
  "Merchant App",
  "Customer Self Service Portal",
  "Corporate Internet Banking",
  "Digital Onboarding",
  "Digital Account Opening",
  "Treasury Management",
  "E-KYC",
  "C-KYC",
  "Reconciliation",
  "DEM",
  "LOS",
  "LMS",
  "LCS",
  "EFRM",
  "Merchant Onboarding & Approval Workflow",
  "Merchant KYC Management",
  "QR Code Management",
  "Transaction Dashboard",
  "User & Role Management",
  "Debit Card Issuance",
  "Virtual Card",
  "Card Personalization",
  "PIN Generation",
  "PIN Reset",
];

const normalizeProductName = (value: string) =>
  value
    .normalize("NFKC")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("en")
    .replace(/[.:;,!?]+$/g, "");

const protectedProductNameSet = new Set(productNames.map(normalizeProductName));

export function isProtectedSiteText(source: string) {
  return protectedProductNameSet.has(normalizeProductName(source));
}
