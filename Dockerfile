FROM node:8-alpine
EXPOSE 3000
COPY server.js .
COPY package.json .
RUN npm install
CMD node server.js