const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const createQLServer = require("./createServer.js");
const cors = require("cors");
const https = require("https");
const routes = require("./routes/addUser");
// Initialize variables.
var PORT = 443 || process.env.PORT;
const app = createQLServer();
app.use(cors());

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use("/api", routes);
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.start({}, deets => {
  console.log(`server now running on port http://localhost:${deets.port}`);
});
