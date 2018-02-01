FROM node:9.3.0

RUN mkdir /musictech
COPY package.json /musictech
COPY package-lock.json /musictech

WORKDIR /musictech

RUN npm install

COPY index.js /musictech

CMD node index.js
