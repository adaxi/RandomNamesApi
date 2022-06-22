FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY data ./data/
COPY server ./server/
COPY config.js ./
COPY index.js ./
COPY manifest.js ./
COPY server.js ./

RUN npm install --no-audit --no-fund --omit dev

EXPOSE 80

ENV NODE_ENV=production

CMD [ "node", "server.js" ]
