import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { SITE } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms",
  description: `Terms of use for ${SITE.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell>
      <main className={styles.page}>
        <article className={styles.article}>
          <h1 className={styles.title}>Terms</h1>
          <p className={styles.updated}>Last updated: September 23, 2026</p>
          <p>
            By using {SITE.name} ({SITE.domain}), you agree to these short terms. The site is
            provided by {SITE.legalEntity} as a home for a live stream.
          </p>
          <h2>The service</h2>
          <p>
            Streams may go offline for weather, power, maintenance, or platform issues. We do
            not guarantee uninterrupted availability. Live video may be restreamed to third-party
            platforms (X, Rumble, YouTube); their terms apply when you watch there.
          </p>
          <h2>Acceptable use</h2>
          <p>
            Do not misuse the site or related streams in ways that are unlawful, abusive, or
            that interfere with others&apos; enjoyment of the feed.
          </p>
          <h2>Disclaimer</h2>
          <p>
            The site and stream are provided &quot;as is&quot; without warranties of any kind.
            {SITE.name} is not a betting, gambling, or financial service.
          </p>
          <h2>Contact</h2>
          <p>
            Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </article>
      </main>
    </LegalShell>
  );
}
