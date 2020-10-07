FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 3006

CMD npm start