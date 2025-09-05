# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm run build

# Stage 2: Production
FROM node:22-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/out ./out
RUN npm install -g pnpm && pnpm install --prod
EXPOSE 3000
CMD ["node", "out/index.js"]
