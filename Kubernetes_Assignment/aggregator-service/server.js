require('dotenv').config()
const app = require("./src/app");
const logger = require('./logger');


app.listen(process.env.NODE_SERVER_PORT, () => {
  logger.info('Aggregator Service running at port' + process.env.NODE_SERVER_PORT);
  console.log("Aggregator Service running at port " + process.env.NODE_SERVER_PORT);
});
