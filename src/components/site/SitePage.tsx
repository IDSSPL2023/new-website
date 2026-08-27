import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SiteTranslator } from "./SiteTranslator";

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <SiteTranslator />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
