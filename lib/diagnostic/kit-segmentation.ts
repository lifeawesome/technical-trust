import { getPatternForCell } from "@/lib/diagnostic/guidance";
import type { CellScore } from "@/lib/diagnostic/types";
import { tagKitSubscriberByName } from "@/lib/kit";
import {
  isPatternComingSoon,
  patternWaitlistTagName,
  patternWeakInterestTagName,
} from "@/lib/pattern-coming-soon";
import { upsertPatternNotification } from "@/lib/pattern-notifications";

/**
 * After diagnostic unlock: tag Kit by weak cells and waitlist unpublished Patterns.
 * Failures are logged and non-blocking.
 */
export async function segmentDiagnosticWeakCells(
  apiKey: string,
  email: string,
  weakestCells: CellScore[],
) {
  for (const cell of weakestCells) {
    const pattern = getPatternForCell(cell.row, cell.column);
    if (!pattern) continue;

    try {
      await tagKitSubscriberByName(
        apiKey,
        patternWeakInterestTagName(pattern.id),
        email,
      );
    } catch (error) {
      console.warn(`Kit weak tag failed for ${pattern.id}:`, error);
    }

    if (!isPatternComingSoon(pattern)) continue;

    try {
      await tagKitSubscriberByName(
        apiKey,
        patternWaitlistTagName(pattern.id),
        email,
      );
    } catch (error) {
      console.warn(`Kit waitlist tag failed for ${pattern.id}:`, error);
    }

    try {
      await upsertPatternNotification({
        email,
        patternSlug: pattern.id,
        source: "diagnostic",
        weakCellScore: cell.score,
      });
    } catch (error) {
      console.warn(`pattern_notifications upsert failed for ${pattern.id}:`, error);
    }
  }
}
