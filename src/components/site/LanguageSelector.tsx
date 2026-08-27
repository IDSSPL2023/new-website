"use client";

import { Check, ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import {
  getSavedSiteLanguage,
  isSiteLanguageCode,
  setSiteLanguage,
  SITE_LANGUAGE_EVENT,
  SITE_LANGUAGE_STORAGE_KEY,
  siteLanguages,
  type SiteLanguageCode,
} from "@/lib/site-i18n";

export function LanguageSelector() {
  const [selectedCode, setSelectedCode] = useState<SiteLanguageCode>("en");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLanguage = getSavedSiteLanguage();
    setSelectedCode(savedLanguage);
    document.documentElement.lang = savedLanguage;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const syncLanguage = (event: Event) => {
      const code = (event as CustomEvent<{ code?: string }>).detail?.code ?? null;
      if (isSiteLanguageCode(code)) setSelectedCode(code);
    };
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key === SITE_LANGUAGE_STORAGE_KEY && isSiteLanguageCode(event.newValue)) {
        setSelectedCode(event.newValue);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener(SITE_LANGUAGE_EVENT, syncLanguage);
    window.addEventListener("storage", syncAcrossTabs);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener(SITE_LANGUAGE_EVENT, syncLanguage);
      window.removeEventListener("storage", syncAcrossTabs);
    };
  }, []);

  const selectedLanguage =
    siteLanguages.find((language) => language.code === selectedCode) ?? siteLanguages[0];

  const selectLanguage = (languageCode: SiteLanguageCode) => {
    setOpen(false);
    if (languageCode === selectedCode) return;

    setSelectedCode(languageCode);
    setSiteLanguage(languageCode);
  };

  return (
    <div ref={containerRef} className="language-selector notranslate" translate="no">
      <button
        type="button"
        className="language-trigger"
        aria-label={`Select language. Current language: ${selectedLanguage.englishName}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <Languages aria-hidden="true" size={15} />
        <span className="language-trigger-label">{selectedLanguage.name}</span>
        <ChevronDown
          aria-hidden="true"
          size={13}
          className={`transition-transform duration-200${open ? " rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="language-menu" role="listbox" aria-label="Choose website language">
          <div className="language-menu-heading">
            <Languages aria-hidden="true" size={14} />
            Select Language
          </div>
          <div className="language-options">
            {siteLanguages.map((language) => (
              <button
                key={language.code}
                type="button"
                role="option"
                aria-selected={language.code === selectedCode}
                className={`language-option${language.code === selectedCode ? " is-selected" : ""}`}
                onClick={() => selectLanguage(language.code)}
              >
                <span>
                  <strong>{language.name}</strong>
                  <small>{language.englishName}</small>
                </span>
                {language.code === selectedCode && <Check aria-hidden="true" size={14} />}
              </button>
            ))}
          </div>
          <p className="language-attribution">Available locally in five languages.</p>
        </div>
      )}
    </div>
  );
}
