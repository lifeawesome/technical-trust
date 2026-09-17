import type { Metadata } from "next";
import { lab, getPublishedLabProjects, LAB_KIND_LABEL } from "@/lib/lab";
import styles from "@/components/branches/Branch.module.css";

export const metadata: Metadata = {
  title: lab.metadataTitle,
  description: lab.metadataDescription,
};

export default function LabPage() {
  const projects = getPublishedLabProjects();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className="eyebrow mono">{lab.kicker}</p>
        <h1 className={styles.headline}>{lab.headline}</h1>
        <p className={styles.lede}>{lab.description}</p>
      </header>

      <section className={styles.section} aria-labelledby="anatomy-heading">
        <h2 id="anatomy-heading" className={styles.sectionHeading}>
          {lab.anatomyHeading}
        </h2>
        <ul className={styles.list}>
          {lab.anatomy.map((item) => (
            <li key={item} className={styles.listItem}>
              {item}
            </li>
          ))}
        </ul>
        <p className={styles.note}>{lab.kindNote}</p>
      </section>

      <section className={styles.section} aria-labelledby="planned-heading">
        <h2 id="planned-heading" className={styles.sectionHeading}>
          {lab.plannedHeading}
        </h2>
        <ul className={styles.list}>
          {lab.planned.map((item) => (
            <li key={item.domain} className={styles.listItem}>
              <strong>{item.domain}</strong>
              {item.note}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="projects-heading">
        <h2 id="projects-heading" className={styles.sectionHeading}>
          Published projects
        </h2>
        {projects.length > 0 ? (
          <ul className={styles.list}>
            {projects.map((project) => (
              <li key={project.slug} id={project.slug} className={styles.listItem}>
                <strong>{project.name}</strong>
                {LAB_KIND_LABEL[project.kind]}. {project.problem}
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>{lab.empty.heading}</p>
            <p className={styles.emptyText}>{lab.empty.body}</p>
          </div>
        )}
      </section>
    </div>
  );
}
