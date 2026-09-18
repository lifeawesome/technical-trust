import type { Metadata } from "next";
import Link from "next/link";
import EmailCapture from "@/components/coming-soon/EmailCapture";
import HomeHero from "@/components/home/HomeHero";
import PublicationShell from "@/components/publication/PublicationShell";
import TrackedCtaLink from "@/components/TrackedCtaLink";
import { coordinateLabel } from "@/lib/framework";
import { getHydratedPatterns } from "@/lib/pattern-hydration";
import {
  formatEditionNumber,
  getPublishedPatterns,
  isExternalUrl,
} from "@/lib/patterns";
import { branches, home } from "@/lib/branches";
import { getFeaturedLabProjects, lab } from "@/lib/lab";
import { studio } from "@/lib/studio";
import styles from "@/components/home/Home.module.css";

const title = "Technical Trust — Clearer technical conversations";
const description = home.hero.supporting;

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

export default async function Home() {
  const patterns = await getHydratedPatterns();
  const latest = getPublishedPatterns(patterns).slice(0, 2);
  const newest = latest[0];
  const featuredLab = getFeaturedLabProjects();

  if (!newest?.readUrl) {
    throw new Error("Homepage requires at least one published Pattern with readUrl");
  }

  return (
    <PublicationShell>
      <div className={styles.page}>
        <HomeHero />

        <section
          className={styles.problemSection}
          aria-labelledby="problem-heading"
        >
          <h2 id="problem-heading" className={styles.sectionHeading}>
            {home.problem.heading}
          </h2>
          <div className={styles.problemLines}>
            {home.problem.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section
          className={styles.branchesSection}
          aria-labelledby="branches-heading"
        >
          <h2 id="branches-heading" className={styles.sectionHeading}>
            {home.branchesHeading}
          </h2>
          <div className={styles.branchGrid}>
            {branches.map((branch) => (
              <Link
                key={branch.id}
                href={branch.href}
                className={styles.branchCard}
              >
                <p className={`${styles.branchKicker} mono`}>{branch.kicker}</p>
                <h3 className={styles.branchLine}>{branch.line}</h3>
                <p className={styles.branchBody}>{branch.body}</p>
              </Link>
            ))}
          </div>
        </section>

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

        <section className={styles.labSection} aria-labelledby="lab-heading">
          <h2 id="lab-heading" className={styles.sectionHeading}>
            Featured Lab projects
          </h2>
          {featuredLab.length > 0 ? (
            <ul className={styles.patternList}>
              {featuredLab.map((project) => (
                <li key={project.slug} className={styles.patternEntry}>
                  <h3 className={styles.patternName}>{project.name}</h3>
                  <p className={styles.patternDefinition}>{project.problem}</p>
                  <Link href={`/lab#${project.slug}`} className={styles.readLink}>
                    View project →
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.emptyPanel}>
              <p className={styles.emptyTitle}>{lab.empty.heading}</p>
              <p className={styles.emptyText}>{lab.empty.body}</p>
            </div>
          )}
          <p className={styles.sectionFollow}>
            <Link href="/lab" className={styles.allPatterns}>
              Explore the Lab →
            </Link>
          </p>
        </section>

        <section
          className={styles.studioSection}
          aria-labelledby="studio-heading"
        >
          <h2 id="studio-heading" className={styles.sectionHeading}>
            {studio.name}
          </h2>
          <p className={styles.offerName}>{studio.primaryOffer.name}</p>
          <p className={styles.offerPrice}>{studio.primaryOffer.priceLabel}</p>
          <p className={styles.bodyText}>{studio.primaryOffer.pitch}</p>
          <p className={styles.bodyText}>{studio.primaryOffer.includeLine}</p>
          <TrackedCtaLink
            href="/studio"
            className={styles.ctaPrimary}
            ctaId="home_studio_offer"
            ctaText={studio.primaryOffer.ctaLabel}
            location="homepage_studio"
          >
            {studio.primaryOffer.ctaLabel} →
          </TrackedCtaLink>
        </section>

        <section
          className={styles.credibilitySection}
          aria-labelledby="credibility-heading"
        >
          <h2 id="credibility-heading" className={styles.sectionHeading}>
            {home.credibility.heading}
          </h2>
          <p className={styles.bodyText}>{home.credibility.body}</p>
          <Link href={home.credibility.cta.href} className={styles.allPatterns}>
            {home.credibility.cta.label} →
          </Link>
        </section>

        <section
          className={styles.evidenceSection}
          aria-labelledby="evidence-heading"
        >
          <h2 id="evidence-heading" className={styles.sectionHeading}>
            {home.evidence.heading}
          </h2>
          <div className={styles.emptyPanel}>
            <p className={styles.emptyText}>{home.evidence.empty}</p>
          </div>
        </section>

        <section
          id="subscribe"
          className={styles.subscribeSection}
          aria-labelledby="subscribe-heading"
        >
          <h2 id="subscribe-heading" className={styles.subscribeTitle}>
            {home.subscribe.heading}
          </h2>
          <p className={styles.subscribeLede}>{home.subscribe.lede}</p>
          <EmailCapture />
        </section>

        <section
          className={styles.closingSection}
          aria-labelledby="studio-contact-heading"
        >
          <h2 id="studio-contact-heading" className={styles.subscribeTitle}>
            {home.studioContact.heading}
          </h2>
          <p className={styles.subscribeLede}>{home.studioContact.lede}</p>
          <p className={styles.offerPrice}>{studio.primaryOffer.priceLabel}</p>
          <TrackedCtaLink
            href={home.studioContact.cta.href}
            className={styles.ctaPrimary}
            ctaId="home_studio_contact"
            ctaText={home.studioContact.cta.label}
            location="homepage_closing"
          >
            {home.studioContact.cta.label} →
          </TrackedCtaLink>
        </section>
      </div>
    </PublicationShell>
  );
}
