/**
 * Kit → Pattern publish hydration.
 *
 * Canon names, cells, and Practices stay in patterns.ts.
 * When a public Kit edition title matches a Pattern name, this layer
 * promotes predicted/announced → published and fills readUrl / dates.
 * It never invents a Pattern that isn't already in the canon data.
 */

import {
  getNewsletterIssues,
  type NewsletterIssue,
} from "@/lib/kit-broadcasts";
import { patterns, type Pattern } from "@/lib/patterns";

/** Normalize for title matching: "The Feature Dump" ↔ "THE FEATURE DUMP". */
export function normalizePatternName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/:$/, "")
    .replace(/^the\s+/, "")
    .replace(/['’]/g, "'")
    .replace(/\s+/g, " ");
}

function toDateOnly(iso: string): string {
  const match = iso.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : iso.slice(0, 10);
}

export function findPatternForEdition(
  title: string,
  list: readonly Pattern[],
): Pattern | undefined {
  const key = normalizePatternName(title);
  return list.find((pattern) => normalizePatternName(pattern.name) === key);
}

function assignEditionNumbers(list: Pattern[]): Pattern[] {
  const published = list
    .filter((p) => p.status === "published" && p.publishedDate)
    .sort((a, b) => {
      const byDate =
        new Date(a.publishedDate!).getTime() -
        new Date(b.publishedDate!).getTime();
      if (byDate !== 0) return byDate;
      return a.name.localeCompare(b.name);
    });

  const numbers = new Map(
    published.map((pattern, index) => [pattern.id, index + 1]),
  );

  return list.map((pattern) => {
    const editionNumber = numbers.get(pattern.id);
    if (editionNumber == null) return pattern;
    if (pattern.editionNumber === editionNumber) return pattern;
    return { ...pattern, editionNumber };
  });
}

/**
 * Pure merge: overlay matching Kit editions onto the canon Pattern list.
 */
export function hydratePatternsFromEditions(
  base: readonly Pattern[],
  issues: readonly NewsletterIssue[],
): Pattern[] {
  const byId = new Map(base.map((pattern) => [pattern.id, { ...pattern }]));

  const matchedIssues = issues
    .filter((issue) => issue.publicUrl)
    .map((issue) => {
      const pattern = findPatternForEdition(issue.title, base);
      return pattern ? { issue, pattern } : null;
    })
    .filter((row): row is { issue: NewsletterIssue; pattern: Pattern } =>
      Boolean(row),
    )
    // Oldest first so edition numbering stays stable if we ever rely on insert order
    .sort(
      (a, b) =>
        new Date(a.issue.publishedAt).getTime() -
        new Date(b.issue.publishedAt).getTime(),
    );

  for (const { issue, pattern } of matchedIssues) {
    const current = byId.get(pattern.id);
    if (!current) continue;

    const publishedDate = toDateOnly(issue.publishedAt);
    const next: Pattern = {
      ...current,
      status: "published",
      readUrl: issue.publicUrl ?? current.readUrl,
      publishedDate: publishedDate || current.publishedDate,
      definition: current.definition ?? issue.description,
    };

    byId.set(pattern.id, next);
  }

  // Preserve canon list order
  const merged = base.map((pattern) => byId.get(pattern.id) ?? pattern);
  return assignEditionNumbers(merged);
}

/** Canon Patterns with publish fields hydrated from Kit (cached via fetch revalidate). */
export async function getHydratedPatterns(): Promise<Pattern[]> {
  const issues = await getNewsletterIssues();
  return hydratePatternsFromEditions(patterns, issues);
}
