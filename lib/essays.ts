import fs from "fs";
import path from "path";
import type { ComponentType } from "react";

const ESSAYS_DIR = path.join(process.cwd(), "content/essays");

export type EssayMeta = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  tags?: string[];
  draft?: boolean;
  series?: string;
};

export type Essay = EssayMeta & { slug: string };

type EssayModule = {
  default: ComponentType;
  meta: EssayMeta;
};

export function getEssaySlugs(): string[] {
  if (!fs.existsSync(ESSAYS_DIR)) return [];

  return fs
    .readdirSync(ESSAYS_DIR)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getEssayModule(slug: string): Promise<EssayModule | null> {
  try {
    return await import(`@/content/essays/${slug}.mdx`);
  } catch {
    return null;
  }
}

export function isEssayPublished(meta: EssayMeta): boolean {
  if (meta.draft && process.env.NODE_ENV === "production") return false;
  return true;
}

export async function getPublishedEssays(): Promise<Essay[]> {
  const slugs = getEssaySlugs();

  const essays = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await getEssayModule(slug);
      if (!mod?.meta) return null;
      if (!isEssayPublished(mod.meta)) return null;
      return { slug, ...mod.meta };
    }),
  );

  return essays
    .filter((essay): essay is Essay => essay !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function formatEssayDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}
