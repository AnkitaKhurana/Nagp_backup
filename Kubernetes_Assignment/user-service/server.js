require('dotenv').config()
const app = require("./src/app");
const logger = require('./logger');
const con = require('./src/database/mysqlConnection');

app.listen(process.env.NODE_SERVER_PORT, () => {

  logger.info('User Service running at port' + process.env.NODE_SERVER_PORT);
  console.log("User Service running at port " + process.env.NODE_SERVER_PORT);
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
  });
});
