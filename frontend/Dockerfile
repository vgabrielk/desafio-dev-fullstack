FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./ 
COPY tsconfig.json ./ 
COPY next.config.ts ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as runner

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/package-lock.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

RUN npm install --only=production

EXPOSE 5173

CMD ["npm", "start"]
