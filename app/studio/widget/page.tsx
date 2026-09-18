import type { Metadata } from "next";
import {
  studioWidgetCardSvg,
  studioWidgetEmailHtml,
  studioWidgetLinkedInCaption,
} from "@/lib/studio-widget";
import { KIT_SNIPPET_STUDIO_WIDGET_KEY } from "@/lib/kit-naming";
import { studio } from "@/lib/studio";
import styles from "@/components/studio/StudioWidgetPreview.module.css";

export const metadata: Metadata = {
  title: "Demo Sprint widget",
  description: "Email and LinkedIn insert for the Technical Trust Demo Sprint.",
  robots: { index: false, follow: false },
};

export default function StudioWidgetPreviewPage() {
  const emailHtml = studioWidgetEmailHtml();
  const cardSvg = studioWidgetCardSvg();
  const caption = studioWidgetLinkedInCaption();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <p className={`${styles.kicker} eyebrow mono`}>{studio.kicker}</p>
        <h1 className={styles.headline}>Demo Sprint widget</h1>
        <p className={styles.lede}>
          One offer card, two channels. Kit gets the HTML snippet. LinkedIn
          gets the image and the caption.
        </p>
      </header>

      <div className={styles.grid}>
        <section className={styles.panel} aria-labelledby="kit-heading">
          <h2 id="kit-heading" className={styles.panelHeading}>
            Kit email
          </h2>
          <p className={styles.panelNote}>
            Drop{" "}
            <code className={styles.code}>
              {`{{ snippet.${KIT_SNIPPET_STUDIO_WIDGET_KEY} }}`}
            </code>{" "}
            into a broadcast, or paste the HTML block.
          </p>
          <div
            className={styles.emailMock}
            dangerouslySetInnerHTML={{ __html: emailHtml }}
          />
        </section>

        <section className={styles.panel} aria-labelledby="linkedin-heading">
          <h2 id="linkedin-heading" className={styles.panelHeading}>
            LinkedIn newsletter
          </h2>
          <p className={styles.panelNote}>
            Upload{" "}
            <a href="/studio/demo-sprint-card.png">demo-sprint-card.png</a>
            , then paste the caption under it.
          </p>
          <div
            className={styles.cardImage}
            dangerouslySetInnerHTML={{ __html: cardSvg }}
          />
        </section>
      </div>

      <section className={styles.full} aria-labelledby="caption-heading">
        <h2 id="caption-heading" className={styles.panelHeading}>
          LinkedIn caption
        </h2>
        <pre className={styles.caption}>{caption}</pre>
      </section>
    </div>
  );
}
