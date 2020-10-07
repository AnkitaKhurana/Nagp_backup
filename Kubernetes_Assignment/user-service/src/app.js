const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes/routeUser");

const cors = require('cors');

app.use(cors());
app.disable('x-powered-by');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req,res)=>{res.send("User Service");});
app.use("/user", routes);

module.exports = app;