import type { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import { siteI18n } from "@/lib/site-i18n";

import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { SiteTranslator } from "./SiteTranslator";
import { BrochureLeadCapture } from "./BrochureLeadCapture";
import { ExpertEnquirySection } from "./ExpertEnquiryDialog";
import { AIChatbot } from "./AIChatbot";

export function SitePage({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={siteI18n}>
      <div className="min-h-screen bg-transparent text-foreground">
        <SiteTranslator />
        <Nav />
        <main>{children}</main>
        <ExpertEnquirySection />
        <Footer />
        <BrochureLeadCapture />
        <AIChatbot />
      </div>
    </I18nextProvider>
  );
}
