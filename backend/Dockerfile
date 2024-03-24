FROM node:latest

WORKDIR /backendServer

COPY package* .

RUN npm install

COPY . .

CMD [ "node","index.js" ]