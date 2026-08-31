import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/site/LegalPage";
import { SitePage } from "@/components/site/SitePage";

const termsSections: LegalSection[] = [
  {
    id: "acceptance-and-scope",
    title: "Acceptance and Scope",
    paragraphs: [
      "These Terms and Conditions govern access to and use of the public website operated by IDSSPL Technologies Private Limited. By using the website, you agree to these terms and the Privacy Policy. If you do not agree, please discontinue use of the website.",
      "Specific products, implementations, managed services, support arrangements, and commercial engagements are governed by separate proposals, statements of work, licences, service agreements, or contracts.",
    ],
  },
  {
    id: "permitted-use",
    title: "Permitted Use of the Website",
    bullets: [
      "Use the website only for lawful business and informational purposes.",
      "Do not interfere with website operation, security, availability, or connected infrastructure.",
      "Do not attempt unauthorised access, automated extraction, vulnerability testing, or circumvention of access controls.",
      "Do not submit unlawful, misleading, harmful, confidential, or malicious content through forms or the chatbot.",
      "Do not misrepresent your identity, organisation, authority, or relationship with IDSSPL.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, the website and its text, visual design, software, product descriptions, diagrams, videos, graphics, trademarks, and other materials are owned by or licensed to IDSSPL and are protected by applicable intellectual-property laws.",
      "You may view and share links to public pages for legitimate informational purposes. You may not reproduce, modify, distribute, sell, reverse engineer, remove ownership notices from, or commercially exploit website materials without written authorisation.",
    ],
  },
  {
    id: "product-information",
    title: "Product and Service Information",
    paragraphs: [
      "Website content provides a general overview of IDSSPL capabilities. Product availability, modules, integrations, deployment options, implementation timelines, certifications, performance, and outcomes depend on the institution's requirements and the applicable commercial agreement.",
      "Illustrations, animations, interfaces, statistics, and examples may be representative. They do not constitute a warranty, guaranteed outcome, regulatory approval, or binding offer unless expressly included in a signed agreement.",
    ],
  },
  {
    id: "enquiries-and-submissions",
    title: "Enquiries and User Submissions",
    paragraphs: [
      "Information submitted through an enquiry, brochure form, newsletter field, email link, or chatbot must be accurate and provided with appropriate authority. Do not submit production credentials, payment information, confidential customer data, or regulated banking records through the public website.",
      "Submitting information allows IDSSPL to use it to respond to the request, understand business requirements, deliver requested material, maintain enquiry records, and communicate according to the consent provided.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Links and Services",
    paragraphs: [
      "The website may link to social networks, technology providers, maps, or other external services. Those services are operated independently and are governed by their own terms and privacy practices. A link does not imply endorsement unless expressly stated.",
    ],
  },
  {
    id: "availability-and-security",
    title: "Availability and Security",
    paragraphs: [
      "We aim to maintain a reliable and secure website but do not guarantee uninterrupted access, error-free operation, or compatibility with every device or browser. We may change, suspend, restrict, or discontinue website features for maintenance, security, legal, or operational reasons.",
      "You are responsible for maintaining appropriate security on your device, network, browser, and email account when interacting with the website.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "Website information is provided on an as-available basis for general business information. To the extent permitted by applicable law, IDSSPL disclaims implied warranties relating to accuracy, completeness, fitness for a particular purpose, non-infringement, or availability of public website content.",
      "Nothing on the website constitutes legal, financial, compliance, cybersecurity, investment, or regulatory advice. Institutions should obtain appropriate professional advice and conduct their own assessment before making operational or technology decisions.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    paragraphs: [
      "To the extent permitted by applicable law, IDSSPL will not be liable for indirect, incidental, special, consequential, or business-interruption losses arising solely from use of, reliance on, or inability to access the public website or external links.",
      "Nothing in these terms excludes liability that cannot lawfully be excluded. Liability relating to contracted products or services is governed by the applicable signed agreement.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    paragraphs: [
      "Our Privacy Policy explains how information submitted through the website is collected and managed. By using website forms or the chatbot, you acknowledge the practices described in that policy.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these terms when the website, services, or applicable requirements change. Revised terms will be published on this page with an updated date. Continued use after publication means the revised terms apply to subsequent website use.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These website terms are governed by the applicable laws of India. Any dispute relating exclusively to use of this public website will be handled by courts of competent jurisdiction, subject to any mandatory rights or requirements under applicable law.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "Questions about these terms may be sent to IDSSPL Technologies Private Limited at info@idsspl.com or (0231) 2530950. Registered office: 11, Gurukrupa, Friends Colony, Kolhapur – 416005, Maharashtra, India.",
    ],
  },
];

export const Route = createFileRoute("/terms-conditions")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | IDSSPL Technologies" },
      {
        name: "description",
        content:
          "Review the terms governing use of the IDSSPL Technologies website, product information, enquiries, intellectual property, and external links.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Terms and Conditions | IDSSPL Technologies" },
      {
        property: "og:description",
        content:
          "Terms for using the IDSSPL website and its banking technology information, enquiry forms, and public resources.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/terms-conditions" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/terms-conditions" }],
  }),
  component: TermsConditionsPage,
});

function TermsConditionsPage() {
  return (
    <SitePage>
      <LegalPage
        eyebrow="Website Terms"
        title="Terms and Conditions"
        summary="The terms that apply when accessing IDSSPL's public website, product information, enquiry tools, and linked resources."
        updated="31 August 2026"
        sections={termsSections}
      />
    </SitePage>
  );
}
