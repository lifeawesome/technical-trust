"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { trackDiagnosticUnlocked } from "@/lib/analytics";
import {
  type CellScore,
  COLUMN_LABELS,
  ROW_LABELS,
} from "@/lib/diagnostic/types";
import styles from "@/app/diagnostic/Diagnostic.module.css";

type EmailGateProps = {
  token: string;
  weakestCell: CellScore | null;
};

export default function EmailGate({ token, weakestCell }: EmailGateProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const teaser = weakestCell
    ? `${ROW_LABELS[weakestCell.row]} × ${COLUMN_LABELS[weakestCell.column]}`
    : "your Trust Map";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/diagnostic/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          pageUrl: window.location.href,
          documentReferrer: document.referrer || undefined,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unlock failed");
      }

      const weakest = weakestCell
        ? `${weakestCell.row}_${weakestCell.column}`
        : undefined;
      trackDiagnosticUnlocked(weakest);
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not unlock results. Try again.",
      );
    }
  }

  return (
    <div className={styles.gatePanel}>
      <p className={`${styles.teaserLabel} mono`}>YOUR WEAKEST CELL</p>
      <h2 className={styles.teaserCell}>{teaser}</h2>
      <p className={styles.teaserCopy}>
        Enter your email to unlock the full heatmap — and the Patterns that
        match where you should focus first.
      </p>

      <form onSubmit={handleSubmit} className={styles.gateForm}>
        <label htmlFor="diagnostic-email" className={styles.srOnly}>
          Email
        </label>
        <input
          id="diagnostic-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={styles.gateInput}
        />
        <button
          type="submit"
          className={styles.primaryCta}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Unlocking…" : "Unlock my Trust Map"}
        </button>
      </form>

      <p className={styles.gateHint}>
        Free. Weekly lessons on the map. Unsubscribe anytime.
      </p>
      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
