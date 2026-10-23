# syntax=docker/dockerfile:1

FROM node:22.23.4-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22.23.4-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public NEXT_PUBLIC_* values are baked at build time.
ARG NEXT_PUBLIC_SITE_URL=https://creekstream.live
ARG NEXT_PUBLIC_X_EMBED_URL=
ARG NEXT_PUBLIC_YOUTUBE_LIVE_ID=
ARG NEXT_PUBLIC_RUMBLE_EMBED_ID=
ARG NEXT_PUBLIC_GSC_VERIFICATION=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_X_EMBED_URL=$NEXT_PUBLIC_X_EMBED_URL \
    NEXT_PUBLIC_YOUTUBE_LIVE_ID=$NEXT_PUBLIC_YOUTUBE_LIVE_ID \
    NEXT_PUBLIC_RUMBLE_EMBED_ID=$NEXT_PUBLIC_RUMBLE_EMBED_ID \
    NEXT_PUBLIC_GSC_VERIFICATION=$NEXT_PUBLIC_GSC_VERIFICATION \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:22.23.4-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
