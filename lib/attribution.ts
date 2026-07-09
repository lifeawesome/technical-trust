const SITE_ORIGIN = "https://technicaltrust.org";

const DEFAULT_UTM = {
  source: "direct",
  medium: "website",
  campaign: "technical-trust",
} as const;

function inferFromDocumentReferrer(documentReferrer?: string): {
  source: string | null;
  medium: string | null;
} {
  if (!documentReferrer) return { source: null, medium: null };

  try {
    const host = new URL(documentReferrer).hostname.replace(/^www\./, "").toLowerCase();

    if (host.includes("google.")) return { source: "google", medium: "organic" };
    if (host.includes("bing.")) return { source: "bing", medium: "organic" };
    if (host.includes("duckduckgo.")) return { source: "duckduckgo", medium: "organic" };
    if (host.includes("linkedin.")) return { source: "linkedin", medium: "social" };
    if (host.includes("twitter.") || host === "t.co" || host.includes("x.com")) {
      return { source: "twitter", medium: "social" };
    }
    if (host.includes("facebook.") || host === "fb.com") {
      return { source: "facebook", medium: "social" };
    }
    if (host.includes("instagram.")) return { source: "instagram", medium: "social" };
    if (host.includes("youtube.")) return { source: "youtube", medium: "social" };
    if (host.includes("reddit.")) return { source: "reddit", medium: "social" };

    return { source: host, medium: "referral" };
  } catch {
    return { source: null, medium: null };
  }
}

/** Build the referrer URL Kit uses to populate attribution + UTM fields. */
export function buildKitReferrer(
  pageUrl: string,
  documentReferrer?: string,
  siteOrigin: string = SITE_ORIGIN,
): string {
  let parsed: URL;

  try {
    parsed = new URL(pageUrl);
  } catch {
    parsed = new URL(siteOrigin);
  }

  // Report against the production site URL (path + query preserved).
  const canonical = new URL(siteOrigin);
  const url = new URL(`${parsed.pathname}${parsed.search}`, canonical.origin);
  const params = url.searchParams;

  const inferred = inferFromDocumentReferrer(documentReferrer);

  if (!params.get("utm_source")) {
    params.set("utm_source", inferred.source ?? DEFAULT_UTM.source);
  }
  if (!params.get("utm_medium")) {
    params.set("utm_medium", inferred.medium ?? DEFAULT_UTM.medium);
  }
  if (!params.get("utm_campaign")) {
    params.set("utm_campaign", DEFAULT_UTM.campaign);
  }

  return url.toString();
}
