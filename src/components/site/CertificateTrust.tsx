import isoCertificate from "@/assets/certificate-iso-27001.png";
import pciCertificate from "@/assets/certificate-pci-dss.png";
import { Reveal } from "./Reveal";

const certificates = [
  {
    image: isoCertificate,
    eyebrow: "Information Security",
    title: "ISO/IEC 27001:2022",
    description: "Information Security Management System",
    alt: "IDSSPL Technologies Private Limited ISO IEC 27001:2022 certificate of registration",
  },
  {
    image: pciCertificate,
    eyebrow: "Payment Data Security",
    title: "PCI DSS v4.0.1",
    description: "Payment Card Industry Data Security Standard",
    alt: "IDSSPL Technologies Private Limited PCI DSS v4.0.1 certificate of compliance",
  },
];

export function CertificateTrust() {
  return (
    <section
      aria-labelledby="certificate-trust-title"
      className="certificate-trust-section relative overflow-hidden border-t border-hairline"
    >
      <div className="certificate-trust-glow pointer-events-none absolute" />
      <div className="shell relative">
        <div className="certificate-trust-layout">
          <div className="certificate-trust-copy">
            <Reveal>
              <p className="eyebrow">Certified Security &amp; Compliance</p>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="certificate-trust-title"
                className="display section-heading-title certificate-trust-title text-foreground"
              >
                Standards That Strengthen Trust.
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="certificate-trust-description">
                Security-first architecture is reinforced by independent certifications covering
                information-security controls and payment-data practices.
              </p>
            </Reveal>

            <Reveal delay={190}>
              <div className="certificate-trust-proof" aria-label="IDSSPL certification summary">
                <div>
                  <span>ISO</span>
                  <strong>Information Security</strong>
                  <small>Structured, risk-aware operations</small>
                </div>
                <div>
                  <span>PCI</span>
                  <strong>Payment Data Protection</strong>
                  <small>Cardholder data safeguards</small>
                </div>
                <div>
                  <span>SEC</span>
                  <strong>Security Architecture</strong>
                  <small>Controlled access, auditability, and monitoring</small>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="certificate-gallery" aria-label="IDSSPL certificates">
            {certificates.map((certificate, index) => (
              <Reveal key={certificate.title} delay={110 + index * 100}>
                <figure className="certificate-frame">
                  <div className="certificate-frame-topline" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="certificate-frame-heading">
                    <div>
                      <p>{certificate.eyebrow}</p>
                      <h3>{certificate.title}</h3>
                    </div>
                    <span className="certificate-verified">Certified</span>
                  </div>

                  <div className="certificate-matte">
                    <div className="certificate-document">
                      <img
                        src={certificate.image}
                        alt={certificate.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>

                  <figcaption>{certificate.description}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
