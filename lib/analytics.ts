"use client";

import { sendGTMEvent } from "@next/third-parties/google";

/** Primary CTA click — use for buttons/links that drive a conversion path. */
export function trackCtaClick({
  ctaId,
  ctaText,
  location,
  destination,
}: {
  ctaId: string;
  ctaText: string;
  location: string;
  destination?: string;
}) {
  sendGTMEvent({
    event: "cta_click",
    cta_id: ctaId,
    cta_text: ctaText,
    cta_location: location,
    link_url: destination,
  });
}

/** Successful newsletter signup (GA4 recommended event). */
export function trackSubscribeSuccess(location = "homepage_subscribe") {
  sendGTMEvent({
    event: "generate_lead",
    method: "email",
    lead_source: location,
  });
}

export function trackDiagnosticStarted() {
  sendGTMEvent({
    event: "diagnostic_started",
  });
}

export function trackDiagnosticCompleted(weakestCell?: string) {
  sendGTMEvent({
    event: "diagnostic_completed",
    weakest_cell: weakestCell,
  });
}

export function trackDiagnosticUnlocked(weakestCell?: string) {
  sendGTMEvent({
    event: "diagnostic_unlocked",
    weakest_cell: weakestCell,
  });
  trackSubscribeSuccess("trust_map_diagnostic");
}

export function trackPatternWaitlistSignup({
  patternSlug,
  source,
  weakCellScore,
}: {
  patternSlug: string;
  source: string;
  weakCellScore?: number;
}) {
  sendGTMEvent({
    event: "pattern_waitlist_signup",
    pattern_slug: patternSlug,
    lead_source: source,
    weak_cell_score: weakCellScore,
  });
  trackSubscribeSuccess(`pattern_waitlist_${patternSlug}`);
}
