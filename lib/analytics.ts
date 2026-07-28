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
