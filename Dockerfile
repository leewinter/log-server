FROM node:13.10.1-buster-slim

MAINTAINER Lee Winter

#ENV NODE_ENV=development
#ENV PORT=3000

ARG NPM_TOKEN

COPY . /var/www
WORKDIR /var/www/log-client
RUN npm install \ 
    && npm run build
WORKDIR /var/www
RUN npm install

#EXPOSE $PORT

ENTRYPOINT ["npm", "start"]
