require('dotenv').config()
const app = require("./src/app");
const mongoose = require("mongoose");
const DB_URI = (process.env.MONGO_DB_URI || "mongodb://localhost:27017/microservices");
const { connect } = require('./src/controllers/controllerMessagequeue');
const eurekaHelper = require('./eureka-helper');
const logger = require('./logger');

mongoose.connection.on("open", function (ref) {
    console.log("Connected to mongo server.");
    logger.info("Connected to mongo server.")
    connect();
    return;
});

mongoose.connection.on("error", function (err) {
    console.log("Could not connect to mongo server!");
    logger.info("Could not connect to mongo server!");
    return console.log(err);
});

mongoose.connect(DB_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
app.listen(process.env.NODE_SERVER_PORT, () => {
    eurekaHelper.registerWithEureka('cartservice', process.env.NODE_SERVER_PORT);
    console.log('Cart Services running ...');
    logger.info('Cart Services running ...');
});


