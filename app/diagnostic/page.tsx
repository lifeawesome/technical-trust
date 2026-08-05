import type { Metadata } from "next";
import DiagnosticQuiz from "@/components/diagnostic/DiagnosticQuiz";
import PublicationShell from "@/components/publication/PublicationShell";
import { loadDiagnosticQuestions } from "@/lib/diagnostic/data";
import styles from "./Diagnostic.module.css";

const title = "Trust Map Diagnostic";
const description =
  "A free 16-question diagnostic across the Technical Trust map. See where you build trust — and where you lose it.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default async function DiagnosticPage() {
  const questions = await loadDiagnosticQuestions();

  return (
    <PublicationShell activeNav="diagnostic">
      <div className={styles.page}>
        <DiagnosticQuiz questions={questions} />
      </div>
    </PublicationShell>
  );
}
