import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/essays/EssaysIndex.module.css";
import { formatEssayDate, getPublishedEssays } from "@/lib/essays";

export const metadata: Metadata = {
  title: "Essays",
  description:
    "Long-form writing on technical trust, vendor evaluation, and high-stakes technology decisions.",
};

export default async function EssaysPage() {
  const essays = await getPublishedEssays();

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <div className="eyebrow mono">ESSAYS</div>
        <h1 className={styles.heading}>Field notes on technical trust</h1>
        <p className={styles.lede}>
          Long-form guides for people making high-stakes technology decisions —
          vendor evaluations, demo scrutiny, migrations, and build-vs-buy.
        </p>
      </div>

      {essays.length > 0 ? (
        <div className={styles.list}>
          {essays.map((essay) => (
            <Link key={essay.slug} href={`/essays/${essay.slug}`} className={styles.card}>
              <div className={styles.cardMeta}>
                <time className={`${styles.date} mono`} dateTime={essay.publishedAt}>
                  {formatEssayDate(essay.publishedAt)}
                </time>
                {essay.series ? (
                  <span className={`${styles.series} mono`}>{essay.series}</span>
                ) : null}
              </div>
              <h2 className={styles.cardTitle}>{essay.title}</h2>
              <p className={styles.cardDesc}>{essay.description}</p>
              {essay.tags?.length ? (
                <div className={styles.tags}>
                  {essay.tags.map((tag) => (
                    <span key={tag} className={`${styles.tag} mono`}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>First essay coming soon</p>
          <p className={styles.emptyText}>
            Copy <code>content/essays/_template.mdx</code> to a new slug, set{" "}
            <code>draft: false</code>, and push to publish.
          </p>
        </div>
      )}
    </div>
  );
}
