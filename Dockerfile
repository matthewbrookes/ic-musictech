FROM node:9.3.0

RUN mkdir /musictech
COPY package.json /musictech
COPY package-lock.json /musictech

WORKDIR /musictech

RUN npm install

COPY src /musictech/src
COPY public /musictech/public

RUN npm run build

CMD node_modules/.bin/serve -s build
