"use client";

import { useEffect } from "react";

const brochureUrl = "/downloads/IDSSPL-Brochure.pdf";

function startBrochureDownload() {
  const link = document.createElement("a");
  link.href = brochureUrl;
  link.download = "IDSSPL-Banking-Division-Brochure.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Lets actions outside the brochure section (such as the website advisor) start
 * the local PDF download. This deliberately has no form-service dependency:
 * a brochure request should never be held up by email activation or delivery.
 */
export function BrochureLeadCapture() {
  useEffect(() => {
    window.addEventListener("idsspl:open-brochure", startBrochureDownload);
    return () => window.removeEventListener("idsspl:open-brochure", startBrochureDownload);
  }, []);

  return null;
}
