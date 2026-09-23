import { CreekAtmosphere } from "@/components/CreekAtmosphere";
import { SITE } from "@/lib/site";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <CreekAtmosphere />
      <div className={styles.veil} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Always near the water</p>
        <h1 id="hero-brand" className={styles.brand}>
          {SITE.name}
        </h1>
        <p className={styles.tagline}>{SITE.tagline}</p>
        <p className={styles.support}>
          One backyard creek, streaming live to X, Rumble, and YouTube — weather,
          wildlife, and the quiet in between.
        </p>
        <div className={styles.ctas}>
          <a className={styles.primary} href="#watch">
            Watch live
          </a>
          <a
            className={styles.secondary}
            href={SITE.socials.x}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open on X
          </a>
        </div>
      </div>
    </section>
  );
}
