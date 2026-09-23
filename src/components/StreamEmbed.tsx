import styles from "./StreamEmbed.module.css";

type StreamEmbedProps = {
  platform: "YouTube" | "Rumble" | "X";
  embedUrl?: string;
  comingSoon?: boolean;
};

export function StreamEmbed({ platform, embedUrl, comingSoon }: StreamEmbedProps) {
  if (comingSoon || !embedUrl) {
    return (
      <div className={styles.slot} data-platform={platform.toLowerCase()}>
        <div className={styles.soon}>
          <p className={styles.soonLabel}>{platform}</p>
          <p className={styles.soonTitle}>Coming soon</p>
          <p className={styles.soonCopy}>
            Live embed will appear here once the stream ID is configured.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.slot}>
      <iframe
        className={styles.frame}
        src={embedUrl}
        title={`${platform} live stream`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
