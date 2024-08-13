FROM node:20.12.2-buster-slim AS builder

WORKDIR /app

COPY package*.json ./

COPY wait-for-kafka.sh ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20.12.2-buster-slim AS runner

RUN apt-get update && apt-get install -y netcat

WORKDIR /app

COPY --from=builder /app/package*.json ./

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/wait-for-kafka.sh ./wait-for-kafka.sh

CMD ["sh", "wait-for-kafka.sh", "kafka","npm", "run", "start:prod"]
