import styles from "./CreekAtmosphere.module.css";

/** Decorative SVG/CSS creek atmosphere — no stock photos. */
export function CreekAtmosphere() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.sky} />
      <div className={styles.haze} />
      <svg className={styles.banks} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="bankFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#134038" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#071a18" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="waterFill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a4f46" />
            <stop offset="45%" stopColor="#2a6b5e" />
            <stop offset="100%" stopColor="#1e5a50" />
          </linearGradient>
        </defs>
        <path
          fill="url(#bankFill)"
          d="M0 520 C180 470 280 560 420 510 C560 460 640 540 780 500 C920 460 1040 540 1180 490 C1280 460 1360 500 1440 470 L1440 900 L0 900 Z"
        />
        <path
          className={styles.water}
          fill="url(#waterFill)"
          d="M0 620 C220 580 340 660 520 610 C700 560 820 650 1000 600 C1160 560 1300 620 1440 590 L1440 900 L0 900 Z"
        />
        <path
          className={styles.ripple}
          fill="none"
          stroke="#9ecfc4"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          d="M80 700 C260 675 400 740 580 700 C760 660 900 730 1080 695 C1220 670 1340 710 1420 690"
        />
        <path
          className={styles.rippleDelay}
          fill="none"
          stroke="#9ecfc4"
          strokeOpacity="0.14"
          strokeWidth="1"
          d="M40 760 C240 730 380 800 560 755 C740 710 900 790 1100 745 C1240 715 1340 760 1440 740"
        />
      </svg>
      <div className={styles.glow} />
      <div className={styles.sparkle} />
    </div>
  );
}
