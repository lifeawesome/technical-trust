import { coordinateLabel } from "@/lib/framework";
import type { Pattern } from "@/lib/patterns";

/**
 * Canonical Kit naming for Trust Map Diagnostic + Pattern waitlist assets.
 * Use these helpers whenever creating tags, broadcasts, sequences, or snippets.
 */

export const KIT_DIAGNOSTIC_TAG = "trust-map-diagnostic";
export const KIT_PATTERN_PUBLISHED_TAG = "pattern-published";

export const KIT_BROADCAST_PREVIEW =
  "You asked to know when this Pattern published.";

export const KIT_SEQUENCE_WAITLIST_NAME =
  "TT · Pattern Waitlist · Publish Notify";

export const KIT_SNIPPET_LIVE_BODY_NAME = "TT · Pattern Live · Body";
/** Kit auto-key from first create; rename does not change this. */
export const KIT_SNIPPET_LIVE_BODY_KEY = "pattern-live-notify-body";

/** Waitlist tag — notify when Pattern publishes. */
export function patternWaitlistTagName(slug: string): string {
  return `pattern-${slug}-waitlist`;
}

/** Weak-cell interest tag from diagnostic unlock. */
export function patternWeakInterestTagName(slug: string): string {
  return `pattern-${slug}-weak`;
}

export function editionUrl(slug: string): string {
  return `https://newsletter.technicaltrust.org/posts/${slug}`;
}

export function broadcastSubject(pattern: Pattern): string {
  return `${pattern.name} is live`;
}

/** Machine-parseable internal description for Kit broadcast drafts. */
export function broadcastDescription(slug: string): string {
  return `TT · pattern-live · ${slug}`;
}

export function broadcastHtml(pattern: Pattern): string {
  const coords = coordinateLabel(pattern.rowId, pattern.colId);
  const url = editionUrl(pattern.id);

  return [
    `<p>Hi {{ subscriber.first_name | default: "there" }},</p>`,
    ``,
    `<p>You asked to know when <strong>${escapeHtml(pattern.name)}</strong> published — and it’s live.</p>`,
    ``,
    `<p><a href="${url}">Read ${escapeHtml(pattern.name)} →</a></p>`,
    ``,
    `<p>If you took the Trust Map Diagnostic, this is ${escapeHtml(coords)}: ${escapeHtml(pattern.practice.move)} The counter-move is ${escapeHtml(pattern.practice.name)}.</p>`,
    ``,
    `<p>New Patterns land every Friday in Technical Trust Weekly.</p>`,
    ``,
    `<p>— Dan<br>Technical Trust</p>`,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
