const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const dotenv = require("dotenv");
const app = express();

// Initialize variables.
var PORT = 443 || process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

dotenv.config({ debug: process.env.DEBUG });

// ! insert your own options here
const options = {
  cors: {
    credentials: true,
    origin: true
  },
  // port: 3001,
  https: {
    key: fs.readFileSync(
      "/opt/bitnami/letsencrypt/certificates/nightlyreports.momentumsolar.app.key"
    ),
    cert: fs.readFileSync(
      "/opt/bitnami/letsencrypt/certificates/nightlyreports.momentumsolar.app.crt"
    )
  }
};

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`App Listening on ${PORT} ${app}   `);
});
