import CellGuidanceCard from "@/components/diagnostic/CellGuidanceCard";
import FrameworkHeatmap from "@/components/diagnostic/FrameworkHeatmap";
import type { StoredDiagnosticResult } from "@/lib/diagnostic/data";
import {
  COLUMN_LABELS,
  FRAMEWORK_COLUMNS,
  FRAMEWORK_ROWS,
  ROW_LABELS,
  createCellKey,
} from "@/lib/diagnostic/types";
import styles from "@/app/diagnostic/Diagnostic.module.css";

type DiagnosticResultsProps = {
  result: StoredDiagnosticResult;
};

export default function DiagnosticResults({ result }: DiagnosticResultsProps) {
  const matrix = FRAMEWORK_ROWS.map((row) =>
    FRAMEWORK_COLUMNS.map(
      (column) => result.framework_scores[createCellKey(row, column)] ?? 3,
    ),
  );

  return (
    <div>
      <p className={`${styles.kicker} mono`}>YOUR RESULTS</p>
      <h1 className={styles.brandTitle}>Your Trust Map</h1>
      <p className={styles.lead}>
        Scores are self-reported across the sixteen cells. Focus on the weak
        cells — that&apos;s where trust is leaking.
      </p>

      <section className={styles.section} aria-labelledby="heatmap-heading">
        <h2 id="heatmap-heading" className={styles.sectionHeading}>
          The heatmap
        </h2>
        <p className={styles.sectionIntro}>
          Stronger cells run warmer. Weaker cells stay cooler. Match the low
          scores to the Patterns below.
        </p>
        <FrameworkHeatmap
          rows={FRAMEWORK_ROWS}
          columns={FRAMEWORK_COLUMNS}
          matrix={matrix}
        />
      </section>

      <section className={styles.section} aria-labelledby="focus-heading">
        <h2 id="focus-heading" className={styles.sectionHeading}>
          Where to focus
        </h2>
        <p className={styles.sectionIntro}>
          Your three weakest cells — and the Pattern/Practice pair that lives
          there.
        </p>
        <div className={styles.cardList}>
          {result.weakest_cells.map((cell, index) => (
            <CellGuidanceCard
              key={`${cell.row}_${cell.column}`}
              cell={cell}
              rankLabel={`#${index + 1} weakest`}
              mode="weak"
            />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="strength-heading">
        <h2 id="strength-heading" className={styles.sectionHeading}>
          What&apos;s working
        </h2>
        <p className={styles.sectionIntro}>
          Build on these. Don&apos;t abandon the moves that already earn trust.
        </p>
        <div className={styles.cardList}>
          {result.strongest_cells.map((cell, index) => (
            <CellGuidanceCard
              key={`${cell.row}_${cell.column}`}
              cell={cell}
              rankLabel={`#${index + 1} strongest`}
              mode="strong"
            />
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="averages-heading">
        <h2 id="averages-heading" className={styles.sectionHeading}>
          Row &amp; column averages
        </h2>
        <div className={styles.averages}>
          {FRAMEWORK_ROWS.map((row) => (
            <div key={row} className={styles.averageItem}>
              <span className={`${styles.averageLabel} mono`}>
                {ROW_LABELS[row]}
              </span>
              <span className={styles.averageValue}>
                {(result.row_averages[row] ?? 0).toFixed(1)}
              </span>
            </div>
          ))}
          {FRAMEWORK_COLUMNS.map((column) => (
            <div key={column} className={styles.averageItem}>
              <span className={`${styles.averageLabel} mono`}>
                {COLUMN_LABELS[column]}
              </span>
              <span className={styles.averageValue}>
                {(result.column_averages[column] ?? 0).toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
