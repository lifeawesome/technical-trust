import Image from "next/image";
import Link from "next/link";
import type { EssayMeta } from "@/lib/essays";
import { formatEssayDate } from "@/lib/essays";
import styles from "./EssayArticle.module.css";

type EssayHeaderProps = {
  meta: EssayMeta;
};

export default function EssayHeader({ meta }: EssayHeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/essays" className={`${styles.back} mono`}>
        ← Essays
      </Link>
      <div className={styles.meta}>
        <time className={styles.date} dateTime={meta.publishedAt}>
          {formatEssayDate(meta.publishedAt)}
        </time>
        {meta.series ? (
          <span className={`${styles.series} mono`}>{meta.series}</span>
        ) : null}
      </div>
      <h1 className={styles.title}>{meta.title}</h1>
      <p className={styles.description}>{meta.description}</p>
      {meta.tags?.length ? (
        <div className={styles.tags}>
          {meta.tags.map((tag) => (
            <span key={tag} className={`${styles.tag} mono`}>
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {meta.featuredImage ? (
        <figure className={styles.featured}>
          <Image
            src={meta.featuredImage}
            alt={meta.featuredImageAlt ?? ""}
            width={1408}
            height={768}
            className={styles.featuredImage}
            priority
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </figure>
      ) : null}
    </header>
  );
}
