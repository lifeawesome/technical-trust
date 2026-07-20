/**
 * Kit broadcast archive — pulls sent newsletters from the Kit API.
 *
 * @see https://developers.kit.com/api-reference/broadcasts/list-broadcasts
 */

const KIT_API_BASE = "https://api.kit.com/v4";
const CANONICAL_EDITION_HOST = "newsletter.technicaltrust.org";

export type NewsletterIssue = {
  id: string;
  title: string;
  publishedAt: string;
  description?: string;
  publicUrl?: string;
};

type KitBroadcast = {
  id: number | string;
  subject?: string | null;
  preview_text?: string | null;
  description?: string | null;
  content?: string | null;
  published_at?: string | null;
  send_at?: string | null;
  public?: boolean | null;
  public_url?: string | null;
  status?: string | null;
};

type KitBroadcastsResponse = {
  broadcasts?: KitBroadcast[];
  errors?: string[];
};

type KitBroadcastResponse = {
  broadcast?: KitBroadcast;
  errors?: string[];
};

function kitHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };
}

/** Prefer the branded newsletter subdomain over kit.com. */
export function canonicalizeEditionUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (
      parsed.hostname === "technicaltrust.kit.com" ||
      parsed.hostname === "newsletter.technicaltrust.org"
    ) {
      parsed.protocol = "https:";
      parsed.hostname = CANONICAL_EDITION_HOST;
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

function normalizeTitle(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/:$/, "")
    .replace(/^the\s+/, "")
    .replace(/\s+/g, " ");
}

function stripHtmlToLines(html: string): string[] {
  const withoutScripts = html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ");
  const text = withoutScripts
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<\/h[1-6]>/gi, "\n")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—");

  return text
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

/**
 * Kit's preview_text is sometimes stale/copied across editions.
 * Pull the real standfirst from the email body: the line after "Title:".
 */
export function extractStandfirstFromContent(
  subject: string,
  content: string,
): string | undefined {
  const lines = stripHtmlToLines(content);
  const subjectKey = normalizeTitle(subject);

  for (let i = 0; i < lines.length - 1; i++) {
    const line = lines[i];
    if (!line.endsWith(":")) continue;
    if (normalizeTitle(line) !== subjectKey) continue;

    for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
      const candidate = lines[j];
      if (!candidate || candidate === "↓" || candidate.length < 12) continue;
      if (/^technicaltrust\.org$/i.test(candidate)) continue;
      if (
        /^(january|february|march|april|may|june|july|august|september|october|november|december)\b/i.test(
          candidate,
        )
      ) {
        continue;
      }
      return candidate;
    }
  }

  return undefined;
}

async function fetchBroadcastContent(
  apiKey: string,
  id: string,
): Promise<string | undefined> {
  try {
    const response = await fetch(`${KIT_API_BASE}/broadcasts/${id}`, {
      headers: kitHeaders(apiKey),
      next: { revalidate: 300 },
    });
    if (!response.ok) return undefined;
    const data = (await response.json()) as KitBroadcastResponse;
    return data.broadcast?.content ?? undefined;
  } catch {
    return undefined;
  }
}

function mapBroadcast(broadcast: KitBroadcast): NewsletterIssue | null {
  const publishedAt = broadcast.published_at ?? broadcast.send_at;
  const title = broadcast.subject?.trim();

  if (!title || !publishedAt) return null;

  // Only show broadcasts that Kit has made publicly viewable.
  if (broadcast.public === false || !broadcast.public_url) return null;

  return {
    id: String(broadcast.id),
    title,
    publishedAt,
    description:
      broadcast.preview_text?.trim() ||
      broadcast.description?.trim() ||
      undefined,
    publicUrl: canonicalizeEditionUrl(broadcast.public_url),
  };
}

export async function getNewsletterIssues(): Promise<NewsletterIssue[]> {
  const apiKey = process.env.KIT_API_KEY;

  if (!apiKey) {
    console.warn("KIT_API_KEY is not set — newsletter archive will be empty");
    return [];
  }

  try {
    const response = await fetch(
      `${KIT_API_BASE}/broadcasts?per_page=50&status=completed`,
      {
        headers: kitHeaders(apiKey),
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as KitBroadcastsResponse | null;
      console.error(
        "Kit broadcasts fetch failed:",
        body?.errors?.join(", ") ?? `HTTP ${response.status}`,
      );
      return [];
    }

    const data = (await response.json()) as KitBroadcastsResponse;
    const mapped = (data.broadcasts ?? [])
      .map(mapBroadcast)
      .filter((issue): issue is NewsletterIssue => issue !== null);

    // List responses ship stale preview_text — hydrate from each full record.
    const issues = await Promise.all(
      mapped.map(async (issue) => {
        const content = await fetchBroadcastContent(apiKey, issue.id);
        if (!content) return issue;
        const standfirst = extractStandfirstFromContent(issue.title, content);
        if (!standfirst) return issue;
        return { ...issue, description: standfirst };
      }),
    );

    return issues.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  } catch (error) {
    console.error("Kit broadcasts fetch failed:", error);
    return [];
  }
}
