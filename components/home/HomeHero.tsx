"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Home.module.css";

type HomeHeroProps = {
  latestPatternUrl: string;
  latestPatternName: string;
};

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

export default function HomeHero({
  latestPatternUrl,
  latestPatternName,
}: HomeHeroProps) {
  const reducedMotion = useReducedMotion();
  const external = /^https?:\/\//i.test(latestPatternUrl);

  return (
    <header className={styles.hero}>
      <Stagger delay={0} reducedMotion={reducedMotion}>
        <p className={`${styles.kicker} mono`}>TECHNICAL TRUST</p>
      </Stagger>

      <Stagger delay={0.08} reducedMotion={reducedMotion}>
        <h1 className={styles.headline}>
          Trust is the scarcest resource in technology. This is a discipline for
          earning it.
        </h1>
      </Stagger>

      <Stagger delay={0.16} reducedMotion={reducedMotion}>
        <div className={styles.standfirst}>
          <p>
            For the people who sit between complex systems and the humans betting
            on them — sales engineers, solutions architects, advocates, support.
          </p>
          <p>
            Anyone whose job is turning complexity into confident decisions.
          </p>
          <p>
            And if you&apos;re the one making the decision: this map shows you
            exactly what to watch for.
          </p>
        </div>
      </Stagger>

      <Stagger delay={0.24} reducedMotion={reducedMotion} className={styles.ctas}>
        <Link href="/framework" className={styles.ctaPrimary}>
          Explore the framework →
        </Link>
        <a
          href={latestPatternUrl}
          className={styles.ctaSecondary}
          aria-label={`Read the latest Pattern, ${latestPatternName}`}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          Read the latest Pattern →
        </a>
      </Stagger>
    </header>
  );
}
