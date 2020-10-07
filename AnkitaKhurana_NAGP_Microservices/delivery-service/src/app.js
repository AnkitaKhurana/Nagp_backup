const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes/routeDelivery");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req,res)=>{res.send("Delivery Service");});
app.use("/delivery/", routes);

module.exports = app;