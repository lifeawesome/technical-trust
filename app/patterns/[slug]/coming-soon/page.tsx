import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import PatternNotificationForm from "@/components/patterns/PatternNotificationForm";
import PublicationShell from "@/components/publication/PublicationShell";
import { coordinateLabel } from "@/lib/framework";
import {
  comingSoonHref,
  getPatternBySlug,
  isPatternComingSoon,
  isPatternPublished,
  patternPreviewText,
  patternWhatItCovers,
  patternsInSameRow,
  publishedPatternHref,
} from "@/lib/pattern-coming-soon";
import { patterns } from "@/lib/patterns";
import styles from "../../ComingSoon.module.css";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export function generateStaticParams() {
  return patterns
    .filter((p) => isPatternComingSoon(p))
    .map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getPatternBySlug(slug);
  if (!pattern) {
    return { title: "Pattern" };
  }

  return {
    title: `${pattern.name} — Coming Soon`,
    description: patternPreviewText(pattern),
    robots: { index: true, follow: true },
  };
}

export default async function ComingSoonPatternPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const pattern = getPatternBySlug(slug);

  if (!pattern) {
    notFound();
  }

  if (isPatternPublished(pattern)) {
    const { href, external } = publishedPatternHref(pattern);
    if (external) {
      redirect(href);
    }
    redirect(href);
  }

  if (!isPatternComingSoon(pattern)) {
    notFound();
  }

  const sourceRaw = Array.isArray(query.source) ? query.source[0] : query.source;
  const source =
    sourceRaw === "diagnostic" ||
    sourceRaw === "newsletter" ||
    sourceRaw === "other"
      ? sourceRaw
      : "website";

  const scoreRaw = Array.isArray(query.score) ? query.score[0] : query.score;
  const weakCellScore =
    scoreRaw && !Number.isNaN(Number(scoreRaw)) ? Number(scoreRaw) : undefined;

  const related = patternsInSameRow(pattern);
  const coords = coordinateLabel(pattern.rowId, pattern.colId);

  return (
    <PublicationShell activeNav="patterns">
      <div className={styles.page}>
        <p className={`${styles.kicker} mono`}>PATTERN</p>
        <span className={`${styles.badge} mono`}>COMING SOON</span>
        <h1 className={styles.title}>{pattern.name}</h1>
        <p className={`${styles.coords} mono`}>{coords}</p>
        <p className={styles.preview}>{patternPreviewText(pattern)}</p>

        <section className={styles.panel} aria-labelledby="covers-heading">
          <h2 id="covers-heading" className={styles.panelHeading}>
            What this covers
          </h2>
          <p className={styles.panelBody}>{patternWhatItCovers(pattern)}</p>
          <p className={styles.practice}>
            <strong>{pattern.practice.name}:</strong> {pattern.practice.move}
          </p>
        </section>

        <div className={styles.notifyBlock}>
          <PatternNotificationForm
            patternSlug={pattern.id}
            patternTitle={pattern.name}
            source={source}
            weakCellScore={weakCellScore}
          />
        </div>

        {related.length > 0 ? (
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className={styles.relatedHeading}>
              Other patterns in this row
            </h2>
            <ul className={styles.relatedList}>
              {related.map((item) => {
                const link = isPatternPublished(item)
                  ? publishedPatternHref(item)
                  : { href: comingSoonHref(item.id), external: false };

                return (
                  <li key={item.id} className={styles.relatedItem}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className={styles.relatedName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.name}
                      </a>
                    ) : (
                      <Link href={link.href} className={styles.relatedName}>
                        {item.name}
                      </Link>
                    )}
                    <span className={`${styles.relatedMeta} mono`}>
                      {isPatternPublished(item) ? "Published" : "Coming soon"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <Link href="/patterns" className={styles.backLink}>
          ← All Patterns
        </Link>
      </div>
    </PublicationShell>
  );
}
