import { getSiteUrl } from "@/lib/env";

export const SITE = {
  name: "Creekstream",
  /** Always the apex canonical — https://creekstream.live */
  domain: getSiteUrl(),
  email: "info@creekstream.live",
  legalEntity: "Health Intellect LLC",
  tagline: "A quiet backyard creek, live.",
  description:
    "Creekstream is a near-always-on live camera pointed at a real backyard creek — restreamed to X, Rumble, and YouTube. Calm water, bird song, and the weather as it happens.",
  socials: {
    x: "https://x.com/creekstreamlive",
    youtube: "https://www.youtube.com/@creekstreamlive",
    rumble: "https://rumble.com/c/creekstream",
  },
} as const;
