import Image from "next/image";
import Link from "next/link";
import type { EssayMeta } from "@/lib/essays";
import { formatEssayDate } from "@/lib/essays";
import styles from "./EssayArticle.module.css";

type EssayHeaderProps = {
  meta: EssayMeta;
};

function isSvgSrc(src: string) {
  return /\.svg(?:$|\?)/i.test(src);
}

export default function EssayHeader({ meta }: EssayHeaderProps) {
  const featured = meta.featuredImage;
  const featuredAlt =
    meta.featuredImageAlt ??
    (featured ? meta.title : undefined);

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
      {featured ? (
        <figure className={styles.featured}>
          {isSvgSrc(featured) ? (
            // <object> preserves SVG CSS animations; next/image would flatten to <img>.
            <object
              data={featured}
              type="image/svg+xml"
              className={styles.featuredSvg}
              aria-label={featuredAlt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured}
                alt={featuredAlt ?? ""}
                className={styles.featuredImage}
              />
            </object>
          ) : (
            <Image
              src={featured}
              alt={featuredAlt ?? ""}
              width={meta.featuredImageWidth ?? 1408}
              height={meta.featuredImageHeight ?? 768}
              className={styles.featuredImage}
              priority
              sizes="(max-width: 768px) 100vw, 720px"
            />
          )}
        </figure>
      ) : null}
    </header>
  );
}
