FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3004

CMD npm start