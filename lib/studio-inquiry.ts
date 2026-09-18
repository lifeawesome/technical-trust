import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/content";
import {
  tagKitSubscriber,
  tagKitSubscriberByName,
  upsertKitSubscriber,
} from "@/lib/kit";
import { KIT_STUDIO_INQUIRY_TAG } from "@/lib/kit-naming";
import { studio } from "@/lib/studio";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = {
  name: 100,
  company: 200,
  situation: 4000,
  siteUrl: 500,
} as const;

export type StudioInquiry = {
  name: string;
  email: string;
  company: string;
  situation: string;
  siteUrl?: string;
};

export type ParseResult =
  | { ok: true; inquiry: StudioInquiry; honeypot: boolean }
  | { ok: false; error: string };

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function parseStudioInquiry(body: unknown): ParseResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid inquiry" };
  }

  const input = body as Record<string, unknown>;
  const honeypot = asString(input.company_website);

  if (honeypot) {
    return {
      ok: true,
      honeypot: true,
      inquiry: {
        name: "honeypot",
        email: "honeypot@invalid.example",
        company: "honeypot",
        situation: "honeypot",
      },
    };
  }

  const name = asString(input.name);
  const email = asString(input.email).toLowerCase();
  const company = asString(input.company);
  const situation = asString(input.situation);
  const siteUrl = asString(input.siteUrl);

  if (!name || name.length > LIMITS.name) {
    return { ok: false, error: "Name is required" };
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "A valid email is required" };
  }
  if (!company || company.length > LIMITS.company) {
    return { ok: false, error: "Company / product is required" };
  }
  if (!situation || situation.length > LIMITS.situation) {
    return { ok: false, error: "Describe the conversation that keeps going sideways" };
  }
  if (siteUrl && (siteUrl.length > LIMITS.siteUrl || !isHttpUrl(siteUrl))) {
    return { ok: false, error: "Site URL must be a valid http(s) link" };
  }

  return {
    ok: true,
    honeypot: false,
    inquiry: {
      name,
      email,
      company,
      situation,
      ...(siteUrl ? { siteUrl } : {}),
    },
  };
}

export function formatInquiryEmail(inquiry: StudioInquiry): string {
  return [
    studio.primaryOffer.name,
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Company / product: ${inquiry.company}`,
    `Site: ${inquiry.siteUrl ?? "(not provided)"}`,
    "",
    "The conversation that keeps going sideways:",
    inquiry.situation,
  ].join("\n");
}

export async function sendStudioInquiryEmail(inquiry: StudioInquiry) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.RESEND_FORWARD_FROM;

  if (!apiKey || !from) {
    throw new Error("Studio inquiry email is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: CONTACT_EMAIL,
    replyTo: inquiry.email,
    subject: `${studio.contact.mailtoSubject} — ${inquiry.company}`,
    text: formatInquiryEmail(inquiry),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function tagStudioInquiryInKit(inquiry: StudioInquiry) {
  const apiKey = process.env.KIT_API_KEY;
  if (!apiKey) return;

  await upsertKitSubscriber(apiKey, inquiry.email);

  const tagId = process.env.KIT_STUDIO_INQUIRY_TAG_ID;
  if (tagId) {
    await tagKitSubscriber(apiKey, tagId, inquiry.email);
    return;
  }

  await tagKitSubscriberByName(apiKey, KIT_STUDIO_INQUIRY_TAG, inquiry.email);
}
