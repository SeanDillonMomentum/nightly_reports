const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const https = require("https");
const routes = require("./routes/addUser");
// Initialize variables.
var PORT = 443 || process.env.PORT;
app.use(cors());

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use("/api", routes);
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json

app.listen(PORT, () => {
  console.log(`App Listening on ${PORT} ${app}   `);
});
