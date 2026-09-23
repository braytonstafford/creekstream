# Creekstream

Minimal full-viewport live stream page. The site is the player — black chrome, social links only.

- **Site (canonical):** https://creekstream.live  
- **Contact:** info@creekstream.live  

Also registered (Ops will 301 these to the apex later — not handled in this app): `creekstream.stream`, `creekstream.online`. Site copy and SEO only use **creekstream.live**.

## Stack

- Next.js 15 (App Router) + TypeScript  
- Production Docker image (`output: "standalone"`) for k3s  

## Local development

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Environment variables

All are optional except that `NEXT_PUBLIC_SITE_URL` should stay on the apex in production. With no embed vars set, the page is a black screen plus social links — never broken iframes and never invented stream IDs.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (default `https://creekstream.live`) |
| `NEXT_PUBLIC_X_EMBED_URL` | Full X embed iframe URL (preferred player) |
| `NEXT_PUBLIC_YOUTUBE_LIVE_ID` | Optional YouTube live/video ID fallback |
| `NEXT_PUBLIC_RUMBLE_EMBED_ID` | Optional Rumble embed ID fallback |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console meta verification token |

Because these use the `NEXT_PUBLIC_` prefix, they are inlined at **build** time. Rebuild the image (or re-run `npm run build`) after changing them.

Do not put Frigate or other LAN URLs in `NEXT_PUBLIC_*` — they would ship in the client bundle.

## Docker

Build:

```bash
docker build -t creekstream:latest .
```

With an X embed (example — use a real URL when you have one):

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://creekstream.live \
  --build-arg NEXT_PUBLIC_X_EMBED_URL= \
  -t creekstream:latest .
```

Run:

```bash
docker run --rm -p 3000:3000 creekstream:latest
```

The container listens on port **3000**. Point your k3s Service / Ingress at that port and host `creekstream.live`. Alternate hosts (`creekstream.stream`, `creekstream.online`) should 301 to `https://creekstream.live` at the Ingress / DNS layer.

## Socials

Primary platform is **X** (`@creekstreamlive`).

- X (primary): https://x.com/creekstreamlive  
- Rumble: https://rumble.com/c/creekstream  
- YouTube: https://www.youtube.com/@creekstreamlive  

## Out of scope (v1)

Encoder / RTSP / OBS / Frigate pipeline, auth, inventing live video IDs, and alternate-domain redirects (Ops / Ingress) are intentionally not part of this site.
