"use client";

import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "idsspl-theme";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.dataset.theme = theme;
  root.classList.toggle("light", theme === "light");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncFromDocument = () => setTheme(readTheme());
    const syncFromSystem = () => {
      if (window.localStorage.getItem(THEME_STORAGE_KEY)) return;

      const systemTheme: Theme = media.matches ? "dark" : "light";
      applyTheme(systemTheme);
      setTheme(systemTheme);
    };
    const syncAcrossTabs = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;

      const nextTheme: Theme =
        event.newValue === "light" || event.newValue === "dark"
          ? event.newValue
          : media.matches
            ? "dark"
            : "light";

      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    syncFromDocument();
    media.addEventListener("change", syncFromSystem);
    window.addEventListener("storage", syncAcrossTabs);

    return () => {
      media.removeEventListener("change", syncFromSystem);
      window.removeEventListener("storage", syncAcrossTabs);
    };
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === "dark"}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className="theme-toggle"
      onClick={() => {
        applyTheme(nextTheme);
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        setTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-thumb" aria-hidden="true">
        <span className="theme-toggle-thumb-icon theme-toggle-thumb-sun">
          <Sun size={17} strokeWidth={2} />
        </span>
        <span className="theme-toggle-thumb-icon theme-toggle-thumb-moon">
          <MoonStar size={17} strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}
