require('dotenv').config()
const {connect} = require('./src/controllers/controllerMessagequeue');
const app = require("./src/app");
const eurekaHelper = require('./eureka-helper');
const logger = require('./logger');

app.listen(process.env.NODE_SERVER_PORT, () => {
    connect();
    logger.info('Paymeny service running');
    eurekaHelper.registerWithEureka('paymentservice', process.env.NODE_SERVER_PORT);
    console.log('Payment service running ...');
});


