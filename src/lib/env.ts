const DEFAULT_SITE_URL = "https://creekstream.live";

/** Canonical public site URL. Prefer NEXT_PUBLIC_SITE_URL; always default to creekstream.live. */
export function getSiteUrl(): string {
  const raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "");
  if (!raw) return DEFAULT_SITE_URL;
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return DEFAULT_SITE_URL;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export type ActiveEmbed =
  | { platform: "X"; embedUrl: string }
  | { platform: "YouTube"; embedUrl: string }
  | { platform: "Rumble"; embedUrl: string }
  | null;

/**
 * Public embed config only. Never invent IDs.
 * Prefer X; optional YouTube / Rumble as fallbacks when X is unset.
 * Do not put Frigate/LAN URLs in NEXT_PUBLIC_* — they ship in the client bundle.
 */
export function getEmbedConfig() {
  return {
    xEmbedUrl: (process.env.NEXT_PUBLIC_X_EMBED_URL ?? "").trim(),
    youtubeLiveId: (process.env.NEXT_PUBLIC_YOUTUBE_LIVE_ID ?? "").trim(),
    rumbleEmbedId: (process.env.NEXT_PUBLIC_RUMBLE_EMBED_ID ?? "").trim(),
  };
}

/** Resolve the single full-page player source. X wins when set. */
export function getActiveEmbed(): ActiveEmbed {
  const embeds = getEmbedConfig();

  if (embeds.xEmbedUrl) {
    return { platform: "X", embedUrl: embeds.xEmbedUrl };
  }

  if (embeds.youtubeLiveId) {
    return {
      platform: "YouTube",
      embedUrl: `https://www.youtube.com/embed/${encodeURIComponent(embeds.youtubeLiveId)}?rel=0&autoplay=1`,
    };
  }

  if (embeds.rumbleEmbedId) {
    return {
      platform: "Rumble",
      embedUrl: `https://rumble.com/embed/${encodeURIComponent(embeds.rumbleEmbedId)}/`,
    };
  }

  return null;
}

export function getGscVerification(): string | undefined {
  const value = (process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "").trim();
  return value || undefined;
}
