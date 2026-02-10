# Stage 1: Dependencies
FROM node:20-slim AS deps
RUN apt-get update -y && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
RUN pnpm install
COPY prisma ./prisma
RUN npx prisma generate

# Stage 2: Build
FROM node:20-slim AS builder
RUN apt-get update -y && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app
RUN npm install -g pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npx prisma generate
# Force rebuild with timestamp
RUN echo "BUILD_TIMESTAMP=$(date +%s)" > .buildinfo
RUN pnpm build

# Stage 3: Production runner
FROM node:20-slim AS runner
RUN apt-get update -y && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs &&     adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/.buildinfo ./.buildinfo

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
