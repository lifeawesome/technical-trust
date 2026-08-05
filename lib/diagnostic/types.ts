// Trust Map Diagnostic — framework cell scoring types

export type FrameworkRow =
  | "honesty"
  | "understanding"
  | "clarity"
  | "judgment";

export type FrameworkColumn = "discovery" | "demo" | "docs" | "support";

export type FrameworkCell = `${FrameworkRow}_${FrameworkColumn}`;

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export const LIKERT_LABELS: Record<LikertValue, string> = {
  1: "Strongly Disagree",
  2: "Disagree",
  3: "Neutral",
  4: "Agree",
  5: "Strongly Agree",
};

export interface DiagnosticQuestion {
  id: string;
  prompt: string;
  framework_row: FrameworkRow;
  framework_column: FrameworkColumn;
}

export interface DiagnosticAnswer {
  question_id: string;
  value: LikertValue;
  framework_row: FrameworkRow;
  framework_column: FrameworkColumn;
}

export interface DiagnosticSubmission {
  answers: DiagnosticAnswer[];
  completed_at: string;
}

export type FrameworkScores = Record<FrameworkCell, number>;
export type RowScores = Record<FrameworkRow, number>;
export type ColumnScores = Record<FrameworkColumn, number>;

export interface CellScore {
  row: FrameworkRow;
  column: FrameworkColumn;
  score: number;
  percentile: number;
  rank?: number;
}

export interface DiagnosticResult {
  allScores: FrameworkScores;
  rowAverages: RowScores;
  columnAverages: ColumnScores;
  strongestCells: CellScore[];
  weakestCells: CellScore[];
  allCellsSorted: CellScore[];
  heatmapData: {
    rows: FrameworkRow[];
    columns: FrameworkColumn[];
    matrix: number[][];
  };
  completed_at: string;
  total_questions_answered: number;
}

export const FRAMEWORK_ROWS: FrameworkRow[] = [
  "honesty",
  "understanding",
  "clarity",
  "judgment",
];

export const FRAMEWORK_COLUMNS: FrameworkColumn[] = [
  "discovery",
  "demo",
  "docs",
  "support",
];

export const ROW_LABELS: Record<FrameworkRow, string> = {
  honesty: "Honesty",
  understanding: "Understanding",
  clarity: "Clarity",
  judgment: "Judgment",
};

export const COLUMN_LABELS: Record<FrameworkColumn, string> = {
  discovery: "Discovery",
  demo: "Demo",
  docs: "Docs",
  support: "Support",
};

export function createCellKey(
  row: FrameworkRow,
  column: FrameworkColumn,
): FrameworkCell {
  return `${row}_${column}`;
}

export function parseCellKey(key: FrameworkCell): {
  row: FrameworkRow;
  column: FrameworkColumn;
} {
  const [row, column] = key.split("_") as [FrameworkRow, FrameworkColumn];
  return { row, column };
}

export function scoreToPercentile(score: number): number {
  return ((score - 1) / 4) * 100;
}

export function getScoreInterpretation(score: number): string {
  const percentile = scoreToPercentile(score);
  if (percentile >= 75) return "Very Strong";
  if (percentile >= 60) return "Strong";
  if (percentile >= 40) return "Moderate";
  if (percentile >= 25) return "Developing";
  return "Focus Area";
}

export function isFrameworkRow(value: unknown): value is FrameworkRow {
  return typeof value === "string" && FRAMEWORK_ROWS.includes(value as FrameworkRow);
}

export function isFrameworkColumn(value: unknown): value is FrameworkColumn {
  return (
    typeof value === "string" &&
    FRAMEWORK_COLUMNS.includes(value as FrameworkColumn)
  );
}

export function isLikertValue(value: unknown): value is LikertValue {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}
