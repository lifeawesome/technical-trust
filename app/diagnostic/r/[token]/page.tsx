import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DiagnosticResults from "@/components/diagnostic/DiagnosticResults";
import EmailGate from "@/components/diagnostic/EmailGate";
import PublicationShell from "@/components/publication/PublicationShell";
import { getDiagnosticResultByToken } from "@/lib/diagnostic/data";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import styles from "../../Diagnostic.module.css";

type PageProps = {
  params: Promise<{ token: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { token } = await params;
  return {
    title: "Your Trust Map",
    description: "Trust Map Diagnostic results.",
    robots: { index: false, follow: false },
    alternates: { canonical: `/diagnostic/r/${token}` },
  };
}

export default async function DiagnosticResultPage({ params }: PageProps) {
  const { token } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <PublicationShell activeNav="diagnostic">
        <div className={`${styles.page} ${styles.resultsPage}`}>
          <p className={`${styles.kicker} mono`}>TRUST MAP DIAGNOSTIC</p>
          <h1 className={styles.brandTitle}>Results unavailable</h1>
          <p className={styles.lead}>
            Diagnostic storage isn&apos;t configured yet. Add Supabase env vars
            and run the migration, then retake the diagnostic.
          </p>
          <Link href="/diagnostic" className={styles.cardLink}>
            Back to diagnostic →
          </Link>
        </div>
      </PublicationShell>
    );
  }

  let result;
  try {
    result = await getDiagnosticResultByToken(token);
  } catch {
    notFound();
  }

  if (!result) {
    notFound();
  }

  const unlocked = Boolean(result.unlocked_at);

  return (
    <PublicationShell activeNav="diagnostic">
      <div className={`${styles.page} ${styles.resultsPage}`}>
        {unlocked ? (
          <DiagnosticResults result={result} />
        ) : (
          <div>
            <p className={`${styles.kicker} mono`}>TRUST MAP DIAGNOSTIC</p>
            <h1 className={styles.brandTitle}>Unlock your Trust Map</h1>
            <p className={styles.lead}>
              You finished the diagnostic. One step left — claim your heatmap
              and the Patterns that match your weakest cells.
            </p>
            <EmailGate
              token={token}
              weakestCell={result.weakest_cells[0] ?? null}
            />
          </div>
        )}
      </div>
    </PublicationShell>
  );
}
