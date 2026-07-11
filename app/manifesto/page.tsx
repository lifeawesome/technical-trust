import type { Metadata } from "next";
import ManifestoBody from "./ManifestoBody";
import styles from "./Manifesto.module.css";

const title = "The Technical Trust Manifesto — Technical Trust";
const description =
  "Why trust is the scarcest resource in technology — and the commitment behind Technical Trust.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function ManifestoPage() {
  return (
    <div className={styles.frame}>
      <article className={styles.block}>
        <header className={styles.header}>
          <div className={`${styles.eyebrow} eyebrow mono`}>MANIFESTO</div>
          <h1 className={styles.title}>The Technical Trust Manifesto</h1>
          <hr className={styles.rule} />
        </header>

        <ManifestoBody />
      </article>
    </div>
  );
}
