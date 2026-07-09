import Image from "next/image";
import styles from "./Hero.module.css";
import BackgroundMesh from "./BackgroundMesh";
import HeroAnimations from "./HeroAnimations";
import { floatCards, keywords, RESUME_HREF } from "@/lib/data";

export default function Hero() {
  return (
    <section data-screen-label="Hero" data-hero className={styles.hero}>
      <HeroAnimations />
      <BackgroundMesh />

      <div className={styles.grid}>
        <div>
          <div className={styles.badge} data-hero-badge>
            <span className={styles.badgeDot} />
            Customer-Facing Engineer
          </div>
          <h1 className={styles.headline} data-hero-headline>
            I build <span data-hero-accent>technical trust.</span>
          </h1>
          <p className={styles.subhead} data-hero-subhead>
            I help teams understand complex systems, make confident decisions, and turn software
            into business outcomes.
          </p>
          <div className={styles.actions}>
            <a href={RESUME_HREF} className={styles.actionPrimary} data-hero-action>
              View Resume
            </a>
            <a href="#work" className={styles.actionSecondary} data-hero-action>
              See My Work
            </a>
            <a href="#contact" className={styles.actionText} data-hero-action>
              Contact Me &rarr;
            </a>
          </div>
          <div className={`${styles.keywords} mono`}>
            {keywords.map((kw, i) => (
              <span key={kw} data-hero-keyword>
                {kw}
                {i < keywords.length - 1 ? "  ·" : ""}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.portraitColumn}>
          <div className={styles.portraitFrame} data-hero-portrait>
            <Image src="/dan-headshot.png" alt="Dan Davidson" fill priority sizes="340px" />
            <div className={styles.portraitShade} />
          </div>

          {floatCards.map((card) => (
            <div
              key={card.label}
              className={styles.floatCard}
              data-hero-card
              style={card.position}
            >
              <span className={styles.floatCardIcon}>{card.icon}</span>
              <div>
                <div className={styles.floatCardLabel}>{card.label}</div>
                <div className={styles.floatCardSub}>{card.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
