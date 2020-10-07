const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes/routePayment");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req,res)=>{res.send("Payment Service");});
app.use("/payment/", routes);

module.exports = app;