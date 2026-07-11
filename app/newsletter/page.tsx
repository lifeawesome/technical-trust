import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/newsletter/NewsletterArchive.module.css";
import { formatEssayDate } from "@/lib/essays";
import { getNewsletterIssues } from "@/lib/kit-broadcasts";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Archive of Technical Trust newsletter issues — chapters and field notes as they publish.",
};

export default async function NewsletterPage() {
  const issues = await getNewsletterIssues();

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <div className="eyebrow mono">NEWSLETTER</div>
        <h1 className={styles.heading}>Chapters as they publish</h1>
        <p className={styles.lede}>
          Email editions of Technical Trust — practical guides for evaluating
          vendors, sitting through demos, and making confident technology
          decisions.
        </p>
      </div>

      {issues.length > 0 ? (
        <div className={styles.list}>
          {issues.map((issue) => (
            <a
              key={issue.id}
              href={issue.publicUrl}
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={`${styles.cardMeta} mono`}>
                {formatEssayDate(issue.publishedAt)}
              </div>
              <h2 className={styles.cardTitle}>{issue.title}</h2>
              {issue.description ? (
                <p className={styles.cardDesc}>{issue.description}</p>
              ) : null}
            </a>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No published issues yet</p>
          <p className={styles.emptyText}>
            Sent Kit broadcasts with a public archive link will appear here
            automatically.
          </p>
        </div>
      )}

      <div className={styles.subscribe}>
        <p className={styles.subscribeText}>
          Get new chapters in your inbox as they publish.
        </p>
        <Link href="/#subscribe" className={styles.subscribeLink}>
          Subscribe on the homepage →
        </Link>
      </div>
    </div>
  );
}
