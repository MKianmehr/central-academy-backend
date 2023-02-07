FROM node:18-alpine3.16

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
