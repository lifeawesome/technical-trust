"use client";

import { useCallback, useEffect, useState } from "react";
import FrameworkMap from "@/components/FrameworkMap";
import FrameworkToggle from "@/components/FrameworkToggle";
import {
  frameworkViewHref,
  parseFrameworkView,
  type FrameworkView,
} from "@/lib/framework";
import styles from "@/app/framework/Framework.module.css";

type FrameworkExplorerProps = {
  initialView: FrameworkView;
};

export default function FrameworkExplorer({
  initialView,
}: FrameworkExplorerProps) {
  const [view, setView] = useState<FrameworkView>(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      setView(parseFrameworkView(params.get("view")));
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const onChange = useCallback((next: FrameworkView) => {
    setView(next);
    window.history.replaceState(null, "", frameworkViewHref(next));
  }, []);

  return (
    <>
      <p className={styles.flipCue}>Flip it.</p>
      <div className={styles.toggleWrap}>
        <FrameworkToggle view={view} onChange={onChange} />
      </div>

      <section className={styles.mapSection} aria-label="Trust framework map">
        <FrameworkMap view={view} />
      </section>

      <section className={styles.legend} aria-label="Map legend">
        {view === "patterns" ? (
          <ul className={styles.legendList}>
            <li className={styles.legendItem}>
              <span
                className={`${styles.swatch} ${styles.swatchPattern}`}
                aria-hidden="true"
              />
              <span>
                <span className={`${styles.legendLabel} mono`}>Pattern</span>
                {" — "}published
              </span>
            </li>
            <li className={styles.legendItem}>
              <span
                className={`${styles.swatch} ${styles.swatchFieldGuide}`}
                aria-hidden="true"
              />
              <span>
                <span className={`${styles.legendLabel} mono`}>Field Guide</span>
                {" — "}outlined
              </span>
            </li>
            <li className={styles.legendItem}>
              <span
                className={`${styles.swatch} ${styles.swatchOpen}`}
                aria-hidden="true"
              />
              <span>
                <span className={`${styles.legendLabel} mono`}>Dashed</span>
                {" — "}unwritten
              </span>
            </li>
          </ul>
        ) : (
          <p className={styles.practicesLegend}>
            <span className={`${styles.legendLabel} mono`}>Amber</span>
            {" = Field Guide published · "}
            <span className={`${styles.legendLabel} mono`}>Gold dashed</span>
            {" = named in its Pattern · "}
            <span className={`${styles.legendLabel} mono`}>Ghost</span>
            {" = not yet written."}
          </p>
        )}
      </section>
    </>
  );
}
