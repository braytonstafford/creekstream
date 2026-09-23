import { getSiteUrl } from "@/lib/env";

export const SITE = {
  name: "Creekstream",
  /** Always the apex canonical — https://creekstream.live */
  domain: getSiteUrl(),
  email: "info@creekstream.live",
  legalEntity: "Health Intellect LLC",
  description: "Creekstream — live stream on X, Rumble, and YouTube.",
  socials: {
    x: "https://x.com/creekstreamlive",
    rumble: "https://rumble.com/c/creekstream",
    youtube: "https://www.youtube.com/@creekstreamlive",
  },
} as const;
