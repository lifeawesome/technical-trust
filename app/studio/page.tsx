import type { Metadata } from "next";
import StudioInquiryForm from "@/components/studio/StudioInquiryForm";
import { studio } from "@/lib/studio";
import styles from "@/components/branches/Branch.module.css";

export const metadata: Metadata = {
  title: studio.metadataTitle,
  description: studio.metadataDescription,
};

export default function StudioPage() {
  const offer = studio.primaryOffer;

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
          {offer.name}
        </h2>
        <p className={styles.price}>{offer.priceLabel}</p>
        <p className={styles.sectionIntro}>{offer.pitch}</p>
        <p className={styles.quote}>{offer.quote}</p>
      </section>

      <section className={styles.sectionWide} aria-labelledby="included-heading">
        <div className={styles.split}>
          <div>
            <h2 id="included-heading" className={styles.sectionHeading}>
              {studio.sections.included}
            </h2>
            <ul className={styles.list}>
              {offer.deliverables.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.note}>{offer.timeline}</p>
          </div>
          <div>
            <h2 id="excluded-heading" className={styles.sectionHeading}>
              {studio.sections.notIncluded}
            </h2>
            <ul className={styles.list}>
              {offer.notIncluded.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="terms-heading">
        <h2 id="terms-heading" className={styles.sectionHeading}>
          {studio.sections.terms}
        </h2>
        <ul className={styles.list}>
          {offer.terms.map((item) => (
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
          {studio.sections.clients}
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
          {studio.sections.later}
        </h2>
        <p className={styles.sectionIntro}>{studio.sections.laterLede}</p>
        <ul className={styles.list}>
          {studio.futureOffers.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section
        id="start-a-project"
        className={styles.section}
        aria-labelledby="contact-heading"
      >
        <h2 id="contact-heading" className={styles.sectionHeading}>
          {studio.contact.heading}
        </h2>
        <p className={styles.sectionIntro}>{studio.contact.lede}</p>
        <StudioInquiryForm />
      </section>
    </div>
  );
}
