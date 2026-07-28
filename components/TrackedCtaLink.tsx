"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCtaClick } from "@/lib/analytics";

type TrackedCtaLinkProps = ComponentProps<typeof Link> & {
  ctaId: string;
  ctaText: string;
  location: string;
};

export default function TrackedCtaLink({
  ctaId,
  ctaText,
  location,
  href,
  onClick,
  children,
  ...props
}: TrackedCtaLinkProps) {
  const destination = typeof href === "string" ? href : href.pathname ?? undefined;

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        trackCtaClick({
          ctaId,
          ctaText,
          location,
          destination,
        });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
