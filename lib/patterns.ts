export type PatternStatus = "published" | "announced" | "predicted";

export interface Practice {
  id: string;
  name: string;
  move: string;
  /** Optional override; falls back to the Pattern's readUrl. */
  readUrl?: string;
  /** Set when the Field Guide publishes — presence drives the amber Practice state. */
  fieldGuideUrl?: string;
}

export interface Pattern {
  id: string;
  name: string;
  status: PatternStatus;
  rowId: string;
  colId: string;
  practice: Practice;
  /** Required for published / announced; omitted on predicted. */
  definition?: string;
  editionNumber?: number;
  publishedDate?: string;
  readUrl?: string;
  teaser?: string;
}

export const patterns: Pattern[] = [
  {
    id: "the-confidence-bluff",
    name: "The Confidence Bluff",
    status: "published",
    rowId: "honesty",
    colId: "demo",
    definition: "Pretending to know instead of committing to find out.",
    editionNumber: 1,
    publishedDate: "2026-07-10",
    readUrl: "https://newsletter.technicaltrust.org/posts/the-confidence-bluff",
    practice: {
      id: "the-find-out",
      name: "The Find-Out",
      move: "I don't know, I'll find out, here's what we do know.",
    },
  },
  {
    id: "the-feature-dump",
    name: "The Feature Dump",
    status: "published",
    rowId: "understanding",
    colId: "demo",
    definition:
      "Showing everything the product does instead of the one thing they need.",
    editionNumber: 2,
    publishedDate: "2026-07-17",
    readUrl: "https://newsletter.technicaltrust.org/posts/the-feature-dump",
    practice: {
      id: "the-one-thing",
      name: "The One Thing",
      move: "Demo the one thing they came for.",
    },
  },
  // Announced (max 2–3 at any time — anticipation, not a syllabus):
  // {
  //   id: "REPLACE",
  //   name: "REPLACE",
  //   status: "announced",
  //   rowId: "REPLACE",
  //   colId: "REPLACE",
  //   definition: "",
  //   teaser: "REPLACE — one line, name the territory, don't give away the diagnosis.",
  //   practice: { id: "REPLACE", name: "REPLACE", move: "REPLACE" },
  // },

  // Predicted — map-only ghost tier; names subject to revision
  {
    id: "the-eager-yes",
    name: "The Eager Yes",
    status: "predicted",
    rowId: "honesty",
    colId: "discovery",
    practice: {
      id: "the-qualified-yes",
      name: "The Qualified Yes",
      move: "Probably — let me verify before I commit.",
    },
  },
  {
    id: "the-happy-path",
    name: "The Happy Path",
    status: "predicted",
    rowId: "honesty",
    colId: "docs",
    practice: {
      id: "the-sharp-edges",
      name: "The Sharp Edges",
      move: "Document the failure modes honestly.",
    },
  },
  {
    id: "the-reassurance-loop",
    name: "The Reassurance Loop",
    status: "predicted",
    rowId: "honesty",
    colId: "support",
    practice: {
      id: "the-bad-news-first",
      name: "The Bad News First",
      move: "Lead with the specific status, especially when it's bad.",
    },
  },
  {
    id: "the-script-read",
    name: "The Script Read",
    status: "predicted",
    rowId: "understanding",
    colId: "discovery",
    practice: {
      id: "the-second-question",
      name: "The Second Question",
      move: "Ask the follow-up their answer earned.",
    },
  },
  {
    id: "the-insider-manual",
    name: "The Insider Manual",
    status: "predicted",
    rowId: "understanding",
    colId: "docs",
    practice: {
      id: "the-first-day-test",
      name: "The First-Day Test",
      move: "Write for the reader's first day, not your thousandth.",
    },
  },
  {
    id: "the-literal-answer",
    name: "The Literal Answer",
    status: "predicted",
    rowId: "understanding",
    colId: "support",
    practice: {
      id: "the-question-behind-the-question",
      name: "The Question Behind the Question",
      move: "Answer the problem, not just the ticket.",
    },
  },
  {
    id: "the-vocabulary-test",
    name: "The Vocabulary Test",
    status: "predicted",
    rowId: "clarity",
    colId: "discovery",
    practice: {
      id: "the-echo",
      name: "The Echo",
      move: "Use their words for their problem.",
    },
  },
  {
    id: "the-wall-of-text",
    name: "The Wall of Text",
    status: "predicted",
    rowId: "clarity",
    colId: "docs",
    practice: {
      id: "the-skim-test",
      name: "The Skim Test",
      move: "Docs that survive being skimmed.",
    },
  },
  {
    id: "the-template-reply",
    name: "The Template Reply",
    status: "predicted",
    rowId: "clarity",
    colId: "support",
    practice: {
      id: "the-first-line",
      name: "The First Line",
      move: "Open with proof you read their situation.",
    },
  },
  {
    id: "the-whiteboard-flood",
    name: "The Whiteboard Flood",
    status: "predicted",
    rowId: "clarity",
    colId: "demo",
    practice: {
      id: "the-napkin-sketch",
      name: "The Napkin Sketch",
      move: "The simplest drawing that's still true.",
    },
  },
  {
    id: "the-premature-pitch",
    name: "The Premature Pitch",
    status: "predicted",
    rowId: "judgment",
    colId: "discovery",
    practice: {
      id: "the-earned-pitch",
      name: "The Earned Pitch",
      move: "Hold the solution until the problem is confirmed.",
    },
  },
  {
    id: "the-flat-map",
    name: "The Flat Map",
    status: "predicted",
    rowId: "judgment",
    colId: "docs",
    practice: {
      id: "the-marked-trail",
      name: "The Marked Trail",
      move: "Show the recommended path through the terrain.",
    },
  },
  {
    id: "the-hero-complex",
    name: "The Hero Complex",
    status: "predicted",
    rowId: "judgment",
    colId: "support",
    practice: {
      id: "the-warm-handoff",
      name: "The Warm Handoff",
      move: "Escalate with context instead of over-owning.",
    },
  },
  {
    id: "the-engineers-detour",
    name: "The Engineer's Detour",
    status: "predicted",
    rowId: "judgment",
    colId: "demo",
    practice: {
      id: "the-depth-check",
      name: "The Depth Check",
      move: 'Ask "want me to go deeper?" before diving.',
    },
  },
];

export const patternsIntro = [
  "Every trust failure has a shape.",
  "When a shape repeats often enough, it earns a name.",
  "These are the named failures of technical trust —",
  "how they happen, why they feel safe, and what to do instead.",
  "New Patterns are named in Technical Trust Weekly, every Friday.",
] as const;

export function getPublishedPatterns(): Pattern[] {
  return patterns
    .filter((p) => p.status === "published")
    .sort((a, b) => (b.editionNumber ?? 0) - (a.editionNumber ?? 0));
}

export function getAnnouncedPatterns(): Pattern[] {
  return patterns.filter((p) => p.status === "announced");
}

export function formatEditionNumber(n: number): string {
  return String(n).padStart(3, "0");
}

export function patternHref(id: string): string {
  return `/patterns#${id}`;
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export function practiceReadUrl(pattern: Pattern): string | undefined {
  return pattern.practice.readUrl ?? pattern.readUrl;
}
