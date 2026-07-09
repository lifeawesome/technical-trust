import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  const forwardFrom = process.env.RESEND_FORWARD_FROM;
  const forwardTo = process.env.RESEND_FORWARD_TO;

  if (!apiKey || !webhookSecret || !forwardFrom || !forwardTo) {
    console.error("Missing Resend inbound email configuration");
    return NextResponse.json({ error: "Inbound email not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const payload = await request.text();

  let event;
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get("svix-id") ?? "",
        timestamp: request.headers.get("svix-timestamp") ?? "",
        signature: request.headers.get("svix-signature") ?? "",
      },
      webhookSecret,
    });
  } catch (error) {
    console.error("Resend webhook verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  if (event.type !== "email.received") {
    return NextResponse.json({ ok: true });
  }

  const { data, error } = await resend.emails.receiving.forward({
    emailId: event.data.email_id,
    to: forwardTo,
    from: forwardFrom,
  });

  if (error) {
    console.error("Resend email forward failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id });
}
