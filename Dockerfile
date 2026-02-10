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
RUN pnpm build

# Stage 3: Production runner
FROM node:20-slim AS runner
RUN apt-get update -y && apt-get install -y openssl libssl3 && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs &&     adduser --system --uid 1001 nextjs

RUN npm install -g pnpm

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/middleware.ts ./

# Generate Prisma client in production stage
RUN npx prisma generate

RUN chown -R nextjs:nodejs .next

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD pnpm start
