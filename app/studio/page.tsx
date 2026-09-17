import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/content";
import { studio } from "@/lib/studio";
import styles from "@/components/branches/Branch.module.css";

export const metadata: Metadata = {
  title: studio.metadataTitle,
  description: studio.metadataDescription,
};

export default function StudioPage() {
  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="eyebrow mono">{studio.kicker}</p>
        <h1 className={styles.headline}>{studio.headline}</h1>
        <p className={styles.lede}>{studio.description}</p>
        <p className={styles.supporting}>{studio.supportingTerm}</p>
      </header>

      <section className={styles.section} aria-labelledby="sprint-heading">
        <h2 id="sprint-heading" className={styles.sectionHeading}>
          {studio.primaryOffer.name}
        </h2>
        <p className={styles.sectionIntro}>{studio.primaryOffer.pitch}</p>
        <ul className={styles.list}>
          {studio.primaryOffer.deliverables.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="fit-heading">
        <h2 id="fit-heading" className={styles.sectionHeading}>
          {studio.fit.heading}
        </h2>
        <ul className={styles.list}>
          {studio.fit.lines.map((line) => (
            <li key={line} className={styles.listItem}>
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="clients-heading">
        <h2 id="clients-heading" className={styles.sectionHeading}>
          A fit for
        </h2>
        <ul className={styles.list}>
          {studio.idealClients.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="later-heading">
        <h2 id="later-heading" className={styles.sectionHeading}>
          Later offers
        </h2>
        <p className={styles.sectionIntro}>
          Not for sale yet. Named so the road is visible.
        </p>
        <ul className={styles.list}>
          {studio.futureOffers.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionHeading}>
          {studio.contact.heading}
        </h2>
        <p className={styles.sectionIntro}>{studio.contact.lede}</p>
        <div className={styles.ctas}>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Studio inquiry — Demo Sprint")}`}
            className={styles.ctaPrimary}
          >
            {studio.contact.ctaLabel} →
          </a>
        </div>
      </section>
    </div>
  );
}
