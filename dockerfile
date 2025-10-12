# Imagen más ligera de Node
FROM node:20-slim

# Crear directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto del backend
EXPOSE 3001

# Comando por defecto (sobre-escribible desde docker-compose)
CMD ["npm", "run", "start:dev"]
