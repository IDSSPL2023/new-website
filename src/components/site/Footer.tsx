import { Building2, Mail, MapPin, Phone } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Leadership", href: "/leadership" },
      { label: "Our Team", href: "/team" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      {
        label: "Next Gen AI Core Banking Solution",
        href: "/products#next-gen-ai-core-banking",
      },
      { label: "NPCI Products", href: "/products#npci-products" },
      { label: "Digital Banking Products", href: "/products#digital-banking-products" },
      { label: "Enterprise Solution", href: "/products#enterprise-solution" },
      {
        label: "Merchant Management Solution",
        href: "/products#merchant-management-solution",
      },
      { label: "Card Management", href: "/products#card-management" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Product Overview", href: "/products" },
      { label: "Case Studies", href: "/#resources" },
      { label: "Documentation", href: "/products" },
      { label: "Support", href: "/#contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/#contact" },
      { label: "Terms & Conditions", href: "/#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline pt-14 pb-8">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="display text-[clamp(2.4rem,5vw,3.6rem)] text-foreground">IDSSPL</p>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
              Providing reliable and future-ready technology solutions to transform banking,
              payments, and financial operations.
            </p>

            <form
              className="mt-7 flex max-w-xs items-center gap-2 border-b border-hairline pb-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Subscribe to newsletter"
                aria-label="Email address"
                className="w-full bg-transparent text-[13.5px] text-foreground outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                className="text-[12px] tracking-[0.14em] text-electric uppercase"
              >
                Join
              </button>
            </form>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <section className="footer-contact-card mt-10" aria-labelledby="footer-contact-title">
          <div className="footer-contact-heading">
            <span className="footer-contact-heading-icon" aria-hidden="true">
              <Building2 size={19} />
            </span>
            <div>
              <h2 id="footer-contact-title">Contact Information</h2>
              <p>Verified company contact details and office addresses.</p>
            </div>
          </div>

          <div className="footer-contact-grid">
            <div className="footer-contact-unit">
              <p className="footer-contact-label">Contact</p>
              <div className="footer-contact-links">
                <a href="tel:+912312530950">
                  <span aria-hidden="true">
                    <Phone size={16} />
                  </span>
                  <span>
                    <small>Phone</small>
                    (0231) 2530950
                  </span>
                </a>
                <a href="mailto:info@idsspl.com">
                  <span aria-hidden="true">
                    <Mail size={16} />
                  </span>
                  <span>
                    <small>Email</small>
                    info@idsspl.com
                  </span>
                </a>
              </div>
            </div>

            <address className="footer-contact-unit not-italic">
              <p className="footer-contact-label">Registered Office</p>
              <div className="footer-address">
                <span aria-hidden="true">
                  <MapPin size={17} />
                </span>
                <p>11, Gurukrupa, Friends Colony, Kolhapur – 416005 (Maharashtra), India</p>
              </div>
            </address>

            <address className="footer-contact-unit footer-corporate-address not-italic">
              <p className="footer-contact-label">Corporate Office</p>
              <div className="footer-address">
                <span aria-hidden="true">
                  <MapPin size={17} />
                </span>
                <p>
                  <strong>IDSSPL Technologies Pvt. Ltd.</strong>
                  Office No. 406, De Elmas, Next to Ginger Hotel, Sonawala Lane, Avenue Sonawala
                  Road, Goregaon (East), Mumbai Suburban, Maharashtra – 400063, India
                </p>
              </div>
            </address>
          </div>
        </section>

        <div className="mt-10 flex flex-col gap-4 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-muted-foreground">
            © 2026 IDSSPL Technologies Private Limited. All rights reserved.
          </p>
          <a
            href="mailto:info@idsspl.com"
            className="text-[12px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            info@idsspl.com
          </a>
        </div>
      </div>
    </footer>
  );
}
