"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  AtSign,
  Building2,
  CheckCircle2,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { sendLeadEmail } from "@/lib/form-submit";

type EnquiryForm = {
  contactPreference: "email" | "sms";
  name: string;
  organization: string;
  email: string;
  mobile: string;
  message: string;
  website: string;
};

const initialForm: EnquiryForm = {
  contactPreference: "email",
  name: "",
  organization: "",
  email: "",
  mobile: "",
  message: "",
  website: "",
};

export function ExpertEnquirySection() {
  const [form, setForm] = useState<EnquiryForm>(initialForm);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = <Field extends keyof EnquiryForm>(
    field: Field,
    value: EnquiryForm[Field],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (status === "error") setStatus("idle");
  };

  const showSuccess = () => {
    setStatus("success");
    setForm(initialForm);
    setConsent(false);
    setErrorMessage("");
    window.setTimeout(() => {
      setStatus("idle");
    }, 5000);
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
        _subject: `[IDSSPL] New Expert Enquiry — ${organization} — ${name}`,
        _replyto: email,
        _honey: form.website,
        "Lead Type": "Talk To An Expert",
        "Full Name": name,
        Organization: organization,
        "Work Email": email,
        "Mobile Number": form.mobile.trim(),
        "Preferred Contact": form.contactPreference === "sms" ? "Phone / SMS" : "Email",
        "Banking Technology Requirement": form.message.trim(),
        "Source Page": window.location.pathname,
        Language: (document.documentElement.lang || "en").toUpperCase(),
        Consent: consent ? "Yes — visitor agreed to enquiry follow-up" : "No",
        "Submitted At": new Date().toISOString(),
      });
      showSuccess();
    } catch (error) {
      console.error("Unable to submit expert enquiry", error);
      setErrorMessage("We could not send your enquiry. Please try again.");
      setStatus("error");
    }
  };

  return (
    <section id="talk-to-expert" className="expert-section" aria-labelledby="expert-title">
      <div className="shell">
        <div className="expert-dialog">
          <div className="expert-dialog-glow" aria-hidden="true" />
          <div className="expert-dialog-layout">
            <div className="expert-dialog-intro text-left">
              <span className="expert-dialog-kicker">
                <Sparkles size={14} aria-hidden="true" />
                Let&apos;s Open The Right Door
              </span>
              <h2 id="expert-title" className="expert-dialog-title">
                Talk To An IDSSPL Expert.
              </h2>
              <p className="expert-dialog-description">
                Tell us about your institution and the banking challenge you want to solve. Our team
                will connect you with the right specialist.
              </p>

              <div className="expert-dialog-trust">
                <span className="expert-dialog-trust-icon" aria-hidden="true">
                  <ShieldCheck size={19} />
                </span>
                <span>
                  <strong>Your Enquiry Stays Private</strong>
                  <small>
                    Your details are used only to understand and respond to this request.
                  </small>
                </span>
              </div>
            </div>

            <form className="expert-form" onSubmit={handleSubmit}>
              <fieldset className="expert-contact-choice">
                <legend>How should our expert reach you?</legend>
                <div className="expert-contact-options">
                  <label className={form.contactPreference === "email" ? "is-selected" : undefined}>
                    <input
                      type="radio"
                      name="contactPreference"
                      value="email"
                      checked={form.contactPreference === "email"}
                      onChange={() => updateField("contactPreference", "email")}
                    />
                    <span className="expert-choice-icon" aria-hidden="true">
                      <AtSign size={18} />
                    </span>
                    <span>Email</span>
                  </label>
                  <label className={form.contactPreference === "sms" ? "is-selected" : undefined}>
                    <input
                      type="radio"
                      name="contactPreference"
                      value="sms"
                      checked={form.contactPreference === "sms"}
                      onChange={() => updateField("contactPreference", "sms")}
                    />
                    <span className="expert-choice-icon" aria-hidden="true">
                      <MessageSquareText size={18} />
                    </span>
                    <span>Phone / SMS</span>
                  </label>
                </div>
              </fieldset>

              <label className="expert-field">
                <span>Full name</span>
                <span className="expert-input-wrap">
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

              <label className="expert-field">
                <span>Organization name</span>
                <span className="expert-input-wrap">
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

              <label className="expert-field">
                <span>Work email address</span>
                <span className="expert-input-wrap">
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

              <label className="expert-field">
                <span>Mobile number</span>
                <span className="expert-input-wrap">
                  <Phone size={16} aria-hidden="true" />
                  <input
                    type="tel"
                    name="mobile"
                    value={form.mobile}
                    onChange={(event) => updateField("mobile", event.target.value)}
                    autoComplete="tel"
                    placeholder="+91 98765 43210"
                    minLength={8}
                    maxLength={20}
                    required
                  />
                </span>
              </label>

              <label className="expert-field expert-message-field">
                <span>What would you like to solve?</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                  placeholder="Tell us about your banking technology requirement"
                  rows={5}
                  minLength={10}
                  maxLength={1200}
                  required
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

              <label className="expert-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                  required
                />
                <span>I agree that IDSSPL may contact me about this enquiry.</span>
              </label>

              <button
                type="submit"
                className="expert-submit-button"
                disabled={status === "submitting" || status === "success"}
              >
                {status === "submitting" ? (
                  <>
                    <LoaderCircle className="animate-spin" size={18} aria-hidden="true" />
                    Sending Enquiry...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    Enquiry Sent
                  </>
                ) : (
                  <>
                    Talk To An Expert
                    <ArrowRight size={18} aria-hidden="true" />
                  </>
                )}
              </button>

              <div className="expert-form-status" aria-live="polite">
                {status === "error" ? (
                  <p className="text-red-400">{errorMessage}</p>
                ) : status === "success" ? (
                  <p>Thank you. An IDSSPL expert will contact you shortly.</p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
