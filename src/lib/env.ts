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

/** Public embed IDs — empty means show "coming soon", never invent IDs. */
export function getEmbedConfig() {
  return {
    youtubeLiveId: (process.env.NEXT_PUBLIC_YOUTUBE_LIVE_ID ?? "").trim(),
    rumbleEmbedId: (process.env.NEXT_PUBLIC_RUMBLE_EMBED_ID ?? "").trim(),
    xEmbedUrl: (process.env.NEXT_PUBLIC_X_EMBED_URL ?? "").trim(),
  };
}

export function getGscVerification(): string | undefined {
  const value = (process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "").trim();
  return value || undefined;
}
