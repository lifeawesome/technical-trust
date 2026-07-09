import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { parseForwardRoutes, resolveForwardDestination } from "@/lib/resend-inbound";

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  const forwardFrom = process.env.RESEND_FORWARD_FROM;
  const forwardTo = process.env.RESEND_FORWARD_TO;
  const forwardRoutes = parseForwardRoutes(process.env.RESEND_FORWARD_ROUTES);

  if (!apiKey || !webhookSecret || !forwardFrom || (!forwardTo && Object.keys(forwardRoutes).length === 0)) {
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

  const destination = resolveForwardDestination(forwardRoutes, forwardTo, {
    receivedFor: event.data.received_for,
    to: event.data.to,
  });

  if (!destination) {
    console.warn("No forward route matched inbound email:", {
      receivedFor: event.data.received_for,
      to: event.data.to,
      subject: event.data.subject,
    });
    return NextResponse.json({ ok: true, skipped: true });
  }

  const { data, error } = await resend.emails.receiving.forward({
    emailId: event.data.email_id,
    to: destination,
    from: forwardFrom,
  });

  if (error) {
    console.error("Resend email forward failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data?.id, to: destination });
}
