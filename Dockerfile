# multi-stage build as deps
FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app
COPY package.json postcss.config.js tailwind.config.ts tsconfig.json .env
RUN yarn --prefer-offline --frozen-lockfile
RUN yarn add sharp

# multi-stage build as builder
FROM node:18-alpine AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN ls -a

# 빌드
RUN yarn build

# final stage
FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json /app/postcss.config.js /app/tailwind.config.ts /app/tsconfig.json /app/.env

# 복사 경로 수정
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
