"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Building2, CheckCircle2, Download, LoaderCircle, Mail, UserRound } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { sendLeadEmail } from "@/lib/form-submit";

const brochureUrl = "/downloads/IDSSPL-Brochure.pdf";
const showFloatingBrochureCta = false;

type LeadForm = {
  name: string;
  organization: string;
  email: string;
  need: string;
  notes: string;
  website: string;
};

const initialForm: LeadForm = {
  name: "",
  organization: "",
  email: "",
  need: "",
  notes: "",
  website: "",
};

const requirements = [
  "Next Gen AI Core Banking Solution",
  "NPCI Products",
  "Digital Banking Products",
  "Enterprise Solution",
  "Merchant Management Solution",
  "Card Management",
  "Other Requirement",
];

function startBrochureDownload() {
  const link = document.createElement("a");
  link.href = brochureUrl;
  link.download = "IDSSPL-Banking-Division-Brochure.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function BrochureLeadCapture() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<LeadForm>(initialForm);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const openFromWebsiteAction = () => setOpen(true);
    window.addEventListener("idsspl:open-brochure", openFromWebsiteAction);
    return () => window.removeEventListener("idsspl:open-brochure", openFromWebsiteAction);
  }, []);

  const updateField = (field: keyof LeadForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const reset = () => {
    setForm(initialForm);
    setConsent(false);
    setStatus("idle");
    setErrorMessage("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen && status !== "submitting") reset();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const name = form.name.trim();
      const organization = form.organization.trim();
      const email = form.email.trim().toLowerCase();

      await sendLeadEmail({
        _subject: `[IDSSPL] New Brochure Lead — ${organization} — ${name}`,
        _replyto: email,
        _honey: form.website,
        "Lead Type": "Brochure Download",
        "Full Name": name,
        Organization: organization,
        "Work Email": email,
        Requirement: form.need,
        "Additional Notes": form.notes.trim() || "No additional notes provided",
        "Source Page": window.location.pathname,
        Language: (document.documentElement.lang || "en").toUpperCase(),
        Consent: consent ? "Yes — visitor agreed to relevant follow-up" : "No",
        "Submitted At": new Date().toISOString(),
      });

      setStatus("success");
      startBrochureDownload();
      window.setTimeout(() => {
        setOpen(false);
        reset();
      }, 1100);
    } catch (error) {
      console.error("Unable to submit brochure lead", error);
      setErrorMessage("We could not start the download. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      {showFloatingBrochureCta && (
        <button
          type="button"
          className="brochure-float-button"
          onClick={() => setOpen(true)}
          aria-label="Download Brochure"
        >
          <span className="brochure-float-icon" aria-hidden="true">
            <Download size={17} strokeWidth={2.2} />
          </span>
          <span>Download Brochure</span>
        </button>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="brochure-lead-dialog max-h-[calc(100vh-2rem)] max-w-[34rem] overflow-y-auto border-0 p-0">
          <div className="brochure-lead-glow" aria-hidden="true" />
          <div className="relative p-6 sm:p-8">
            <DialogHeader className="pr-8 text-left">
              <span className="brochure-lead-kicker">
                <Download size={14} aria-hidden="true" />
                Company Brochure
              </span>
              <DialogTitle className="mt-4 text-[clamp(1.65rem,4vw,2.25rem)] leading-tight tracking-[-0.035em] text-foreground">
                Get the IDSSPL brochure
              </DialogTitle>
              <DialogDescription className="mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
                Tell us a little about your organization and what you need. The brochure will
                download immediately after submission.
              </DialogDescription>
            </DialogHeader>

            <form className="brochure-lead-form mt-7" onSubmit={handleSubmit}>
              <label className="brochure-lead-field">
                <span>Full name</span>
                <span className="brochure-input-wrap">
                  <UserRound size={16} aria-hidden="true" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                  />
                </span>
              </label>

              <label className="brochure-lead-field">
                <span>Organization name</span>
                <span className="brochure-input-wrap">
                  <Building2 size={16} aria-hidden="true" />
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={(event) => updateField("organization", event.target.value)}
                    autoComplete="organization"
                    placeholder="Bank or organization"
                    required
                  />
                </span>
              </label>

              <label className="brochure-lead-field">
                <span>Work email address</span>
                <span className="brochure-input-wrap">
                  <Mail size={16} aria-hidden="true" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    autoComplete="email"
                    placeholder="name@organization.com"
                    required
                  />
                </span>
              </label>

              <label className="brochure-lead-field">
                <span>What are you looking for?</span>
                <span className="brochure-input-wrap brochure-select-wrap">
                  <select
                    name="need"
                    value={form.need}
                    onChange={(event) => updateField("need", event.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a requirement
                    </option>
                    {requirements.map((requirement) => (
                      <option key={requirement} value={requirement}>
                        {requirement}
                      </option>
                    ))}
                  </select>
                </span>
              </label>

              <label className="brochure-lead-field">
                <span>Tell us more (optional)</span>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Share your current banking technology requirement"
                  rows={3}
                  maxLength={800}
                />
              </label>

              <label className="sr-only" aria-hidden="true">
                Website
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  name="website"
                  value={form.website}
                  onChange={(event) => updateField("website", event.target.value)}
                />
              </label>

              <label className="brochure-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                />
                <span>
                  I agree that IDSSPL may contact me about relevant banking technology solutions.
                </span>
              </label>

              <p className="brochure-privacy-note">
                Your details are private and will only be used to follow up on this enquiry.
              </p>

              <button
                type="submit"
                className="brochure-submit-button"
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="animate-spin" size={17} aria-hidden="true" />
                    Submitting...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={17} aria-hidden="true" />
                    Download starting
                  </>
                ) : (
                  <>
                    <Download size={17} aria-hidden="true" />
                    Submit & Download
                  </>
                )}
              </button>

              <div className="min-h-5" aria-live="polite">
                {status === "error" ? (
                  <p className="mt-3 text-center text-[12px] font-medium text-red-400">
                    {errorMessage}
                  </p>
                ) : status === "success" ? (
                  <p className="mt-3 text-center text-[12px] font-medium text-cyan">
                    Thank you. Your brochure download is starting.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
