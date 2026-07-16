"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { coordinateLabel } from "@/lib/framework";
import {
  formatEditionNumber,
  isExternalUrl,
  type Pattern,
} from "@/lib/patterns";
import styles from "./PatternCard.module.css";

type PatternCardProps = {
  pattern: Pattern;
  index: number;
  variant: "published" | "announced";
};

function useArrivalGlow(id: string, reducedMotion: boolean | null) {
  const [glow, setGlow] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    let timer: number | undefined;

    const check = () => {
      if (window.location.hash === `#${id}`) {
        setGlow(true);
        window.clearTimeout(timer);
        timer = window.setTimeout(() => setGlow(false), 1200);
      }
    };

    check();
    window.addEventListener("hashchange", check);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", check);
    };
  }, [id, reducedMotion]);

  return glow;
}

export default function PatternCard({
  pattern,
  index,
  variant,
}: PatternCardProps) {
  const reducedMotion = useReducedMotion();
  const glow = useArrivalGlow(pattern.id, reducedMotion);
  const coords = coordinateLabel(pattern.rowId, pattern.colId);

  const motionProps =
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" as const },
          transition: {
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1] as const,
            delay: index * 0.08,
          },
        };

  if (variant === "announced") {
    return (
      <motion.li
        id={pattern.id}
        className={`${styles.entry} ${styles.announced}${glow ? ` ${styles.glow}` : ""}`}
        {...motionProps}
      >
        <p className={`${styles.meta} mono`}>
          <span className={styles.comingTag}>COMING</span>
          <span className={styles.metaSep} aria-hidden="true">
            ·
          </span>
          <Link
            href="/framework"
            className={styles.coords}
            aria-label={`${coords} on the framework map`}
          >
            {coords}
          </Link>
        </p>
        <h3 className={styles.announcedName}>{pattern.name}</h3>
        {pattern.teaser ? (
          <p className={styles.teaser}>{pattern.teaser}</p>
        ) : null}
      </motion.li>
    );
  }

  const edition = pattern.editionNumber
    ? formatEditionNumber(pattern.editionNumber)
    : null;
  const readLabel = edition
    ? `Read ${pattern.name}, Pattern ${edition}`
    : `Read ${pattern.name}`;

  return (
    <motion.li
      id={pattern.id}
      className={`${styles.entry} ${styles.published}${glow ? ` ${styles.glow}` : ""}`}
      {...motionProps}
    >
      <p className={`${styles.meta} mono`}>
        {edition ? <span>PATTERN {edition}</span> : <span>PATTERN</span>}
        <span className={styles.metaSep} aria-hidden="true">
          ·
        </span>
        <Link
          href="/framework"
          className={styles.coords}
          aria-label={`${coords} on the framework map`}
        >
          {coords}
        </Link>
      </p>
      <h2 className={styles.name}>{pattern.name}</h2>
      <p className={styles.definition}>{pattern.definition}</p>
      <p className={styles.practiceLine}>
        Its Practice:{" "}
        <Link
          href="/framework?view=practices"
          className={styles.practiceLink}
          aria-label={`${pattern.practice.name}, the Practice for ${pattern.name}, on the framework map`}
        >
          {pattern.practice.name} →
        </Link>
      </p>
      {pattern.readUrl ? (
        <Link
          href={pattern.readUrl}
          className={styles.readLink}
          aria-label={readLabel}
          {...(isExternalUrl(pattern.readUrl)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          Read the Pattern →
        </Link>
      ) : null}
    </motion.li>
  );
}
