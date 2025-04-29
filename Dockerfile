FROM node:22.14.0-alpine

WORKDIR /app

COPY package*.json /app/

RUN npm install
RUN apk update && apk add bash

COPY . /app/

CMD ["npm", "run", "start:dev"]