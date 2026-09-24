import Image from "next/image";
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
          <Image
            src="/brand/logo-stone-128.png"
            alt=""
            width={28}
            height={28}
            className={styles.mark}
            priority
          />
          <span>{SITE.name}</span>
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
