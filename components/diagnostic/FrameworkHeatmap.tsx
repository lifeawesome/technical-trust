import {
  type FrameworkColumn,
  type FrameworkRow,
  COLUMN_LABELS,
  ROW_LABELS,
  getScoreInterpretation,
  scoreToPercentile,
} from "@/lib/diagnostic/types";
import styles from "@/app/diagnostic/Diagnostic.module.css";

type FrameworkHeatmapProps = {
  rows: FrameworkRow[];
  columns: FrameworkColumn[];
  matrix: number[][];
};

function bandClass(score: number): string {
  const percentile = scoreToPercentile(score);
  if (percentile >= 66) return styles.scoreStrong;
  if (percentile >= 33) return styles.scoreModerate;
  return styles.scoreWeak;
}

export default function FrameworkHeatmap({
  rows,
  columns,
  matrix,
}: FrameworkHeatmapProps) {
  return (
    <div className={styles.heatmapWrap}>
      <div
        className={styles.heatmap}
        role="table"
        aria-label="Trust Map Diagnostic heatmap"
      >
        <div className={`${styles.heatmapCorner} mono`} role="columnheader" />
        {columns.map((column) => (
          <div
            key={column}
            className={`${styles.heatmapColHead} mono`}
            role="columnheader"
          >
            {COLUMN_LABELS[column]}
          </div>
        ))}

        {rows.map((row, rowIndex) => (
          <div key={row} style={{ display: "contents" }}>
            <div className={`${styles.heatmapRowHead} mono`} role="rowheader">
              {ROW_LABELS[row]}
            </div>
            {matrix[rowIndex]?.map((score, colIndex) => {
              const column = columns[colIndex];
              const label = `${ROW_LABELS[row]} / ${COLUMN_LABELS[column]}: ${score.toFixed(1)}, ${getScoreInterpretation(score)}`;
              return (
                <div
                  key={`${row}_${column}`}
                  className={`${styles.heatmapCell} ${bandClass(score)}`}
                  role="cell"
                  title={label}
                  aria-label={label}
                >
                  <span className={styles.heatmapScore}>{score.toFixed(1)}</span>
                  <span className={`${styles.heatmapBand} mono`}>
                    {getScoreInterpretation(score)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
