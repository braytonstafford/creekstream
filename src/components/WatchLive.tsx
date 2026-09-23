import { StreamEmbed } from "@/components/StreamEmbed";
import { getEmbedConfig } from "@/lib/env";
import { SITE } from "@/lib/site";
import styles from "./WatchLive.module.css";

const platforms = [
  {
    key: "x" as const,
    name: "X",
    href: SITE.socials.x,
    blurb: "Primary live feed",
    primary: true,
  },
  {
    key: "youtube" as const,
    name: "YouTube",
    href: SITE.socials.youtube,
    blurb: "Alternate live channel",
    primary: false,
  },
  {
    key: "rumble" as const,
    name: "Rumble",
    href: SITE.socials.rumble,
    blurb: "Alternate live channel",
    primary: false,
  },
];

export function WatchLive() {
  const embeds = getEmbedConfig();

  const youtubeUrl = embeds.youtubeLiveId
    ? `https://www.youtube.com/embed/${encodeURIComponent(embeds.youtubeLiveId)}?rel=0`
    : undefined;
  const rumbleUrl = embeds.rumbleEmbedId
    ? `https://rumble.com/embed/${encodeURIComponent(embeds.rumbleEmbedId)}/`
    : undefined;
  const xUrl = embeds.xEmbedUrl || undefined;

  return (
    <section id="watch" className={styles.section} aria-labelledby="watch-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="watch-heading" className={styles.title}>
            Watch live
          </h2>
          <p className={styles.lead}>
            Start on X — or open YouTube or Rumble. On-page embeds appear once stream IDs
            are set.
          </p>
        </header>

        <div className={styles.platforms}>
          {platforms.map((platform) => (
            <a
              key={platform.key}
              className={
                platform.primary
                  ? `${styles.platform} ${styles.platformPrimary}`
                  : styles.platform
              }
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.platformName}>{platform.name}</span>
              <span className={styles.platformBlurb}>{platform.blurb}</span>
              <span className={styles.platformCta}>Open →</span>
            </a>
          ))}
        </div>

        <div className={styles.embeds}>
          <StreamEmbed platform="X" embedUrl={xUrl} comingSoon={!embeds.xEmbedUrl} />
          <div className={styles.embedRow}>
            <StreamEmbed
              platform="YouTube"
              embedUrl={youtubeUrl}
              comingSoon={!embeds.youtubeLiveId}
            />
            <StreamEmbed
              platform="Rumble"
              embedUrl={rumbleUrl}
              comingSoon={!embeds.rumbleEmbedId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
