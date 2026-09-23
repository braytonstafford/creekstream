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
