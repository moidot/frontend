# multi-stage build as deps
FROM node:18-alpine  AS deps

RUN apk add --no-cache libc6-compat

#dpes의 app 디렉토리에 package.json 복붙 
WORKDIR /app
COPY package.json ./
# yarn
RUN yarn --prefer-offline --frozen-lockfile
# 이미지 최적화
RUN yarn add sharp 
# multi-stage build as builder
FROM node:18-alpine  AS builder

# deps의 node_modules를 builder/app/node_modules로 복붙
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 현재 디렉토리 확인
RUN ls -a

# 빌드
RUN yarn prebuild && yarn build

FROM node:18-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# 사용자 그룹 nodejs 추가
# nodejs에 유저 nextjs 추가
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# builder에서 빌드했던 결과물 중 public, package.json 복붙
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# builder에서 빌드했던 결과물 중 static, standalone 복붙 소유자와 소유그룹도 변경
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# nextjs
USER nextjs

# 열어둘 포트 설정
EXPOSE 3000

# 이미지 안 환경변수 설정
ENV PORT 3000

CMD ["node", "server.js"]