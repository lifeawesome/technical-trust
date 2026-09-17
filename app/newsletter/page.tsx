import type { Metadata } from "next";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import styles from "@/components/newsletter/NewsletterArchive.module.css";
import { newsletterCopy } from "@/lib/branches";
import { formatEssayDate } from "@/lib/essays";
import { getNewsletterIssues } from "@/lib/kit-broadcasts";

export const metadata: Metadata = {
  title: "Newsletter",
  description: newsletterCopy.lede,
};

export default async function NewsletterPage() {
  const issues = await getNewsletterIssues();

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <div className="eyebrow mono">NEWSLETTER</div>
        <h1 className={styles.heading}>{newsletterCopy.heading}</h1>
        <p className={styles.lede}>{newsletterCopy.lede}</p>
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
          {newsletterCopy.subscribe}
        </p>
        <TrackedCtaLink
          href="/#subscribe"
          className={styles.subscribeLink}
          ctaId="newsletter_subscribe"
          ctaText="Subscribe on the homepage"
          location="newsletter_page"
        >
          Subscribe on the homepage →
        </TrackedCtaLink>
      </div>
    </div>
  );
}
