import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Link className={styles.brand} href="/">
        <span className={styles.mark} aria-hidden="true" />
        {SITE.name}
      </Link>
      <nav className={styles.nav} aria-label="Primary">
        <Link href="/#watch">Watch</Link>
        <Link href="/#about">About</Link>
        <a href={SITE.socials.x} target="_blank" rel="noopener noreferrer">
          Live
        </a>
      </nav>
    </header>
  );
}
