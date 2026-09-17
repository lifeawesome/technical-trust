import Script from "next/script";
import { THEME_BOOTSTRAP } from "@/lib/theme";

export default function ThemeScript() {
  return (
    <Script id="tt-theme" strategy="beforeInteractive">
      {THEME_BOOTSTRAP}
    </Script>
  );
}
