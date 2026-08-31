import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, type LegalSection } from "@/components/site/LegalPage";
import { SitePage } from "@/components/site/SitePage";

const privacySections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "We collect information that you choose to provide when you contact IDSSPL, request a brochure, speak with an expert, subscribe to updates, or use the website chatbot.",
    ],
    bullets: [
      "Contact and professional details such as your name, work email address, mobile number, organisation, and role.",
      "Enquiry details, product interests, banking requirements, chatbot messages, and other information you include in a request.",
      "Technical information such as device type, browser, referring page, approximate location, pages viewed, and diagnostic information when website analytics or security monitoring is enabled.",
      "Website preferences stored on your device, including selected theme, language, and temporary chatbot-session information.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    bullets: [
      "Respond to enquiries and connect you with the appropriate banking-technology specialist.",
      "Provide requested brochures, product information, demonstrations, support, or business communications.",
      "Understand institutional requirements and improve our platforms, website experience, content, and services.",
      "Protect the website, investigate misuse, maintain service reliability, and meet applicable legal or regulatory obligations.",
      "Measure website and campaign performance when analytics tools are enabled.",
    ],
  },
  {
    id: "communications-and-consent",
    title: "Communications and Consent",
    paragraphs: [
      "When a form asks for consent, IDSSPL may contact you using the channel you selected about that enquiry. You can ask us to stop non-essential communications at any time by replying to the message or contacting us directly.",
      "Submitting an enquiry does not create a customer, supplier, employment, or contractual relationship with IDSSPL.",
    ],
  },
  {
    id: "cookies-and-storage",
    title: "Cookies and Local Storage",
    paragraphs: [
      "The website uses local browser storage to remember your theme and language preferences and session storage to retain temporary chatbot context. Essential storage supports the experience you request and does not by itself identify you across unrelated websites.",
      "If analytics, advertising, or additional cookie-based services are introduced, this policy and any required consent controls should be updated before those services are enabled.",
    ],
  },
  {
    id: "sharing-and-service-providers",
    title: "Sharing and Service Providers",
    paragraphs: [
      "IDSSPL does not sell or rent personal information. Information may be shared with authorised employees and trusted service providers that support website hosting, communications, security, analytics, customer-enquiry management, or document delivery, subject to appropriate confidentiality and security requirements.",
      "We may also disclose information when required by law, to protect legal rights, or to investigate fraud, security incidents, or misuse of our services.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We apply reasonable technical and organisational measures intended to protect website information against unauthorised access, alteration, loss, misuse, or disclosure. No internet transmission or storage system can be guaranteed to be completely secure.",
      "Do not submit passwords, payment credentials, confidential banking data, or production customer records through public website forms or the chatbot.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    paragraphs: [
      "We retain enquiry and communication information only for as long as reasonably necessary to respond, manage the business relationship, maintain records, resolve disputes, protect the service, and satisfy applicable legal obligations. Retention periods may differ according to the nature of the interaction.",
    ],
  },
  {
    id: "your-choices",
    title: "Your Choices and Requests",
    paragraphs: [
      "Subject to applicable law, you may ask us to access, correct, update, or delete personal information associated with your website enquiry. We may need to verify your identity before completing a request and may retain information where legally required.",
      "You can clear theme, language, and chatbot-session information through your browser settings.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paragraphs: [
      "The website may link to social networks, technology partners, or other third-party services. Their privacy practices are governed by their own policies, and IDSSPL is not responsible for external websites or services.",
    ],
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    paragraphs: [
      "We may update this Privacy Policy when our website, services, or legal obligations change. The latest version will be published on this page with a revised update date.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "For privacy questions or requests, contact IDSSPL Technologies Private Limited at info@idsspl.com or (0231) 2530950. Registered office: 11, Gurukrupa, Friends Colony, Kolhapur – 416005, Maharashtra, India.",
    ],
  },
];

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | IDSSPL Technologies" },
      {
        name: "description",
        content:
          "Read how IDSSPL Technologies collects, uses, protects, and manages information submitted through its banking technology website.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Privacy Policy | IDSSPL Technologies" },
      {
        property: "og:description",
        content:
          "Information about website enquiries, preferences, communications, data security, retention, and privacy choices at IDSSPL.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.idsspl.com/privacy-policy" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://www.idsspl.com/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SitePage>
      <LegalPage
        eyebrow="Privacy and Data Protection"
        title="Privacy Policy"
        summary="How IDSSPL handles information shared through website enquiries, brochure requests, subscriptions, and chatbot conversations."
        updated="31 August 2026"
        sections={privacySections}
      />
    </SitePage>
  );
}
