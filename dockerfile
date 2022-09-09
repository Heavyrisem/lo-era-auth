FROM node:alpine

WORKDIR /app
COPY . .
RUN rm -f .env.development
RUN rm -f .env.production

RUN ln -s /usr/bin/nodejs /usr/local/bin/node

RUN yarn install
RUN yarn build

CMD ["yarn", "start:prod"]