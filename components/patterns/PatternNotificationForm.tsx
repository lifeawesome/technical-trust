"use client";

import { FormEvent, useState } from "react";
import { trackPatternWaitlistSignup } from "@/lib/analytics";
import styles from "@/app/patterns/ComingSoon.module.css";

type PatternNotificationFormProps = {
  patternSlug: string;
  patternTitle: string;
  source?: "diagnostic" | "website" | "newsletter" | "other";
  weakCellScore?: number;
};

export default function PatternNotificationForm({
  patternSlug,
  patternTitle,
  source = "website",
  weakCellScore,
}: PatternNotificationFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/patterns/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          pattern_slug: patternSlug,
          source,
          weak_cell_score: weakCellScore,
          pageUrl: window.location.href,
          documentReferrer: document.referrer || undefined,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to subscribe");
      }

      trackPatternWaitlistSignup({
        patternSlug,
        source,
        weakCellScore,
      });
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Failed to subscribe. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className={styles.notifySuccess} role="status">
        You&apos;ll get an email when {patternTitle} is live.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.notifyForm}>
      <label htmlFor="pattern-notify-email" className={styles.notifyLabel}>
        Get notified when {patternTitle} publishes
      </label>
      <div className={styles.notifyRow}>
        <input
          id="pattern-notify-email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={styles.notifyInput}
        />
        <button
          type="submit"
          className={styles.notifyButton}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing…" : "Notify me"}
        </button>
      </div>
      {error ? <p className={styles.notifyError}>{error}</p> : null}
    </form>
  );
}
