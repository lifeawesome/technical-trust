import Link from "next/link";
import { getCellGuidance } from "@/lib/diagnostic/guidance";
import {
  type CellScore,
  COLUMN_LABELS,
  ROW_LABELS,
} from "@/lib/diagnostic/types";
import styles from "@/app/diagnostic/Diagnostic.module.css";

type CellGuidanceCardProps = {
  cell: CellScore;
  rankLabel: string;
  mode: "weak" | "strong";
};

export default function CellGuidanceCard({
  cell,
  rankLabel,
  mode,
}: CellGuidanceCardProps) {
  const guidance = getCellGuidance(cell.row, cell.column);
  const coords = `${ROW_LABELS[cell.row]} × ${COLUMN_LABELS[cell.column]}`;

  return (
    <article className={styles.card}>
      <p className={`${styles.cardMeta} mono`}>
        <span>{rankLabel}</span>
        <span>{coords}</span>
        <span>{cell.score.toFixed(1)} / 5.0</span>
      </p>
      {guidance ? (
        <>
          <h3 className={styles.cardTitle}>{guidance.pattern.name}</h3>
          {mode === "weak" ? (
            <p className={styles.cardBlurb}>{guidance.blurb}</p>
          ) : (
            <p className={styles.cardBlurb}>
              You&apos;re already practicing the counter-move here. Keep it.
            </p>
          )}
          <p className={styles.practiceMove}>
            <strong>{guidance.pattern.practice.name}:</strong>{" "}
            {guidance.pattern.practice.move}
          </p>
          {guidance.external ? (
            <a
              href={guidance.href}
              className={styles.cardLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the edition →
            </a>
          ) : (
            <Link href={guidance.href} className={styles.cardLink}>
              See this Pattern →
            </Link>
          )}
        </>
      ) : (
        <>
          <h3 className={styles.cardTitle}>{coords}</h3>
          <p className={styles.cardBlurb}>
            Focus on this cell on the Trust Map.
          </p>
        </>
      )}
    </article>
  );
}
