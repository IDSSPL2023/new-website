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
      { label: "Core & Digital Banking Platforms", href: "/products" },
      { label: "UPI, IMPS & ATM Switching", href: "/products" },
      { label: "Card & Payment Management", href: "/products" },
      { label: "Risk & Compliance Platforms", href: "/products" },
      { label: "Reconciliation & Settlement", href: "/products" },
      { label: "Secure Networking & Infrastructure", href: "/products" },
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
    <footer className="border-t border-hairline pt-20 pb-10">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="display text-[clamp(2.4rem,5vw,3.6rem)] text-foreground">IDSSPL</p>
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-muted-foreground">
              Providing reliable and future-ready technology solutions to transform banking,
              payments, and financial operations.
            </p>

            <form
              className="mt-10 flex max-w-xs items-center gap-2 border-b border-hairline pb-3"
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

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow">{c.title}</p>
                <ul className="mt-6 space-y-3">
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

        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-7 sm:flex-row sm:items-center sm:justify-between">
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
