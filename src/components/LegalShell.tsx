import Link from "next/link";
import { SITE } from "@/lib/site";
import styles from "./LegalShell.module.css";

export function LegalShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link href="/" className={styles.home}>
          {SITE.name}
        </Link>
        <nav className={styles.nav} aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
