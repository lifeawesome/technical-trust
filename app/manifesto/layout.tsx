import { Source_Serif_4 } from "next/font/google";
import PublicationShell from "@/components/publication/PublicationShell";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-manifesto-serif",
  display: "swap",
});

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicationShell activeNav="manifesto">
      <div className={sourceSerif.variable}>{children}</div>
    </PublicationShell>
  );
}
