import Link from "next/link";
import BackgroundMesh from "@/components/BackgroundMesh";
import SiteLogo from "@/components/SiteLogo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import PublicationNav, {
  type PublicationNavActive,
} from "@/components/publication/PublicationNav";
import styles from "./PublicationShell.module.css";

type PublicationShellProps = {
  children: React.ReactNode;
  activeNav?: PublicationNavActive;
};

export default function PublicationShell({
  children,
  activeNav,
}: PublicationShellProps) {
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
        <div className={styles.headerActions}>
          <PublicationNav activeNav={activeNav} />
          <ThemeToggle className={styles.themeToggle} />
        </div>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        <Link href="/about">About</Link>
        {" · "}
        <Link href="/manifesto">Manifesto</Link>
        {" · "}
        <Link href="/studio">Studio</Link>
      </footer>
    </div>
  );
}
