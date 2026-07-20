"use client";

import Link from "next/link";
import { useState } from "react";
import FrameworkMap from "@/components/FrameworkMap";
import FrameworkToggle from "@/components/FrameworkToggle";
import {
  frameworkIntro,
  frameworkVersion,
  type FrameworkView,
} from "@/lib/framework";
import styles from "./Home.module.css";

const flipHook = frameworkIntro[frameworkIntro.length - 1];

export default function HomeFrameworkEmbed() {
  const [view, setView] = useState<FrameworkView>("patterns");

  return (
    <section className={styles.mapSection} aria-label="Trust framework map">
      <div className={styles.flipHook}>
        <p className={styles.flipHookLine}>{flipHook}</p>
        <p className={styles.flipCue}>Flip it.</p>
      </div>

      <div className={styles.toggleWrap}>
        <FrameworkToggle view={view} onChange={setView} />
      </div>

      <FrameworkMap view={view} variant="compact" />

      <div className={styles.mapMeta}>
        <span className={`${styles.versionBadge} mono`}>{frameworkVersion}</span>
        <Link href="/framework" className={styles.mapLink}>
          See the full map, the unwritten Patterns, and how it&apos;s changed →
        </Link>
      </div>
    </section>
  );
}
