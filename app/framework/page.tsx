import type { Metadata } from "next";
import Link from "next/link";
import FrameworkExplorer from "@/components/FrameworkExplorer";
import {
  changelog,
  frameworkIntro,
  frameworkVersion,
  parseFrameworkView,
} from "@/lib/framework";
import styles from "./Framework.module.css";

const title = "The Technical Trust Framework";
const description =
  "Trust isn't a soft skill. It's a small set of components tested in a small set of moments. This map crosses one against the other — and most of it is still unwritten.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og/framework.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/framework.png"],
  },
};

export default async function FrameworkPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initialView = parseFrameworkView(params.view);
  const changelogNewestFirst = [...changelog].reverse();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={`${styles.kicker} mono`}>
          THE FRAMEWORK — {frameworkVersion}
        </p>
        <div className={styles.manifesto}>
          {frameworkIntro.map((line) => (
            <p key={line} className={styles.line}>
              {line}
            </p>
          ))}
        </div>
      </header>

      <FrameworkExplorer initialView={initialView} />

      <section className={styles.participation} aria-labelledby="participation-heading">
        <h2 id="participation-heading" className={styles.sectionHeading}>
          Which cell should I draw next?
        </h2>
        <p className={styles.participationBody}>
          Reply to any issue of Technical Trust Weekly and tell me.
        </p>
        <Link href="/#subscribe" className={styles.participationLink}>
          Subscribe to the newsletter →
        </Link>
      </section>

      <section className={styles.changelog} aria-labelledby="changelog-heading">
        <h2 id="changelog-heading" className={styles.sectionHeading}>
          How this map has changed.
        </h2>
        <ol className={styles.changelogList}>
          {changelogNewestFirst.map((item) => (
            <li key={`${item.date}-${item.entry}`} className={styles.changelogItem}>
              <time className={`${styles.changelogDate} mono`}>
                {item.date}
              </time>
              <span className={styles.changelogEntry}>{item.entry}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
