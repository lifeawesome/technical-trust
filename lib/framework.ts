import {
  patternHref,
  patterns,
  practiceReadUrl,
  type Pattern,
} from "@/lib/patterns";

export type FrameworkView = "patterns" | "practices";

export type CellStatus =
  | "pattern"
  | "field-guide"
  | "chapter"
  | "planned"
  | "predicted"
  | "open";

export interface FrameworkRow {
  id: string;
  label: string;
  line: string;
}

export interface FrameworkColumn {
  id: string;
  label: string;
}

export interface FrameworkCell {
  rowId: string;
  colId: string;
  status: CellStatus;
  title?: string;
  slug?: string;
  /** Secondary line — Practice move, or planned note. */
  note?: string;
  /** Override for the mono status tag. */
  tag?: string;
  /** Pattern name — used in Practice accessible names. */
  patternName?: string;
}

export interface ChangelogEntry {
  date: string;
  entry: string;
}

export const frameworkVersion = "v0.4";

export const rows: FrameworkRow[] = [
  {
    id: "honesty",
    label: "Honesty",
    line: "Credibility begins where pretending ends.",
  },
  {
    id: "understanding",
    label: "Understanding",
    line: "Their problem before your product.",
  },
  {
    id: "clarity",
    label: "Clarity",
    line: "Complexity translated, not performed.",
  },
  {
    id: "judgment",
    label: "Judgment",
    line: "Knowing when to simplify and when to go deep.",
  },
];

export const columns: FrameworkColumn[] = [
  { id: "discovery", label: "Discovery" },
  { id: "demo", label: "Demo" },
  { id: "docs", label: "Docs" },
  { id: "support", label: "Support" },
];

/**
 * Non-Pattern cells only (field guides, chapters, planned non-pattern work).
 * Pattern cells are derived from patterns.ts — never duplicated here.
 */
export const cells: FrameworkCell[] = [];

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-07-16",
    entry: "Framework map published with two Patterns.",
  },
  {
    date: "2026-07-16",
    entry: "Predicted the remaining Patterns. Names subject to revision.",
  },
  {
    date: "2026-07-16",
    entry: "The map gained a second face: the Practices.",
  },
];

export const frameworkIntro = [
  "Technical trust is not one skill.",
  "It is a small set of components, tested in a small set of moments.",
  "A demo tests your honesty. A support ticket tests your clarity.",
  "This map crosses one against the other.",
  "Every cell is a place where trust is built — or lost.",
  "Most of this map is still unwritten.",
  "But the shapes are already visible.",
  "It is being drawn one failure at a time.",
  "Every failure on this map has an equal and opposite move.",
] as const;

export const STATUS_LABEL: Record<Exclude<CellStatus, "open">, string> = {
  pattern: "Pattern",
  "field-guide": "Field Guide",
  chapter: "Chapter",
  planned: "Planned",
  predicted: "Unwritten",
};

export function parseFrameworkView(
  value: string | string[] | undefined | null,
): FrameworkView {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "practices" ? "practices" : "patterns";
}

export function frameworkViewHref(view: FrameworkView): string {
  return view === "practices" ? "/framework?view=practices" : "/framework";
}

function findPattern(rowId: string, colId: string): Pattern | undefined {
  return patterns.find((p) => p.rowId === rowId && p.colId === colId);
}

function patternFaceCell(pattern: Pattern): FrameworkCell {
  if (pattern.status === "published") {
    return {
      rowId: pattern.rowId,
      colId: pattern.colId,
      status: "pattern",
      title: pattern.name,
      slug: patternHref(pattern.id),
      patternName: pattern.name,
    };
  }
  if (pattern.status === "announced") {
    return {
      rowId: pattern.rowId,
      colId: pattern.colId,
      status: "planned",
      title: pattern.name,
      slug: patternHref(pattern.id),
      patternName: pattern.name,
    };
  }
  return {
    rowId: pattern.rowId,
    colId: pattern.colId,
    status: "predicted",
    title: pattern.name,
    patternName: pattern.name,
  };
}

function practiceFaceCell(pattern: Pattern): FrameworkCell {
  const { practice } = pattern;
  const base = {
    rowId: pattern.rowId,
    colId: pattern.colId,
    title: practice.name,
    patternName: pattern.name,
  };

  if (pattern.status === "published" && practice.fieldGuideUrl) {
    return {
      ...base,
      // Full amber cell (same treatment as published Patterns)
      status: "pattern",
      tag: "Field Guide",
      note: practice.move,
      slug: practice.fieldGuideUrl,
    };
  }

  if (pattern.status === "published") {
    return {
      ...base,
      status: "planned",
      tag: "Practice",
      note: practice.move,
      slug: practiceReadUrl(pattern),
    };
  }

  // announced + predicted → ghost
  return {
    ...base,
    status: "predicted",
    tag: "Practice",
  };
}

export function getRow(id: string): FrameworkRow | undefined {
  return rows.find((row) => row.id === id);
}

export function getColumn(id: string): FrameworkColumn | undefined {
  return columns.find((col) => col.id === id);
}

export function coordinateLabel(rowId: string, colId: string): string {
  const row = getRow(rowId);
  const col = getColumn(colId);
  if (!row || !col) return `${rowId} × ${colId}`;
  return `${row.label.toUpperCase()} × ${col.label.toUpperCase()}`;
}

export function getCell(
  rowId: string,
  colId: string,
  view: FrameworkView = "patterns",
): FrameworkCell {
  const pattern = findPattern(rowId, colId);
  if (pattern) {
    return view === "practices"
      ? practiceFaceCell(pattern)
      : patternFaceCell(pattern);
  }

  if (view === "patterns") {
    const fromCells = cells.find(
      (cell) => cell.rowId === rowId && cell.colId === colId,
    );
    if (fromCells) return fromCells;
  }

  return { rowId, colId, status: "open" };
}

export function cellAccessibleName(
  cell: FrameworkCell,
  row: FrameworkRow,
  col: FrameworkColumn,
  view: FrameworkView = "patterns",
): string {
  if (view === "practices" && cell.title && cell.patternName) {
    return `${cell.title} — the Practice for ${cell.patternName}, ${row.label} in the ${col.label}.`;
  }
  if (cell.status === "predicted") {
    const title = cell.title ?? "Untitled";
    return `Predicted pattern: ${title} — ${row.label} in ${col.label}, not yet written`;
  }
  if (cell.status === "open") {
    return `Coming soon — ${row.label} in the ${col.label}`;
  }
  const title = cell.title ?? "Untitled";
  return `${title} — ${row.label} in the ${col.label}`;
}

export function cellTagLabel(cell: FrameworkCell): string | null {
  if (cell.status === "open") return null;
  if (cell.tag) return cell.tag;
  return STATUS_LABEL[cell.status];
}

export function isPublished(
  status: CellStatus,
): status is "pattern" | "field-guide" | "chapter" {
  return (
    status === "pattern" ||
    status === "field-guide" ||
    status === "chapter"
  );
}

/** Reading-order index for flip stagger (row-major across the grid). */
export function cellReadingIndex(rowId: string, colId: string): number {
  const rowIndex = rows.findIndex((r) => r.id === rowId);
  const colIndex = columns.findIndex((c) => c.id === colId);
  if (rowIndex < 0 || colIndex < 0) return 0;
  return rowIndex * columns.length + colIndex;
}
