import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import { guTranslations } from "@/i18n/gu";
import { hiTranslations } from "@/i18n/hi";
import { homeTranslations } from "@/i18n/home";
import { mrTranslations } from "@/i18n/mr";
import { taTranslations } from "@/i18n/ta";
import { isProtectedSiteText } from "@/i18n/protected-terms";
import { teamTranslations } from "@/i18n/team";

export { isProtectedSiteText } from "@/i18n/protected-terms";

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
const SITE_LANGUAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const supportedCodes = new Set<SiteLanguageCode>(siteLanguages.map((language) => language.code));

const translationMaps = {
  en: {},
  hi: { ...hiTranslations, ...homeTranslations.hi, ...teamTranslations.hi },
  mr: { ...mrTranslations, ...homeTranslations.mr, ...teamTranslations.mr },
  ta: { ...taTranslations, ...homeTranslations.ta, ...teamTranslations.ta },
  gu: { ...guTranslations, ...homeTranslations.gu, ...teamTranslations.gu },
} satisfies Record<SiteLanguageCode, Record<string, string>>;

const normalizeTranslationKey = (value: string) =>
  value
    .normalize("NFKC")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("en");

const normalizedTranslationMaps = Object.fromEntries(
  Object.entries(translationMaps).map(([code, translations]) => [
    code,
    new Map(
      Object.entries(translations).map(([source, translation]) => [
        normalizeTranslationKey(source),
        translation,
      ]),
    ),
  ]),
) as Record<SiteLanguageCode, Map<string, string>>;

const lookupTranslation = (source: string, code: SiteLanguageCode) =>
  translationMaps[code][source] ??
  normalizedTranslationMaps[code].get(normalizeTranslationKey(source));

const translateTemplate = (source: string, code: SiteLanguageCode) => {
  const countMatch = source.match(/^(\d+) Team Profiles$/i);
  if (countMatch) {
    return lookupTranslation("{count} Team Profiles", code)?.replace("{count}", countMatch[1]);
  }

  const roleDetailsMatch = source.match(/^View (.+) details$/i);
  if (roleDetailsMatch) {
    const role = lookupTranslation(roleDetailsMatch[1], code) ?? roleDetailsMatch[1];
    return lookupTranslation("View {value} details", code)?.replace("{value}", role);
  }

  const overviewMatch = source.match(/^Return to (.+) overview$/i);
  if (overviewMatch) {
    const value = lookupTranslation(overviewMatch[1], code) ?? overviewMatch[1];
    return lookupTranslation("Return to {value} overview", code)?.replace("{value}", value);
  }

  const profileMatch = source.match(/^View (.+) profile$/i);
  if (profileMatch) {
    const value = lookupTranslation(profileMatch[1], code) ?? profileMatch[1];
    return lookupTranslation("View {value} profile", code)?.replace("{value}", value);
  }

  const teamImageMatch = source.match(/^(.+), (.+) at IDSSPL$/);
  if (teamImageMatch) {
    const role = lookupTranslation(teamImageMatch[2], code) ?? teamImageMatch[2];
    return lookupTranslation("{name}, {role} at IDSSPL", code)
      ?.replace("{name}", teamImageMatch[1])
      .replace("{role}", role);
  }

  return undefined;
};

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

  try {
    const saved = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    if (isSiteLanguageCode(saved)) return saved;
  } catch {
    /* Fall through to the cookie when browser storage is unavailable. */
  }

  const savedCookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SITE_LANGUAGE_STORAGE_KEY}=`))
    ?.split("=")[1];

  return isSiteLanguageCode(savedCookie) ? savedCookie : "en";
}

export function setSiteLanguage(code: SiteLanguageCode) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, code);
  } catch {
    /* Language selection still works when browser storage is unavailable. */
  }
  document.cookie = `${SITE_LANGUAGE_STORAGE_KEY}=${code}; max-age=${SITE_LANGUAGE_COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
  document.documentElement.lang = code;
  void siteI18n.changeLanguage(code);
}

export function translateSiteText(source: string, code: SiteLanguageCode) {
  if (code === "en" || isProtectedSiteText(source)) return source;

  return lookupTranslation(source, code) ?? translateTemplate(source, code) ?? source;
}
