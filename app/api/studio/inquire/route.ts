import { NextResponse } from "next/server";
import {
  parseStudioInquiry,
  sendStudioInquiryEmail,
  tagStudioInquiryInKit,
} from "@/lib/studio-inquiry";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = parseStudioInquiry(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    if (parsed.honeypot) {
      return NextResponse.json({ ok: true });
    }

    await sendStudioInquiryEmail(parsed.inquiry);

    try {
      await tagStudioInquiryInKit(parsed.inquiry);
    } catch (tagError) {
      console.warn("Studio inquiry Kit tag failed (non-blocking):", tagError);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Studio inquiry failed:", error);

    const message =
      error instanceof Error && error.message.includes("not configured")
        ? "Inquiry is not configured"
        : "Failed to send inquiry";

    return NextResponse.json(
      { error: message },
      { status: message === "Inquiry is not configured" ? 503 : 502 },
    );
  }
}
