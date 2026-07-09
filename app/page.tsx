import type { Metadata } from "next";
import ComingSoonPage from "@/components/coming-soon/ComingSoonPage";
import { comingSoon } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: comingSoon.metadata.title },
  description: comingSoon.metadata.description,
  openGraph: {
    title: comingSoon.metadata.title,
    description: comingSoon.metadata.description,
    type: "website",
  },
};

export default function Home() {
  return <ComingSoonPage />;
}
