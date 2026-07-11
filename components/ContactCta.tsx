import Link from "next/link";
import styles from "./ContactCta.module.css";
import Reveal from "./Reveal";
import { CONTACT_EMAIL, RESUME_HREF } from "@/lib/data";

export default function ContactCta() {
  return (
    <>
      <Reveal>
        <section id="contact" data-screen-label="Contact" className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.heading}>
              Let&apos;s talk about technical trust, customer adoption, or systems that scale.
            </h2>
            <p className={styles.subtext}>
              Always open to a conversation — even if you&apos;re just kicking tires.
            </p>
            <div className={styles.actions}>
              <a href={`mailto:${CONTACT_EMAIL}`} className={styles.primary}>
                Contact Me
              </a>
              <a
                href={RESUME_HREF}
                className={styles.secondary}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
            </div>
            <p className={styles.manifestoLink}>
              <Link href="/manifesto">Read the Technical Trust Manifesto →</Link>
            </p>
          </div>
        </section>
      </Reveal>
      <div className={styles.footer}>Dan Davidson — Customer-Facing Engineer</div>
    </>
  );
}
