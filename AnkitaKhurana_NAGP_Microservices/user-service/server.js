require('dotenv').config()
const eurekaHelper = require('./eureka-helper');
const app = require("./src/app");
const { db } = require('./src/database/dbConfig');
const logger = require('./logger');

db.sync()
  .then(() => {
    logger.info('Database In Sync');
    app.listen(process.env.NODE_SERVER_PORT, () => {
      logger.info('Search Service running at port' + process.env.NODE_SERVER_PORT);
      console.log("info", "Search Service running at port " + process.env.NODE_SERVER_PORT);
    });
    eurekaHelper.registerWithEureka('userservice', process.env.NODE_SERVER_PORT);
  })
  .catch(err => {
    logger.info(err);
    console.log('error', err);
  });

