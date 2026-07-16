import Link from "next/link";
import BackgroundMesh from "@/components/BackgroundMesh";
import SiteLogo from "@/components/SiteLogo";
import styles from "./PublicationShell.module.css";

type PublicationShellProps = {
  children: React.ReactNode;
  activeNav?: "essays" | "newsletter" | "manifesto" | "framework" | "patterns";
};

export default function PublicationShell({
  children,
  activeNav,
}: PublicationShellProps) {
  const frameworkActive =
    activeNav === "framework" || activeNav === "patterns";

  return (
    <div className={styles.page}>
      <div className={styles.meshWrap}>
        <BackgroundMesh />
      </div>

      <header className={styles.header}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            <SiteLogo href="" className={styles.logo} />
            <span className={styles.brandName}>Technical Trust</span>
          </Link>
        </div>
        <nav className={styles.nav} aria-label="Publication">
          <Link href="/essays" data-active={activeNav === "essays" || undefined}>
            Essays
          </Link>
          <div className={styles.navGroup}>
            <Link
              href="/framework"
              className={styles.navParent}
              data-active={frameworkActive || undefined}
            >
              Framework
            </Link>
            <ul className={styles.submenu} aria-label="Framework">
              <li>
                <Link
                  href="/patterns"
                  data-active={activeNav === "patterns" || undefined}
                >
                  Patterns
                </Link>
              </li>
            </ul>
          </div>
          <Link
            href="/manifesto"
            data-active={activeNav === "manifesto" || undefined}
          >
            Manifesto
          </Link>
          <Link
            href="/newsletter"
            data-active={activeNav === "newsletter" || undefined}
          >
            Newsletter
          </Link>
          <Link href="/about">About Dan</Link>
        </nav>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Written by{" "}
        <Link href="/about">Dan Davidson</Link>
      </footer>
    </div>
  );
}
