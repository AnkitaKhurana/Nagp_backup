FROM node:10

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

ENTRYPOINT [ "npm", "run", "start" ]



