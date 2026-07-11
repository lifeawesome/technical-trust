import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/content";
import { getPublishedEssays } from "@/lib/essays";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const essays = await getPublishedEssays();

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/essays`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/manifesto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/newsletter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...essays.map((essay) => ({
      url: `${SITE_URL}/essays/${essay.slug}`,
      lastModified: new Date(essay.updatedAt ?? essay.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
  ];
}
