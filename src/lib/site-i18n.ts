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
export const SITE_LANGUAGE_EVENT = "idsspl:language-change";

const supportedCodes = new Set<SiteLanguageCode>(
  siteLanguages.map((language) => language.code),
);

const translationMaps = {
  hi: hiTranslations,
  mr: mrTranslations,
  ta: taTranslations,
  gu: guTranslations,
} satisfies Record<Exclude<SiteLanguageCode, "en">, Record<string, string>>;

export function isSiteLanguageCode(value: string | null): value is SiteLanguageCode {
  return Boolean(value && supportedCodes.has(value as SiteLanguageCode));
}

export function getSavedSiteLanguage(): SiteLanguageCode {
  if (typeof window === "undefined") return "en";

  const saved = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
  return isSiteLanguageCode(saved) ? saved : "en";
}

export function setSiteLanguage(code: SiteLanguageCode) {
  window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, code);
  document.documentElement.lang = code;
  window.dispatchEvent(new CustomEvent(SITE_LANGUAGE_EVENT, { detail: { code } }));
}

export function translateSiteText(source: string, code: SiteLanguageCode) {
  if (code === "en") return source;
  return translationMaps[code][source] ?? source;
}
