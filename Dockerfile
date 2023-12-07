FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
COPY web/ ./web

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]