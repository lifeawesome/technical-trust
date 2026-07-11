"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { manifestoGroups, type ManifestoStanza } from "./content";
import styles from "./Manifesto.module.css";

function Stanza({
  lines,
  isFirstInGroup,
}: {
  lines: ManifestoStanza;
  isFirstInGroup: boolean;
}) {
  const reducedMotion = useReducedMotion();

  const body = (
    <div className={isFirstInGroup ? undefined : styles.stanza}>
      {lines.map((line) => (
        <p
          key={line.text}
          className={line.emphasized ? styles.lineEmphasized : styles.line}
        >
          {line.text}
        </p>
      ))}
    </div>
  );

  if (reducedMotion) return body;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {body}
    </motion.div>
  );
}

export default function ManifestoBody() {
  return (
    <>
      <section className={styles.body} aria-label="The Technical Trust Manifesto">
        {manifestoGroups.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={groupIndex > 0 ? styles.group : undefined}
          >
            {group.map((lines, stanzaIndex) => (
              <Stanza
                key={stanzaIndex}
                lines={lines}
                isFirstInGroup={stanzaIndex === 0}
              />
            ))}
          </div>
        ))}
      </section>

      <div className={styles.closing}>
        <p className={styles.signature}>— Dan Davidson</p>
        <p className={styles.brand}>Technical Trust</p>

        <Link href="/#subscribe" className={styles.cta}>
          Read Technical Trust Weekly →
        </Link>
      </div>
    </>
  );
}
