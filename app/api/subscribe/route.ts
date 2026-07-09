import { NextResponse } from "next/server";
import { buildKitReferrer } from "@/lib/attribution";
import { subscribeEmailToKit } from "@/lib/kit";
import { SITE_URL } from "@/lib/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const { email, pageUrl, documentReferrer } = (await request.json()) as {
      email?: string;
      pageUrl?: string;
      documentReferrer?: string;
    };

    if (!email || !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.KIT_API_KEY;
    const formId = process.env.KIT_FORM_ID;
    const tagId = process.env.KIT_TAG_ID;

    if (!apiKey || !formId) {
      console.error("Missing KIT_API_KEY or KIT_FORM_ID");
      return NextResponse.json({ error: "Subscribe not configured" }, { status: 503 });
    }

    const referrer = buildKitReferrer(
      pageUrl ?? SITE_URL,
      documentReferrer,
      SITE_URL,
    );

    await subscribeEmailToKit(apiKey, formId, email.trim().toLowerCase(), referrer, tagId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Kit subscribe failed:", error);
    return NextResponse.json({ error: "Subscribe failed" }, { status: 502 });
  }
}
