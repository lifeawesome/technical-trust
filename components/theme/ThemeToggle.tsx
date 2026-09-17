"use client";

import { useEffect, useState } from "react";
import {
  applyTheme,
  DEFAULT_THEME,
  isTheme,
  type Theme,
} from "@/lib/theme";
import styles from "./ThemeToggle.module.css";

type ThemeToggleProps = {
  showLabel?: boolean;
  className?: string;
};

function readDocumentTheme(): Theme {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const value = document.documentElement.getAttribute("data-theme");
  return isTheme(value) ? value : DEFAULT_THEME;
}

export default function ThemeToggle({
  showLabel = false,
  className,
}: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const sync = () => setTheme(readDocumentTheme());
    sync();
    window.addEventListener("tt-theme-change", sync);
    return () => window.removeEventListener("tt-theme-change", sync);
  }, []);

  function toggle() {
    const next: Theme = readDocumentTheme() === "light" ? "dark" : "light";
    setTheme(next);
    applyTheme(next);
  }

  const nextLabel =
    theme === "light" ? "Switch to dark theme" : "Switch to light theme";

  return (
    <button
      type="button"
      className={`${showLabel ? styles.row : styles.button}${className ? ` ${className}` : ""}`}
      aria-label={nextLabel}
      title={nextLabel}
      onClick={toggle}
    >
      <span className={styles.sun} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M12 3v1.5M12 19.5V21M4.93 4.93l1.06 1.06M18.01 18.01l1.06 1.06M3 12h1.5M19.5 12H21M4.93 19.07l1.06-1.06M18.01 5.99l1.06-1.06"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </span>
      <span className={styles.moon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M15.5 4.5a7.5 7.5 0 1 0 4 12.2 6.2 6.2 0 0 1-8.7-8.7 7.46 7.46 0 0 0 4.7-3.5z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {showLabel ? (
        <span className={styles.label}>
          {theme === "light" ? "Dark" : "Light"}
        </span>
      ) : null}
    </button>
  );
}
