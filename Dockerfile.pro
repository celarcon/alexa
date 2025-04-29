FROM node:22.14.0-alpine as builder
RUN apk update && apk add bash
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM node:22.14.0-alpine as final
RUN apk update && apk add bash
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.sequelizerc ./.sequelizerc
COPY --from=builder /app/src/infrastructure/sequelize/migrations/scripts ./dist/infrastructure/sequelize/migrations/scripts
EXPOSE 8080
CMD ["sh", "-c", "npm run start:prod"]
