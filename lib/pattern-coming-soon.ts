import { coordinateLabel } from "@/lib/framework";
import {
  patternWaitlistTagName,
  patternWeakInterestTagName,
} from "@/lib/kit-naming";
import {
  type Pattern,
  patterns,
  patternHref,
  isExternalUrl,
} from "@/lib/patterns";

export { patternWaitlistTagName, patternWeakInterestTagName };

/**
 * Waitlist / coming-soon helpers.
 * Pattern names and publish status always come from patterns.ts.
 * Kit tag/broadcast naming: see lib/kit-naming.ts.
 */

export function getPatternBySlug(slug: string): Pattern | undefined {
  return patterns.find((p) => p.id === slug);
}

export function isPatternPublished(pattern: Pattern): boolean {
  return pattern.status === "published" && Boolean(pattern.readUrl);
}

export function isPatternComingSoon(pattern: Pattern): boolean {
  return pattern.status === "predicted" || pattern.status === "announced";
}

export function comingSoonHref(slug: string): string {
  return `/patterns/${slug}/coming-soon`;
}

export function publishedPatternHref(pattern: Pattern): {
  href: string;
  external: boolean;
} {
  if (pattern.readUrl && isExternalUrl(pattern.readUrl)) {
    return { href: pattern.readUrl, external: true };
  }
  return { href: patternHref(pattern.id), external: false };
}

/** Preview line for coming-soon pages — definition, teaser, or Practice move. */
export function patternPreviewText(pattern: Pattern): string {
  return (
    pattern.definition ??
    pattern.teaser ??
    pattern.practice.move
  );
}

/** What this Pattern covers — grounded in the Practice, not invented syllabus copy. */
export function patternWhatItCovers(pattern: Pattern): string {
  const coords = coordinateLabel(pattern.rowId, pattern.colId);
  return [
    `The named failure at ${coords}.`,
    `The counter-move: ${pattern.practice.name} — ${pattern.practice.move}`,
    "Named and diagnosed in Technical Trust Weekly when this cell publishes.",
  ].join(" ");
}

export function patternsInSameRow(pattern: Pattern): Pattern[] {
  return patterns.filter(
    (p) => p.rowId === pattern.rowId && p.id !== pattern.id,
  );
}

export function getPatternLinkForDiagnostic(pattern: Pattern): {
  href: string;
  external: boolean;
  label: string;
  comingSoon: boolean;
} {
  if (isPatternPublished(pattern)) {
    const { href, external } = publishedPatternHref(pattern);
    return {
      href,
      external,
      label: "Read the edition →",
      comingSoon: false,
    };
  }

  return {
    href: comingSoonHref(pattern.id),
    external: false,
    label: "Get notified when it publishes →",
    comingSoon: true,
  };
}
