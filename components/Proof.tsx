import styles from "./Proof.module.css";
import Reveal from "./Reveal";
import { timeline } from "@/lib/data";

export default function Proof() {
  return (
    <Reveal>
      <section id="proof" data-screen-label="Proof" className={styles.section}>
        <div className="section-intro" data-reveal-intro>
          <div className="eyebrow mono">PROOF</div>
          <h2 className="section-heading">Where this has played out</h2>
        </div>
        <div className={styles.rail}>
          <div className={styles.line} />
          {timeline.map((item) => (
            <div key={item.org} className={styles.item} data-reveal-child>
              <div className={styles.dot} />
              <div className={`${styles.period} mono`}>{item.period}</div>
              <h3 className={styles.org}>{item.org}</h3>
              <div className={styles.role}>{item.role}</div>
              <p className={styles.detail}>{item.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
