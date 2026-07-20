import Link from "next/link";
import BackgroundMesh from "@/components/BackgroundMesh";
import SiteLogo from "@/components/SiteLogo";
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
        <PublicationNav activeNav={activeNav} />
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        Written by{" "}
        <Link href="/about">Dan Davidson</Link>
        {" · "}
        <Link href="/manifesto">Manifesto</Link>
      </footer>
    </div>
  );
}
