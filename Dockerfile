FROM node:9.5.0-alpine
RUN apk --no-cache add curl
EXPOSE 3000
COPY server.js .
COPY package.json .
COPY views ./views
RUN npm install
CMD node server.js