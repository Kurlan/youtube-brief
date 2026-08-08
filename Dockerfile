FROM node:22-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

ENV PORT=8080
ENV HOST=0.0.0.0
ENV DB_PATH=/data/youtube-brief.sqlite
EXPOSE 8080

CMD ["node", "server/index.js"]
