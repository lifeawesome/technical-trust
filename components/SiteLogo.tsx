import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  href?: string;
  className?: string;
};

export default function SiteLogo({ href = "/", className }: SiteLogoProps) {
  const logo = (
    <Image
      src="/TechnicalTrustLogo.svg"
      alt="Technical Trust"
      width={32}
      height={37}
      className={className}
      priority
    />
  );

  if (!href) return logo;

  return (
    <Link href={href} aria-label="Technical Trust home">
      {logo}
    </Link>
  );
}
