FROM node:9.3.0

COPY src /musictech/src
COPY public /musictech/public
COPY package.json /musictech
COPY package-lock.json /musictech

WORKDIR /musictech

RUN npm install

CMD npm start
