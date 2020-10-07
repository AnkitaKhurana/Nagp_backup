FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3003

CMD npm start