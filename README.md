# Creekstream

Single-page marketing / watch site for a backyard creek live camera restreamed to YouTube, Rumble, and X.

- **Site (canonical):** https://creekstream.live  
- **Contact:** info@creekstream.live  
- **Operator:** Health Intellect LLC  

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

All are optional except that `NEXT_PUBLIC_SITE_URL` should stay on the apex in production. Empty embed values show a calm “coming soon” panel — never broken iframes.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (default `https://creekstream.live`) |
| `NEXT_PUBLIC_YOUTUBE_LIVE_ID` | YouTube video/live ID for embed |
| `NEXT_PUBLIC_RUMBLE_EMBED_ID` | Rumble embed ID |
| `NEXT_PUBLIC_X_EMBED_URL` | Full X embed iframe URL when available |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console meta verification token |

Because these use the `NEXT_PUBLIC_` prefix, they are inlined at **build** time. Rebuild the image (or re-run `npm run build`) after changing them.

## Docker

Build:

```bash
docker build -t creekstream:latest .
```

With stream IDs (example):

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://creekstream.live \
  --build-arg NEXT_PUBLIC_YOUTUBE_LIVE_ID=your_id_here \
  -t creekstream:latest .
```

Run:

```bash
docker run --rm -p 3000:3000 creekstream:latest
```

The container listens on port **3000**. Point your k3s Service / Ingress at that port and host `creekstream.live`. Alternate hosts (`creekstream.stream`, `creekstream.online`) should 301 to `https://creekstream.live` at the Ingress / DNS layer.

## Socials

- X: https://x.com/creekstream  
- YouTube: https://www.youtube.com/@creekstreamlive  
- Rumble: https://rumble.com/c/creekstream  

## Out of scope (v1)

Encoder / RTSP / OBS pipeline, auth, inventing live video IDs, and alternate-domain redirects (Ops / Ingress) are intentionally not part of this site.
