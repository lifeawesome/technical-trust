import {
  type ColumnScores,
  type DiagnosticAnswer,
  type DiagnosticResult,
  type DiagnosticSubmission,
  type FrameworkCell,
  type FrameworkScores,
  type CellScore,
  type RowScores,
  FRAMEWORK_COLUMNS,
  FRAMEWORK_ROWS,
  createCellKey,
  parseCellKey,
  scoreToPercentile,
} from "@/lib/diagnostic/types";

export function calculateFrameworkScores(
  answers: DiagnosticAnswer[],
): FrameworkScores {
  const cellAnswers = {} as Record<FrameworkCell, number[]>;

  FRAMEWORK_ROWS.forEach((row) => {
    FRAMEWORK_COLUMNS.forEach((column) => {
      cellAnswers[createCellKey(row, column)] = [];
    });
  });

  answers.forEach((answer) => {
    const key = createCellKey(answer.framework_row, answer.framework_column);
    cellAnswers[key].push(answer.value);
  });

  const scores = {} as FrameworkScores;

  (Object.entries(cellAnswers) as [FrameworkCell, number[]][]).forEach(
    ([cellKey, values]) => {
      if (values.length > 0) {
        const sum = values.reduce((acc, val) => acc + val, 0);
        scores[cellKey] = sum / values.length;
      } else {
        scores[cellKey] = 3;
      }
    },
  );

  return scores;
}

export function calculateRowAverages(cellScores: FrameworkScores): RowScores {
  const rowAverages = {} as RowScores;

  FRAMEWORK_ROWS.forEach((row) => {
    const scores = FRAMEWORK_COLUMNS.map(
      (column) => cellScores[createCellKey(row, column)],
    );
    rowAverages[row] = scores.reduce((a, b) => a + b, 0) / scores.length;
  });

  return rowAverages;
}

export function calculateColumnAverages(
  cellScores: FrameworkScores,
): ColumnScores {
  const columnAverages = {} as ColumnScores;

  FRAMEWORK_COLUMNS.forEach((column) => {
    const scores = FRAMEWORK_ROWS.map(
      (row) => cellScores[createCellKey(row, column)],
    );
    columnAverages[column] = scores.reduce((a, b) => a + b, 0) / scores.length;
  });

  return columnAverages;
}

export function getAllCellsSorted(cellScores: FrameworkScores): CellScore[] {
  const cells: CellScore[] = Object.entries(cellScores).map(
    ([cellKey, score]) => {
      const { row, column } = parseCellKey(cellKey as FrameworkCell);
      return {
        row,
        column,
        score,
        percentile: scoreToPercentile(score),
      };
    },
  );

  cells.sort((a, b) => b.score - a.score);
  cells.forEach((cell, index) => {
    cell.rank = index + 1;
  });

  return cells;
}

export function getWeakestCells(
  cellScores: FrameworkScores,
  count = 3,
): CellScore[] {
  return getAllCellsSorted(cellScores).reverse().slice(0, count);
}

export function getStrongestCells(
  cellScores: FrameworkScores,
  count = 3,
): CellScore[] {
  return getAllCellsSorted(cellScores).slice(0, count);
}

export function buildHeatmapData(cellScores: FrameworkScores) {
  const matrix = FRAMEWORK_ROWS.map((row) =>
    FRAMEWORK_COLUMNS.map(
      (column) => cellScores[createCellKey(row, column)],
    ),
  );

  return {
    rows: FRAMEWORK_ROWS,
    columns: FRAMEWORK_COLUMNS,
    matrix,
  };
}

export function calculateDiagnosticResult(
  submission: DiagnosticSubmission,
): DiagnosticResult {
  const allScores = calculateFrameworkScores(submission.answers);
  const rowAverages = calculateRowAverages(allScores);
  const columnAverages = calculateColumnAverages(allScores);
  const allCellsSorted = getAllCellsSorted(allScores);

  return {
    allScores,
    rowAverages,
    columnAverages,
    strongestCells: getStrongestCells(allScores, 3),
    weakestCells: getWeakestCells(allScores, 3),
    allCellsSorted,
    heatmapData: buildHeatmapData(allScores),
    completed_at: submission.completed_at,
    total_questions_answered: submission.answers.length,
  };
}

export function processDiagnosticQuiz(
  answers: DiagnosticAnswer[],
  completedAt: string = new Date().toISOString(),
): DiagnosticResult {
  return calculateDiagnosticResult({
    answers,
    completed_at: completedAt,
  });
}
