import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import ThemeScript from "@/components/theme/ThemeScript";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5DL6BWJ7";

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://technicaltrust.org"),
  title: {
    default: "Technical Trust",
    template: "%s | Technical Trust",
  },
  description:
    "A Sales Engineering practice and media platform — clearer technical conversations, more trustworthy demos, better buying decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body>
        <ThemeScript />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
