# syntax=docker/dockerfile:1

FROM node:22.23.5-alpine@sha256:286344ef340c151df65af44a8c8cf2996c1783073d49b88fabcf90a56ea82023 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22.23.5-alpine@sha256:286344ef340c151df65af44a8c8cf2996c1783073d49b88fabcf90a56ea82023 AS builder
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

FROM node:22.23.5-alpine@sha256:286344ef340c151df65af44a8c8cf2996c1783073d49b88fabcf90a56ea82023 AS runner
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
