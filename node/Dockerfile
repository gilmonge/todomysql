# el node del sitio
FROM node:17-alpine

# instala recursos globales
RUN npm i -g nodemon
RUN npm i -g typescript

#creo la carpeta
RUN mkdir /api_node
WORKDIR /api_node

# copia los archivos en el container
COPY . /api_node

# instala recursos del proyecto
RUN npm install

# abrir el puerto
EXPOSE 8080

CMD [ "npm", "start" ]