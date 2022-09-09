FROM alpine

WORKDIR /app
COPY . .
RUN rm -f .env.development
RUN rm -f .env.production

RUN apk add nodejs

RUN yarn install
RUN yarn build

CMD ["yarn", "start:prod"]