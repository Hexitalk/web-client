# Usa una imagen de Node.js para el entorno de desarrollo
FROM node:lts-alpine3.20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia los archivos de configuración de npm y el package.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install


# Copia el resto de los archivos de la aplicación al contenedor
COPY . .

# Expone el puerto en el que Angular CLI servirá la aplicación
EXPOSE 4200

# Comando por defecto para ejecutar el servidor de desarrollo de Angular
CMD ["npm", "start"]
