import Image from "next/image";
import Link from "next/link";
import styles from "./SiteLogo.module.css";

type SiteLogoProps = {
  href?: string;
  className?: string;
};

export default function SiteLogo({ href = "/", className }: SiteLogoProps) {
  const logo = (
    <span className={`${styles.wrap}${className ? ` ${className}` : ""}`}>
      <Image
        src="/brand/technical-trust-mark-for-dark.svg"
        alt=""
        width={32}
        height={32}
        className={`${styles.mark} ${styles.dark}`}
        priority
      />
      <Image
        src="/brand/technical-trust-mark-for-light.svg"
        alt=""
        width={32}
        height={32}
        className={`${styles.mark} ${styles.light}`}
        priority
      />
    </span>
  );

  if (!href) return logo;

  return (
    <Link href={href} aria-label="Technical Trust home">
      {logo}
    </Link>
  );
}
