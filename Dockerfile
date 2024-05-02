# Install dependencies only when needed
FROM node:20-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

# TypeScript compile
RUN npm run build

# Rebuild the source code only when needed
FROM node:20-alpine AS runner

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/dist ./dist

RUN mkdir -p /app/logs && chown -R node:node /app/logs

USER node

EXPOSE 3000

CMD ["node", "dist/start-server.js" ]