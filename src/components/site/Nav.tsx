import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  Building2,
  ChevronDown,
  CreditCard,
  Landmark,
  Menu,
  Smartphone,
  Store,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/idsspl-logo.svg";
import lightLogo from "@/assets/idsspl-logo-light.png";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

const secondaryLinks = [
  { label: "Leadership", href: "/leadership" },
  { label: "Our Team", href: "/team" },
];

const productLinks = [
  {
    label: "Next Gen AI Core Banking Solution",
    description: "An intelligent foundation for secure, scalable, customer-centric banking.",
    href: "/products#next-gen-ai-core-banking",
    icon: Landmark,
  },
  {
    label: "NPCI Products",
    description: "Integrated rails for secure, seamless, real-time digital transactions.",
    href: "/products#npci-products",
    icon: ArrowLeftRight,
  },
  {
    label: "Digital Banking Products",
    description: "Connected customer journeys across web, mobile, messaging, and self-service.",
    href: "/products#digital-banking-products",
    icon: Smartphone,
  },
  {
    label: "Enterprise Solution",
    description: "Connected automation and control across critical banking operations.",
    href: "/products#enterprise-solution",
    icon: Building2,
  },
  {
    label: "Merchant Management Solution",
    description: "End-to-end onboarding, QR, transaction, and merchant intelligence control.",
    href: "/products#merchant-management-solution",
    icon: Store,
  },
  {
    label: "Card Management",
    description: "Secure issuance, PIN control, monitoring, and card lifecycle management.",
    href: "/products#card-management",
    icon: CreditCard,
  },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "site-header-scrolled border-b border-hairline bg-background/72 backdrop-blur-2xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between">
        <a href="/" aria-label="IDSSPL home" className="site-logo flex items-center">
          <img
            src={logoMark}
            alt=""
            aria-hidden="true"
            className="site-logo-dark h-12 w-auto md:h-[3.25rem]"
          />
          <span className="site-logo-light" aria-hidden="true">
            <img src={lightLogo} alt="" />
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15.5px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <div
            className={cn("product-nav-item", productsOpen && "is-open")}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
            onFocus={() => setProductsOpen(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                setProductsOpen(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setProductsOpen(false);
            }}
          >
            <button
              type="button"
              className="product-nav-trigger"
              aria-expanded={productsOpen}
              aria-controls="product-mega-menu"
              onClick={() => setProductsOpen(true)}
            >
              Our Products
              <ChevronDown size={16} aria-hidden="true" />
            </button>

            <div
              id="product-mega-menu"
              className="product-mega-menu"
              aria-label="Product portfolio"
              aria-hidden={!productsOpen}
            >
              <div className="product-mega-heading">
                <div>
                  <span>Product Portfolio</span>
                  <strong>Explore Banking Technology By Capability.</strong>
                </div>
                <a href="/products" onClick={() => setProductsOpen(false)}>
                  View All Products
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
              <div className="product-mega-grid">
                {productLinks.map((product) => {
                  const Icon = product.icon;
                  return (
                    <a
                      key={product.label}
                      href={product.href}
                      className="product-mega-link"
                      onClick={() => setProductsOpen(false)}
                    >
                      <span className="product-mega-icon" aria-hidden="true">
                        <Icon size={19} />
                      </span>
                      <span>
                        <strong>{product.label}</strong>
                        <small>{product.description}</small>
                      </span>
                      <ArrowRight className="product-mega-arrow" size={15} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {secondaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[15.5px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <a
            href="#talk-to-expert"
            className="shiny-button hidden rounded-full px-4 py-2 text-[13px] font-semibold lg:block"
          >
            Talk To Our Expert
          </a>
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-muted-foreground transition-colors hover:text-foreground lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-hairline bg-background/92 shadow-2xl backdrop-blur-2xl lg:hidden">
          <div className="shell flex flex-col gap-1 py-6">
            {primaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-lg text-muted-foreground"
              >
                {link.label}
              </a>
            ))}

            <button
              type="button"
              className="flex items-center justify-between py-2.5 text-left text-lg text-muted-foreground"
              aria-expanded={mobileProductsOpen}
              onClick={() => setMobileProductsOpen((current) => !current)}
            >
              Our Products
              <ChevronDown
                className={cn("transition-transform", mobileProductsOpen && "rotate-180")}
                size={17}
                aria-hidden="true"
              />
            </button>
            {mobileProductsOpen && (
              <div className="mobile-product-menu">
                {productLinks.map((product) => {
                  const Icon = product.icon;
                  return (
                    <a
                      key={product.label}
                      href={product.href}
                      onClick={() => {
                        setOpen(false);
                        setMobileProductsOpen(false);
                      }}
                    >
                      <Icon size={16} aria-hidden="true" />
                      <span>{product.label}</span>
                    </a>
                  );
                })}
                <a
                  href="/products"
                  onClick={() => {
                    setOpen(false);
                    setMobileProductsOpen(false);
                  }}
                >
                  <ArrowRight size={16} aria-hidden="true" />
                  <span>View All Products</span>
                </a>
              </div>
            )}

            {secondaryLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-lg text-muted-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#talk-to-expert"
              onClick={() => {
                setOpen(false);
              }}
              className="shiny-button mt-3 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Talk To Our Expert
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
