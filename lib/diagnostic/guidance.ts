import {
  type FrameworkColumn,
  type FrameworkRow,
  createCellKey,
} from "@/lib/diagnostic/types";
import {
  isExternalUrl,
  patternHref,
  patterns,
  type Pattern,
} from "@/lib/patterns";

export interface CellGuidance {
  row: FrameworkRow;
  column: FrameworkColumn;
  pattern: Pattern;
  /** Short coaching line keyed to the Practice move. */
  blurb: string;
  href: string;
  external: boolean;
}

/**
 * Coaching blurbs for weak cells. Pattern/Practice names always come from
 * patterns.ts — never invent parallel titles here.
 */
const BLURBS: Record<string, string> = {
  honesty_discovery:
    "You're agreeing before you've verified. The Qualified Yes buys you time to confirm the problem is real.",
  understanding_discovery:
    "You're hearing the script, not the workflow. Ask the follow-up their answer earned.",
  clarity_discovery:
    "You're explaining your world in your words. Echo theirs — use their language for their problem.",
  judgment_discovery:
    "You're pitching before the problem is confirmed. Hold the solution until you've earned it.",
  honesty_demo:
    "Gaps get covered with confidence. The Find-Out is stronger: admit what you don't know, then commit to learning.",
  understanding_demo:
    "You're showing everything. Demo the one thing they came for.",
  clarity_demo:
    "The whiteboard is winning. Reach for the napkin sketch — the simplest drawing that's still true.",
  judgment_demo:
    "You're going deep before they asked. Run the Depth Check first.",
  honesty_docs:
    "Docs sell the happy path. Document the sharp edges — failure modes and when not to use it.",
  understanding_docs:
    "Docs assume insider knowledge. Write for the reader's first day, not your thousandth.",
  clarity_docs:
    "Docs only work if they survive a skim. Cut until the Skim Test passes.",
  judgment_docs:
    "Everything is documented equally. Mark the recommended trail through the terrain.",
  honesty_support:
    "Reassurance is delaying the truth. Lead with the specific status — especially when it's bad.",
  understanding_support:
    "You're answering the ticket, not the problem. Find the question behind the question.",
  clarity_support:
    "Template replies erase context. Open with proof you read their situation.",
  judgment_support:
    "You're over-owning. Escalate with a warm handoff and full context.",
};

export function getPatternForCell(
  row: FrameworkRow,
  column: FrameworkColumn,
): Pattern | undefined {
  return patterns.find((p) => p.rowId === row && p.colId === column);
}

export function getCellGuidance(
  row: FrameworkRow,
  column: FrameworkColumn,
): CellGuidance | null {
  const pattern = getPatternForCell(row, column);
  if (!pattern) return null;

  const key = createCellKey(row, column);
  const href = pattern.readUrl ?? patternHref(pattern.id);
  const external = pattern.readUrl ? isExternalUrl(pattern.readUrl) : false;

  return {
    row,
    column,
    pattern,
    blurb: BLURBS[key] ?? pattern.practice.move,
    href,
    external,
  };
}
