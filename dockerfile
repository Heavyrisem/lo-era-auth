FROM node:alpine

WORKDIR /app
COPY . .
RUN rm -f .env.development
RUN rm -f .env.production

RUN yarn install
RUN yarn build

CMD ["yarn", "start:prod"]