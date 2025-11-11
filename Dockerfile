# ---------- ETAPA 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- ETAPA 2: Run ----------
FROM node:20-alpine

WORKDIR /app

# 👇 Copiamos dist + dependencias + dev tools (nest, ts-node, etc.)
COPY --from=build /app/dist ./dist
COPY package*.json ./

# 👇 IMPORTANTE: instalamos todo (incluye nest CLI y ts-node)
RUN npm install

# Variables de entorno por defecto
ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "start:dev"]
