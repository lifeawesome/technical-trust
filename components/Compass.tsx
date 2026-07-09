import styles from "./Compass.module.css";
import Reveal from "./Reveal";
import { quadrants } from "@/lib/data";

export default function Compass() {
  return (
    <Reveal>
      <section data-screen-label="Four Ways I Plug In" className={styles.section}>
        <div className={styles.inner}>
          <div className={`section-intro ${styles.intro}`} data-reveal-intro>
            <div className="eyebrow mono">HOW I PLUG IN</div>
            <h2 className="section-heading" style={{ marginBottom: 14 }}>
              Four ways I plug in
            </h2>
            <p className={styles.subtitle}>Same core skillset, different seat at the table.</p>
          </div>

          <div className={styles.gridWrap}>
            <Reveal stagger={0.12}>
              <div className={styles.grid}>
                <div className={styles.center} data-reveal-child>
                  DAN
                </div>
                {quadrants.map((q) => (
                  <div key={q.tag} className={styles.quadrant} data-reveal-child>
                    <div className={`${styles.quadrantTag} mono`}>{q.tag}</div>
                    <h3 className={styles.quadrantTitle}>{q.title}</h3>
                    <p className={styles.quadrantBody}>{q.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className={styles.listWrap}>
            <Reveal stagger={0.12}>
              <div className={styles.list}>
                <div className={styles.listHead}>
                  <div className={styles.listBadge}>DAN</div>
                  <div className={styles.listRule} />
                </div>
                <div className={styles.listItems}>
                  {quadrants.map((q) => (
                    <div key={q.tag} className={styles.listCard} data-reveal-child>
                      <div className={`${styles.quadrantTag} mono`}>{q.tag}</div>
                      <h3 className={styles.quadrantTitle}>{q.title}</h3>
                      <p className={styles.quadrantBody}>{q.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
