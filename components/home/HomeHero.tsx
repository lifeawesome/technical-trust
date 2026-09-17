"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { trackCtaClick } from "@/lib/analytics";
import { home } from "@/lib/branches";
import styles from "@/components/home/Home.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

function Stagger({
  children,
  delay,
  reducedMotion,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  reducedMotion: boolean | null;
  className?: string;
}) {
  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeHero() {
  const reducedMotion = useReducedMotion();

  return (
    <header className={styles.hero}>
      <Stagger
        delay={0}
        reducedMotion={reducedMotion}
        className={styles.heroKicker}
      >
        <p className={`${styles.kicker} mono`}>{home.hero.kicker}</p>
      </Stagger>

      <Stagger
        delay={0.08}
        reducedMotion={reducedMotion}
        className={styles.heroHeadline}
      >
        <h1 className={styles.headline}>{home.hero.headline}</h1>
      </Stagger>

      <Stagger
        delay={0.14}
        reducedMotion={reducedMotion}
        className={styles.heroStandfirst}
      >
        <p className={styles.supporting}>{home.hero.supporting}</p>
        <div className={styles.standfirst}>
          <p>{home.hero.practitioner}</p>
          <p>{home.hero.mirror}</p>
        </div>
      </Stagger>

      <Stagger
        delay={0.24}
        reducedMotion={reducedMotion}
        className={styles.ctas}
      >
        <Link
          href={home.hero.primaryCta.href}
          className={styles.ctaPrimary}
          onClick={() =>
            trackCtaClick({
              ctaId: "home_explore_lab",
              ctaText: home.hero.primaryCta.label,
              location: "homepage_hero",
              destination: home.hero.primaryCta.href,
            })
          }
        >
          {home.hero.primaryCta.label} →
        </Link>
        <Link
          href={home.hero.secondaryCta.href}
          className={styles.ctaSecondary}
          onClick={() =>
            trackCtaClick({
              ctaId: "home_work_with_studio",
              ctaText: home.hero.secondaryCta.label,
              location: "homepage_hero",
              destination: home.hero.secondaryCta.href,
            })
          }
        >
          {home.hero.secondaryCta.label} →
        </Link>
      </Stagger>
    </header>
  );
}
