"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  trackDiagnosticCompleted,
  trackDiagnosticStarted,
} from "@/lib/analytics";
import {
  type DiagnosticQuestion,
  type LikertValue,
  COLUMN_LABELS,
  LIKERT_LABELS,
  ROW_LABELS,
} from "@/lib/diagnostic/types";
import styles from "@/app/diagnostic/Diagnostic.module.css";

const LIKERT_VALUES = [1, 2, 3, 4, 5] as const;

type DiagnosticQuizProps = {
  questions: DiagnosticQuestion[];
};

export default function DiagnosticQuiz({ questions }: DiagnosticQuizProps) {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, LikertValue>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const current = questions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length
    ? ((index + (answers[current?.id] ? 1 : 0)) / questions.length) * 100
    : 0;

  useEffect(() => {
    if (started) {
      trackDiagnosticStarted();
    }
  }, [started]);

  const canSubmit = useMemo(
    () => questions.every((q) => answers[q.id] != null),
    [answers, questions],
  );

  async function submitAll(nextAnswers: Record<string, LikertValue>) {
    setSubmitting(true);
    setError(null);

    const payload = questions.map((q) => ({
      question_id: q.id,
      value: nextAnswers[q.id],
      framework_row: q.framework_row,
      framework_column: q.framework_column,
    }));

    try {
      const response = await fetch("/api/diagnostic/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: payload }),
      });

      const data = (await response.json()) as {
        token?: string;
        error?: string;
        weakestPreview?: { row: string; column: string } | null;
      };

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Submit failed");
      }

      const weakest = data.weakestPreview
        ? `${data.weakestPreview.row}_${data.weakestPreview.column}`
        : undefined;
      trackDiagnosticCompleted(weakest);
      router.push(`/diagnostic/r/${data.token}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setSubmitting(false);
    }
  }

  function selectValue(value: LikertValue) {
    if (!current || submitting) return;

    const nextAnswers = { ...answers, [current.id]: value };
    setAnswers(nextAnswers);

    if (index < questions.length - 1) {
      window.setTimeout(() => setIndex((i) => i + 1), 180);
      return;
    }

    if (questions.every((q) => nextAnswers[q.id] != null)) {
      void submitAll(nextAnswers);
    }
  }

  if (!started) {
    return (
      <div>
        <p className={`${styles.kicker} mono`}>TRUST MAP DIAGNOSTIC</p>
        <h1 className={styles.brandTitle}>Trust Map Diagnostic</h1>
        <p className={styles.lead}>
          Sixteen questions. One for each cell on the map. See where you build
          trust — and where you lose it.
        </p>
        <p className={`${styles.meta} mono`}>
          ~5 minutes · Likert 1–5 · Email to unlock results
        </p>
        <button
          type="button"
          className={styles.primaryCta}
          onClick={() => setStarted(true)}
        >
          Start the diagnostic
          <span aria-hidden="true">→</span>
        </button>
        <p className={styles.secondaryNote}>
          Your answers are scored against Honesty, Understanding, Clarity, and
          Judgment across Discovery, Demo, Docs, and Support.
        </p>
      </div>
    );
  }

  if (!current) {
    return <p className={styles.error}>No questions available.</p>;
  }

  return (
    <div>
      <div className={styles.progressWrap}>
        <div className={`${styles.progressMeta} mono`}>
          <span>
            Question {index + 1} of {questions.length}
          </span>
          <span>
            {answeredCount}/{questions.length} answered
          </span>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Diagnostic progress"
        >
          <div
            className={styles.progressFill}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>

      <p className={`${styles.cellTag} mono`}>
        {ROW_LABELS[current.framework_row]} ×{" "}
        {COLUMN_LABELS[current.framework_column]}
      </p>
      <h2 className={styles.prompt}>{current.prompt}</h2>

      <div className={styles.likert} role="group" aria-label="Agreement scale">
        {LIKERT_VALUES.map((value) => {
          const selected = answers[current.id] === value;
          return (
            <button
              key={value}
              type="button"
              className={`${styles.likertOption} ${
                selected ? styles.likertOptionSelected : ""
              }`}
              onClick={() => selectValue(value)}
              disabled={submitting}
              aria-pressed={selected}
            >
              <span className={`${styles.likertValue} mono`}>{value}</span>
              <span>{LIKERT_LABELS[value]}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.navRow}>
        <button
          type="button"
          className={styles.ghostButton}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0 || submitting}
        >
          Back
        </button>
        {index === questions.length - 1 && canSubmit ? (
          <button
            type="button"
            className={styles.primaryCta}
            onClick={() => void submitAll(answers)}
            disabled={submitting}
          >
            {submitting ? "Scoring…" : "See my results"}
          </button>
        ) : null}
      </div>

      {error ? <p className={styles.error}>{error}</p> : null}
    </div>
  );
}
