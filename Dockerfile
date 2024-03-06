FROM node:alpine

WORKDIR /app
COPY . .

RUN yarn install
CMD ["node", "index.js"]
