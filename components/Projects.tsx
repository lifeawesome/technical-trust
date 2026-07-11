import styles from "./Projects.module.css";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <Reveal>
      <section id="work" data-screen-label="Featured Projects" className={styles.section}>
        <div className="section-intro" data-reveal-intro>
          <div className="eyebrow mono">FEATURED PROJECTS</div>
          <h2 className="section-heading">Things I&apos;ve built to prove the point</h2>
        </div>
        <div className={styles.grid}>
          {projects.map((proj, index) => (
            <div key={proj.name} className={styles.card} data-reveal-child>
              <div className={styles.header}>
                <span className={`${styles.index} mono`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={`${styles.lead} mono`}>{proj.stack[0]}</span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>{proj.name}</h3>
                <p className={styles.proves}>{proj.proves}</p>
                <p className={styles.desc}>{proj.desc}</p>
                <div className={styles.stack}>
                  {proj.stack.map((tag) => (
                    <span key={tag} className={`${styles.tag} mono`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
