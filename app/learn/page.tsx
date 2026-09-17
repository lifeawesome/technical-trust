import type { Metadata } from "next";
import Link from "next/link";
import HomeFrameworkEmbed from "@/components/home/HomeFrameworkEmbed";
import PrecisionCycleHeroMark from "@/components/home/PrecisionCycleHeroMark";
import { learn } from "@/lib/branches";
import { getHydratedPatterns } from "@/lib/pattern-hydration";
import branchStyles from "@/components/branches/Branch.module.css";
import homeStyles from "@/components/home/Home.module.css";

export const metadata: Metadata = {
  title: learn.metadataTitle,
  description: learn.metadataDescription,
};

export default async function LearnPage() {
  const patterns = await getHydratedPatterns();

  return (
    <div className={homeStyles.page}>
      <header className={homeStyles.learnHero}>
        <div className={homeStyles.heroKicker}>
          <p className={`${homeStyles.kicker} mono`}>{learn.kicker}</p>
        </div>
        <div className={homeStyles.heroHeadline}>
          <h1 className={homeStyles.headline}>{learn.headline}</h1>
        </div>
        <div className={homeStyles.heroVisual}>
          <PrecisionCycleHeroMark />
        </div>
        <div className={homeStyles.heroStandfirst}>
          <p className={homeStyles.supporting}>{learn.lede}</p>
          <p className={homeStyles.supporting}>{learn.supporting}</p>
        </div>
      </header>

      <section
        className={homeStyles.branchesSection}
        aria-labelledby="learn-paths-heading"
      >
        <h2 id="learn-paths-heading" className={homeStyles.sectionHeading}>
          Where to start
        </h2>
        <div className={branchStyles.cardGrid}>
          {learn.paths.map((path) => (
            <Link key={path.href} href={path.href} className={branchStyles.card}>
              <p className={`${branchStyles.cardKicker} mono`}>{path.kicker}</p>
              <h3 className={branchStyles.cardTitle}>{path.name}</h3>
              <p className={branchStyles.cardBody}>{path.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <HomeFrameworkEmbed patterns={patterns} />
    </div>
  );
}
