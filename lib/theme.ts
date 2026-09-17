export const THEME_COOKIE = "tt-theme";
export const THEME_MAX_AGE = 60 * 60 * 24 * 365;

export type Theme = "light" | "dark";

export const DEFAULT_THEME: Theme = "light";

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "light" || value === "dark";
}

export function readThemeCookie(cookie = ""): Theme {
  const match = cookie.match(new RegExp(`(?:^|; )${THEME_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : undefined;
  return isTheme(value) ? value : DEFAULT_THEME;
}

export function themeCookie(theme: Theme): string {
  const secure =
    typeof location !== "undefined" && location.protocol === "https:"
      ? "; Secure"
      : "";
  return `${THEME_COOKIE}=${theme}; Path=/; Max-Age=${THEME_MAX_AGE}; SameSite=Lax${secure}`;
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  document.cookie = themeCookie(theme);
  window.dispatchEvent(new Event("tt-theme-change"));
}

export const THEME_BOOTSTRAP = `(function(){try{var m=document.cookie.match(/(?:^|; )${THEME_COOKIE}=([^;]*)/);var t=m?decodeURIComponent(m[1]):"${DEFAULT_THEME}";if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);document.documentElement.style.colorScheme=t}}catch(e){}})();`;
