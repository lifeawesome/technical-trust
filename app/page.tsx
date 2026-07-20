import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/coming-soon/EmailCapture";
import HomeFrameworkEmbed from "@/components/home/HomeFrameworkEmbed";
import HomeHero from "@/components/home/HomeHero";
import PublicationShell from "@/components/publication/PublicationShell";
import { coordinateLabel } from "@/lib/framework";
import {
  formatEditionNumber,
  getPublishedPatterns,
  isExternalUrl,
} from "@/lib/patterns";
import styles from "@/components/home/Home.module.css";

const title = "Technical Trust — A discipline for earning trust in technology";
const description =
  "Trust is the scarcest resource in technology. A living framework of named failures and their counter-moves — for sales engineers, solutions architects, and everyone who helps people make confident decisions about complex systems.";

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

export default function Home() {
  const latest = getPublishedPatterns().slice(0, 2);
  const newest = latest[0];

  if (!newest?.readUrl) {
    throw new Error("Homepage requires at least one published Pattern with readUrl");
  }

  return (
    <PublicationShell>
      <div className={styles.page}>
        <HomeHero
          latestPatternUrl={newest.readUrl}
          latestPatternName={newest.name}
        />

        <HomeFrameworkEmbed />

        <section
          className={styles.patternsSection}
          aria-labelledby="latest-patterns-heading"
        >
          <h2 id="latest-patterns-heading" className={styles.sectionHeading}>
            The newest named failures.
          </h2>
          <ol className={styles.patternList}>
            {latest.map((pattern) => {
              const edition = pattern.editionNumber
                ? formatEditionNumber(pattern.editionNumber)
                : null;
              const coords = coordinateLabel(pattern.rowId, pattern.colId);

              return (
                <li key={pattern.id} className={styles.patternEntry}>
                  <p className={`${styles.patternMeta} mono`}>
                    {edition ? (
                      <span>PATTERN {edition}</span>
                    ) : (
                      <span>PATTERN</span>
                    )}
                    <span className={styles.metaSep} aria-hidden="true">
                      ·
                    </span>
                    <Link
                      href="/framework"
                      className={styles.coords}
                      aria-label={`${coords} on the framework map`}
                    >
                      {coords}
                    </Link>
                  </p>
                  <h3 className={styles.patternName}>{pattern.name}</h3>
                  {pattern.definition ? (
                    <p className={styles.patternDefinition}>
                      {pattern.definition}
                    </p>
                  ) : null}
                  {pattern.readUrl ? (
                    <a
                      href={pattern.readUrl}
                      className={styles.readLink}
                      aria-label={
                        edition
                          ? `Read ${pattern.name}, Pattern ${edition}`
                          : `Read ${pattern.name}`
                      }
                      {...(isExternalUrl(pattern.readUrl)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      Read →
                    </a>
                  ) : null}
                </li>
              );
            })}
          </ol>
          <Link href="/patterns" className={styles.allPatterns}>
            All Patterns →
          </Link>
        </section>

        <section
          className={styles.manifestoSection}
          aria-labelledby="manifesto-excerpt-heading"
        >
          <h2 id="manifesto-excerpt-heading" className={styles.srOnly}>
            From the manifesto
          </h2>
          <div className={styles.manifestoLines}>
            <p>Information is no longer scarce.</p>
            <p>Attention, judgment, and trust are.</p>
          </div>
          <p className={styles.manifestoFollow}>
            The manifesto is the commitment behind this work — why trust is the
            scarcest resource in technology, and why the people who help others
            make confident decisions will matter more than those who simply have
            answers.
          </p>
          <Link href="/manifesto" className={styles.manifestoLink}>
            Read the manifesto →
          </Link>
        </section>

        <section
          id="subscribe"
          className={styles.subscribeSection}
          aria-labelledby="subscribe-heading"
        >
          <h2 id="subscribe-heading" className={styles.subscribeTitle}>
            Technical Trust Weekly
          </h2>
          <p className={styles.subscribeLede}>
            One named failure and its counter-move. Every Friday.
          </p>
          <EmailCapture />
        </section>
      </div>
    </PublicationShell>
  );
}
