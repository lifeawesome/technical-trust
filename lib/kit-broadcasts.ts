/**
 * Kit broadcast archive — pulls sent newsletters from the Kit API.
 *
 * @see https://developers.kit.com/api-reference/broadcasts/list-broadcasts
 */

const KIT_API_BASE = "https://api.kit.com/v4";

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

function kitHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };
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
    description: broadcast.preview_text?.trim() || broadcast.description?.trim() || undefined,
    publicUrl: broadcast.public_url,
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
    const issues = (data.broadcasts ?? [])
      .map(mapBroadcast)
      .filter((issue): issue is NewsletterIssue => issue !== null)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );

    return issues;
  } catch (error) {
    console.error("Kit broadcasts fetch failed:", error);
    return [];
  }
}
