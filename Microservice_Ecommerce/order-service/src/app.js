const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes/routeOrder");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req,res)=>{res.send("Order Service");});
app.use("/order/", routes);

module.exports = app;