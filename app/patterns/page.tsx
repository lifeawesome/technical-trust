import type { Metadata } from "next";
import Link from "next/link";
import PatternCard from "@/components/PatternCard";
import {
  getAnnouncedPatterns,
  getPublishedPatterns,
  patternsIntro,
} from "@/lib/patterns";
import styles from "./Patterns.module.css";

const title = "The Patterns — Named Failures of Technical Trust";
const description =
  "Every trust failure has a shape, and repeated shapes earn names. The growing catalog of named failures in technical trust — and the ones coming next.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PatternsPage() {
  const published = getPublishedPatterns();
  const announced = getAnnouncedPatterns();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={`${styles.kicker} mono`}>THE PATTERNS</p>
        <div className={styles.manifesto}>
          {patternsIntro.map((line) => (
            <p key={line} className={styles.line}>
              {line}
            </p>
          ))}
        </div>
      </header>

      <section
        className={styles.published}
        aria-labelledby="published-patterns-heading"
      >
        <h2 id="published-patterns-heading" className={styles.srOnly}>
          Published Patterns
        </h2>
        <ol className={styles.list}>
          {published.map((pattern, index) => (
            <PatternCard
              key={pattern.id}
              pattern={pattern}
              index={index}
              variant="published"
            />
          ))}
        </ol>
      </section>

      {announced.length > 0 ? (
        <section
          className={styles.announcedSection}
          aria-labelledby="announced-patterns-heading"
        >
          <h2
            id="announced-patterns-heading"
            className={styles.announcedHeading}
          >
            Named, not yet written.
          </h2>
          <ul className={styles.list}>
            {announced.map((pattern, index) => (
              <PatternCard
                key={pattern.id}
                pattern={pattern}
                index={index}
                variant="announced"
              />
            ))}
          </ul>
        </section>
      ) : null}

      <section className={styles.subscribe} aria-labelledby="subscribe-heading">
        <h2 id="subscribe-heading" className={styles.sectionHeading}>
          Patterns are named first in the newsletter.
        </h2>
        <Link href="/#subscribe" className={styles.subscribeLink}>
          Subscribe to Technical Trust Weekly →
        </Link>
      </section>

      <p className={styles.frameworkLink}>
        Every Pattern lives somewhere on the map.{" "}
        <Link href="/framework">Open the framework →</Link>
      </p>
    </div>
  );
}
