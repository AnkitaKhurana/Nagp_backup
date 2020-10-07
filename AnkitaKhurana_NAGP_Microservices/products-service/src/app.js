const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require("../src/routes/routeProduct");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req,res)=>{res.send("Product Service");});
app.use("/product/", routes);

module.exports = app;