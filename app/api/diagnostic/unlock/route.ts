import { NextResponse } from "next/server";
import { buildKitReferrer } from "@/lib/attribution";
import {
  getDiagnosticResultByToken,
  unlockDiagnosticResult,
} from "@/lib/diagnostic/data";
import { SITE_URL } from "@/lib/content";
import { subscribeEmailToKit } from "@/lib/kit";
import { isSupabaseConfigured } from "@/lib/supabase/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Diagnostic storage is not configured" },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      token?: string;
      email?: string;
      pageUrl?: string;
      documentReferrer?: string;
    };

    const token = body.token?.trim();
    const email = body.email?.trim().toLowerCase();

    if (!token) {
      return NextResponse.json({ error: "Token required" }, { status: 400 });
    }

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await getDiagnosticResultByToken(token);
    if (!existing) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 });
    }

    if (existing.unlocked_at) {
      return NextResponse.json({
        ok: true,
        alreadyUnlocked: true,
      });
    }

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;
    const tagId =
      process.env.KIT_DIAGNOSTIC_TAG_ID || process.env.KIT_TAG_ID;

    if (!apiKey || !formId) {
      console.error("Missing KIT_API_KEY or KIT_FORM_ID");
      return NextResponse.json(
        { error: "Subscribe not configured" },
        { status: 503 },
      );
    }

    const referrer = buildKitReferrer(
      body.pageUrl ?? `${SITE_URL}/diagnostic/r/${token}`,
      body.documentReferrer,
      SITE_URL,
    );

    await subscribeEmailToKit(apiKey, formId, email, referrer, tagId);
    await unlockDiagnosticResult(token, email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Diagnostic unlock failed:", error);
    return NextResponse.json(
      { error: "Failed to unlock results" },
      { status: 502 },
    );
  }
}
