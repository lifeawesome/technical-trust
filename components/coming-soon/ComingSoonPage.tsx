import Link from "next/link";
import BackgroundMesh from "@/components/BackgroundMesh";
import SiteLogo from "@/components/SiteLogo";
import EmailCapture from "@/components/coming-soon/EmailCapture";
import { comingSoon } from "@/lib/content";
import styles from "./ComingSoonPage.module.css";

function LineIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    compass: "M12 2v4M12 18v4M2 12h4M18 12h4M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z",
    map: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zM9 3v15M15 6v15",
    audit: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type] ?? paths.compass} />
    </svg>
  );
}

export default function ComingSoonPage() {
  return (
    <div className={styles.page}>
      <div className={styles.meshWrap}>
        <BackgroundMesh />
      </div>

      <header className={styles.header}>
        <div className={styles.brand}>
          <SiteLogo className={styles.logo} />
          <span className={styles.brandName}>Technical Trust</span>
        </div>
        <Link href="/about" className={styles.aboutLink}>
          About Dan →
        </Link>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={`${styles.enter} eyebrow mono`}>{comingSoon.eyebrow}</div>

          <h1 className={`${styles.headline} ${styles.enter} ${styles.enterDelay1}`}>
            {comingSoon.headline}
          </h1>

          <p className={`${styles.subhead} ${styles.enter} ${styles.enterDelay2}`}>
            {comingSoon.subhead}
          </p>

          <section
            className={`${styles.comingSection} ${styles.enter} ${styles.enterDelay3}`}
            aria-labelledby="whats-coming"
          >
            <h2 id="whats-coming" className={styles.comingLabel}>
              What&apos;s coming
            </h2>
            <ul className={styles.comingGrid}>
              {comingSoon.whatsComing.map((item) => (
                <li key={item.title} className={styles.comingCard}>
                  <div className={styles.iconWrap}>
                    <LineIcon type={item.icon} />
                  </div>
                  <h3 className={styles.comingTitle}>{item.title}</h3>
                  <p className={styles.comingDesc}>{item.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section
            className={`${styles.subscribeSection} ${styles.enter} ${styles.enterDelay4}`}
            aria-labelledby="subscribe-label"
          >
            <p id="subscribe-label" className={styles.subscribeLabel}>
              {comingSoon.email.label}
            </p>
            <EmailCapture />
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        {comingSoon.footer.prefix}{" "}
        <Link href={comingSoon.footer.aboutHref}>{comingSoon.footer.name}</Link>
      </footer>
    </div>
  );
}
