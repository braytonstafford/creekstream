import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE } from "@/lib/site";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description: `Privacy policy for ${SITE.name}.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className={styles.page}>
        <article className={styles.article}>
          <h1 className={styles.title}>Privacy</h1>
          <p className={styles.updated}>Last updated: September 23, 2026</p>
          <p>
            {SITE.name} ({SITE.domain}) is a simple marketing and watch page for a backyard
            creek live camera operated by {SITE.legalEntity}.
          </p>
          <h2>What we collect</h2>
          <p>
            This site does not require accounts and does not intentionally collect personal
            profiles. Like most websites, standard server or hosting logs may record technical
            data such as IP address, browser type, and pages requested for security and
            reliability.
          </p>
          <h2>Third-party platforms</h2>
          <p>
            Links and optional embeds may load content from X, Rumble, or YouTube. Those
            services have their own privacy practices when you visit or interact with them.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about privacy:{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </p>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
