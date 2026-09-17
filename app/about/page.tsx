import type { Metadata } from "next";
import Link from "next/link";
import { about } from "@/lib/about";
import { RESUME_HREF } from "@/lib/content";
import styles from "@/components/branches/Branch.module.css";

export const metadata: Metadata = {
  title: about.metadataTitle,
  description: about.metadataDescription,
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="eyebrow mono">{about.kicker}</p>
        <h1 className={styles.headline}>{about.headline}</h1>
        <p className={styles.lede}>{about.lede}</p>
      </header>

      <section className={styles.section} aria-labelledby="background-heading">
        <h2 id="background-heading" className={styles.sectionHeading}>
          {about.background.heading}
        </h2>
        <p className={styles.sectionIntro}>{about.background.intro}</p>
        <ol className={styles.timeline}>
          {about.background.entries.map((entry) => (
            <li key={entry.org}>
              <p className={`${styles.period} mono`}>{entry.period}</p>
              <h3 className={styles.org}>{entry.org}</h3>
              <p className={styles.role}>{entry.role}</p>
              <p className={styles.detail}>{entry.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-labelledby="work-heading">
        <h2 id="work-heading" className={styles.sectionHeading}>
          {about.selectedWork.heading}
        </h2>
        <p className={styles.sectionIntro}>{about.selectedWork.intro}</p>
        <ul className={styles.list}>
          {about.selectedWork.items.map((item) => (
            <li key={item.name} className={styles.listItem}>
              <strong>{item.name}</strong>
              {item.detail}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionHeading}>
          {about.contact.heading}
        </h2>
        <p className={styles.sectionIntro}>{about.contact.lede}</p>
        <div className={styles.ctas}>
          <Link href={about.contact.studioCta.href} className={styles.ctaPrimary}>
            {about.contact.studioCta.label} →
          </Link>
          <Link
            href={about.contact.learnCta.href}
            className={styles.ctaSecondary}
          >
            {about.contact.learnCta.label} →
          </Link>
          <a
            href={RESUME_HREF}
            className={styles.ctaSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            {about.contact.resumeLabel} →
          </a>
        </div>
      </section>
    </div>
  );
}
