/**
 * Kit broadcast archive — wire up when you're ready to pull newsletter issues
 * from the Kit API instead of duplicating content in the repo.
 *
 * @see https://developers.kit.com/api-reference/v4/broadcasts
 */

export type NewsletterIssue = {
  id: string;
  title: string;
  publishedAt: string;
  description?: string;
  publicUrl?: string;
};

export async function getNewsletterIssues(): Promise<NewsletterIssue[]> {
  const apiKey = process.env.KIT_API_KEY;

  if (!apiKey) {
    return [];
  }

  // TODO: fetch broadcasts from Kit and map to NewsletterIssue[]
  // const response = await fetch("https://api.kit.com/v4/broadcasts", {
  //   headers: { "X-Kit-Api-Key": apiKey },
  //   next: { revalidate: 3600 },
  // });

  return [];
}
