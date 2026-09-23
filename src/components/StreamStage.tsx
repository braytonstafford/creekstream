import Link from "next/link";
import { getActiveEmbed } from "@/lib/env";
import { SITE } from "@/lib/site";
import styles from "./StreamStage.module.css";

const socials = [
  { key: "x", label: "X", href: SITE.socials.x },
  { key: "rumble", label: "Rumble", href: SITE.socials.rumble },
  { key: "youtube", label: "YouTube", href: SITE.socials.youtube },
] as const;

export function StreamStage() {
  const active = getActiveEmbed();

  return (
    <div className={styles.stage}>
      <h1 className="sr-only">{SITE.name}</h1>

      {active ? (
        <iframe
          className={styles.frame}
          src={active.embedUrl}
          title={`${SITE.name} live`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <div className={styles.empty} aria-hidden="true" />
      )}

      <nav className={styles.bar} aria-label="Social and legal">
        <div className={styles.socials}>
          {socials.map((item) => (
            <a
              key={item.key}
              className={styles.social}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className={styles.legal}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </nav>
    </div>
  );
}
