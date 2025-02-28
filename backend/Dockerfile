FROM node:slim as BUILDER

WORKDIR /usr/src/app

COPY package*.json tsconfig.json tsconfig*.json package.lock*.json ./
COPY prisma ./prisma/
RUN yarn install

COPY . .
RUN yarn build

FROM node:slim as RUNNER

WORKDIR /usr/src/app
COPY --chown=node:node --from=BUILDER /usr/src/app/package.json ./package.json
COPY --chown=node:node --from=BUILDER /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=BUILDER /usr/src/app/dist ./dist
COPY --chown=node:node --from=BUILDER /usr/src/app/node_modules ./node_modules

RUN apt-get update -y && apt-get install -y openssl

CMD ["sh", "-c", "yarn prisma generate && yarn prisma migrate deploy && node dist/main"]