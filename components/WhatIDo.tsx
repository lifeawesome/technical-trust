import styles from "./WhatIDo.module.css";
import Reveal from "./Reveal";
import { pillars } from "@/lib/data";

export default function WhatIDo() {
  return (
    <Reveal>
      <section data-screen-label="What I Do" className={styles.section}>
        <div className="section-intro" data-reveal-intro>
          <div className="eyebrow mono">WHAT I DO</div>
          <h2 className="section-heading">Three things I bring to every room</h2>
        </div>
        <div className={styles.grid}>
          {pillars.map((pillar) => (
            <div key={pillar.mark} className={styles.card} data-reveal-child>
              <div className={`${styles.mark} mono`}>{pillar.mark}</div>
              <h3 className={styles.title}>{pillar.title}</h3>
              <p className={styles.body}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
