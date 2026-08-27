import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/idsspl-logo.svg";
import lightLogo from "@/assets/idsspl-logo-light.png";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products" },
  { label: "Leadership", href: "/leadership" },
  { label: "Our Team", href: "/team" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
            className="site-logo-dark h-11 w-auto md:h-12"
          />
          <span className="site-logo-light" aria-hidden="true">
            <img src={lightLogo} alt="" />
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13.5px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <LanguageSelector />
          <ThemeToggle />
          <a
            href="/#contact"
            className="hidden text-[13.5px] text-muted-foreground transition-colors duration-300 hover:text-foreground lg:block"
          >
            Speak With an Expert
          </a>
          <a
            href="/#contact"
            className="shiny-button hidden rounded-full px-4 py-2 text-[13px] font-semibold lg:block"
          >
            Request Demo
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
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-lg text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-3 py-2.5 text-lg text-muted-foreground"
            >
              Speak With an Expert
            </a>
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="shiny-button mt-2 rounded-full px-5 py-3 text-center text-sm font-semibold"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
