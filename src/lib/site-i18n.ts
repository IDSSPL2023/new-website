import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import { guTranslations } from "@/i18n/gu";
import { hiTranslations } from "@/i18n/hi";
import { mrTranslations } from "@/i18n/mr";
import { taTranslations } from "@/i18n/ta";

export type SiteLanguageCode = "en" | "hi" | "mr" | "ta" | "gu";

export type SiteLanguage = {
  code: SiteLanguageCode;
  name: string;
  englishName: string;
};

export const siteLanguages: SiteLanguage[] = [
  { code: "en", name: "English", englishName: "English" },
  { code: "hi", name: "हिन्दी", englishName: "Hindi" },
  { code: "mr", name: "मराठी", englishName: "Marathi" },
  { code: "ta", name: "தமிழ்", englishName: "Tamil" },
  { code: "gu", name: "ગુજરાતી", englishName: "Gujarati" },
];

export const SITE_LANGUAGE_STORAGE_KEY = "idsspl-language";

const supportedCodes = new Set<SiteLanguageCode>(siteLanguages.map((language) => language.code));

const translationMaps = {
  en: {},
  hi: hiTranslations,
  mr: mrTranslations,
  ta: taTranslations,
  gu: guTranslations,
} satisfies Record<SiteLanguageCode, Record<string, string>>;

export const siteI18n = createInstance();

void siteI18n.use(initReactI18next).init({
  resources: Object.fromEntries(
    Object.entries(translationMaps).map(([code, translation]) => [code, { translation }]),
  ),
  lng: "en",
  fallbackLng: "en",
  supportedLngs: siteLanguages.map((language) => language.code),
  defaultNS: "translation",
  keySeparator: false,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
  initImmediate: false,
});

export function isSiteLanguageCode(value: string | null): value is SiteLanguageCode {
  return Boolean(value && supportedCodes.has(value as SiteLanguageCode));
}

export function getSavedSiteLanguage(): SiteLanguageCode {
  if (typeof window === "undefined") return "en";

  const saved = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
  return isSiteLanguageCode(saved) ? saved : "en";
}

export function setSiteLanguage(code: SiteLanguageCode) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, code);
  document.documentElement.lang = code;
  void siteI18n.changeLanguage(code);
}

export function translateSiteText(source: string, code: SiteLanguageCode) {
  return siteI18n.getFixedT(code)(source, { defaultValue: source });
}
