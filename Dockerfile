FROM node:9.11-slim

MAINTAINER Lee Winter

#ENV NODE_ENV=development
#ENV PORT=3000

ARG NPM_TOKEN

COPY . /var/www
WORKDIR /var/www

RUN npm install

#EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
