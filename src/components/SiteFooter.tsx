import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <p className={styles.brand}>{SITE.name}</p>
          <p className={styles.meta}>
            © {year} {SITE.legalEntity}
          </p>
        </div>
        <div className={styles.links}>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SITE.socials.rumble} target="_blank" rel="noopener noreferrer">
            Rumble
          </a>
        </div>
      </div>
    </footer>
  );
}
