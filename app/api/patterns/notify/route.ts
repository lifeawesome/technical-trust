import { NextResponse } from "next/server";
import { buildKitReferrer } from "@/lib/attribution";
import { SITE_URL } from "@/lib/content";
import {
  subscribeEmailToKit,
  tagKitSubscriberByName,
} from "@/lib/kit";
import {
  getPatternBySlug,
  isPatternComingSoon,
  patternWaitlistTagName,
} from "@/lib/pattern-coming-soon";
import { upsertPatternNotification } from "@/lib/pattern-notifications";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Notifications storage is not configured" },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      email?: string;
      pattern_slug?: string;
      source?: string;
      weak_cell_score?: number;
      pageUrl?: string;
      documentReferrer?: string;
    };

    const email = body.email?.trim().toLowerCase();
    const patternSlug = body.pattern_slug?.trim();

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!patternSlug) {
      return NextResponse.json(
        { error: "pattern_slug required" },
        { status: 400 },
      );
    }

    const pattern = getPatternBySlug(patternSlug);
    if (!pattern) {
      return NextResponse.json({ error: "Pattern not found" }, { status: 404 });
    }

    if (!isPatternComingSoon(pattern)) {
      return NextResponse.json(
        { error: "Pattern is already published" },
        { status: 400 },
      );
    }

    const source =
      body.source === "diagnostic" ||
      body.source === "newsletter" ||
      body.source === "other"
        ? body.source
        : "website";

    const { created } = await upsertPatternNotification({
      email,
      patternSlug,
      source,
      weakCellScore:
        typeof body.weak_cell_score === "number" ? body.weak_cell_score : null,
    });

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;
    const defaultTagId = process.env.KIT_TAG_ID;

    if (apiKey && formId) {
      const referrer = buildKitReferrer(
        body.pageUrl ?? `${SITE_URL}/patterns/${patternSlug}/coming-soon`,
        body.documentReferrer,
        SITE_URL,
      );

      await subscribeEmailToKit(apiKey, formId, email, referrer, defaultTagId);

      try {
        await tagKitSubscriberByName(
          apiKey,
          patternWaitlistTagName(patternSlug),
          email,
        );
      } catch (tagError) {
        console.warn("Pattern waitlist Kit tag failed (non-blocking):", tagError);
      }
    }

    return NextResponse.json({
      ok: true,
      created,
      alreadySubscribed: !created,
    });
  } catch (error) {
    console.error("Pattern notify failed:", error);
    return NextResponse.json(
      { error: "Failed to subscribe for notifications" },
      { status: 500 },
    );
  }
}
