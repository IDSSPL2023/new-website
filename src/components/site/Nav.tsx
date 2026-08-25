import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Products", href: "#products" },
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Resources", href: "#resources" },
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
          ? "border-b border-hairline bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="shell flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logoMark} alt="IDSSPL logo" className="h-8 w-auto" />
          <span className="text-[16px] font-semibold tracking-[0.02em] text-foreground">
            IDSSPL
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="#contact"
            className="text-[13.5px] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            Contact Us
          </a>
          <a
            href="#contact"
            className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity duration-300 hover:opacity-85"
          >
            Request Demo
          </a>
        </div>

        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="text-muted-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-hairline bg-background/95 backdrop-blur-xl md:hidden">
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
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}