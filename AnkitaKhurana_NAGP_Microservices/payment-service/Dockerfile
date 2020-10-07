FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3005

CMD npm start