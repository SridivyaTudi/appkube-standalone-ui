FROM node:16.17.0
RUN mkdir -p /app
WORKDIR /app
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
COPY .babelrc.js ./.babelrc.js
COPY babel.config.js ./babel.config.js
COPY jsconfig.json ./jsconfig.json
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
