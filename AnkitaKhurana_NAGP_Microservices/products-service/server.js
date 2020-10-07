require('dotenv').config();
const eurekaHelper = require('./eureka-helper');
const app = require("./src/app");
const mongoose = require("mongoose");
const  DB_URI  =(process.env.MONGO_DB_URI || "mongodb://localhost:27017/microservices");
const logger = require('./logger');

mongoose.connection.on("open", function(ref) {
    logger.info('Products services connected to mongo server.');
    console.log("Connected to mongo server.");
    return ;
});

mongoose.connection.on("error", function(err) {
    console.log("Could not connect to mongo server!");
    return console.log(err);
});

mongoose.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false  });
app.listen(process.env.NODE_SERVER_PORT, () => {
    logger.info('Products services running');
    eurekaHelper.registerWithEureka('productservice', process.env.NODE_SERVER_PORT);
    console.log('Products Services running ...');
});


