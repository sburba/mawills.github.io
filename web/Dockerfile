FROM node:10-alpine

RUN apk add git

WORKDIR /app
ADD package.json yarn.lock ./
RUN yarn install
ADD . .

CMD ["yarn", "test"]
