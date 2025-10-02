# 1) Build stage (use if you had a build step; still useful for caching npm ci)
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# 2) Production image
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["node", "src/app.js"]
