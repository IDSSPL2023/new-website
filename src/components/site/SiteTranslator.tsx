"use client";

import { useEffect } from "react";

import {
  getSavedSiteLanguage,
  isSiteLanguageCode,
  SITE_LANGUAGE_STORAGE_KEY,
  siteI18n,
  translateSiteText,
  type SiteLanguageCode,
} from "@/lib/site-i18n";

const translatedAttributes = ["placeholder", "aria-label", "title", "alt"] as const;
const ignoredSelector = ".notranslate, script, style, noscript, svg, code, pre";

type OriginalText = {
  prefix: string;
  source: string;
  suffix: string;
};

export function SiteTranslator() {
  useEffect(() => {
    const originalText = new WeakMap<Text, OriginalText>();
    const originalAttributes = new WeakMap<Element, Map<string, string>>();
    let language = getSavedSiteLanguage();
    let scheduled = false;

    if (siteI18n.language !== language) void siteI18n.changeLanguage(language);

    const shouldIgnore = (element: Element | null) =>
      !element || Boolean(element.closest(ignoredSelector));

    const readOriginalText = (node: Text) => {
      const saved = originalText.get(node);
      if (saved) return saved;

      const raw = node.textContent ?? "";
      const match = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const value = {
        prefix: match?.[1] ?? "",
        source: (match?.[2] ?? raw).replace(/\s+/g, " ").trim(),
        suffix: match?.[3] ?? "",
      };
      originalText.set(node, value);
      return value;
    };

    const translateTextNode = (node: Text) => {
      if (shouldIgnore(node.parentElement)) return;

      const original = readOriginalText(node);
      if (!original.source) return;

      const translated = translateSiteText(original.source, language);
      const nextValue = `${original.prefix}${translated}${original.suffix}`;
      if (node.textContent !== nextValue) node.textContent = nextValue;
    };

    const translateElementAttributes = (element: Element) => {
      if (shouldIgnore(element)) return;

      let originals = originalAttributes.get(element);
      if (!originals) {
        originals = new Map<string, string>();
        originalAttributes.set(element, originals);
      }

      for (const attribute of translatedAttributes) {
        const current = element.getAttribute(attribute);
        if (!current) continue;
        if (!originals.has(attribute)) originals.set(attribute, current);

        const source = originals.get(attribute) ?? current;
        const translated = translateSiteText(source, language);
        if (current !== translated) element.setAttribute(attribute, translated);
      }
    };

    const translateTree = () => {
      scheduled = false;
      document.documentElement.lang = language;

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();
      while (node) {
        translateTextNode(node as Text);
        node = walker.nextNode();
      }

      for (const element of Array.from(
        document.querySelectorAll("[placeholder], [aria-label], [title], [alt]"),
      )) {
        translateElementAttributes(element);
      }
    };

    const scheduleTranslation = () => {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(translateTree);
    };

    const onLanguageChange = (code: string) => {
      if (!isSiteLanguageCode(code)) return;
      language = code;
      scheduleTranslation();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key !== SITE_LANGUAGE_STORAGE_KEY || !isSiteLanguageCode(event.newValue)) return;
      void siteI18n.changeLanguage(event.newValue);
    };

    const observer = new MutationObserver(scheduleTranslation);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: [...translatedAttributes],
    });

    siteI18n.on("languageChanged", onLanguageChange);
    window.addEventListener("storage", onStorage);
    translateTree();

    return () => {
      observer.disconnect();
      siteI18n.off("languageChanged", onLanguageChange);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
