import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.inner}>
        <h2 id="about-heading" className={styles.title}>
          About the creek
        </h2>
        <p className={styles.copy}>
          Creekstream is a simple live view of a real backyard creek, captured on an Aqara
          G100 camera and restreamed to X, Rumble, and YouTube. No betting. No crypto. No
          accounts — just water moving through the day and night so you can drop in whenever
          you need a quieter window.
        </p>
      </div>
    </section>
  );
}
