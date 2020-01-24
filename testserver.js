const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const routes = require("./routes");
// const ipfilter = require("express-ipfilter").IpFilter;

// const ips = ["::ffff:69.9.36.186", "69.9.36.186", "127.0.0.1", "::1"];

// Initialize variables. b

var PORT = 3005 || process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(routes);

// app.use(ipfilter(ips, { mode: "allow" }));

// parse application/x-www-form-urlencoded

// parse application/json

// var options = {
//   key: fs.readFileSync(
//     "/opt/bitnami/letsencrypt/certificates/lms.momentumsolar.app.key"
//   ),
//   cert: fs.readFileSync(
//     "/opt/bitnami/letsencrypt/certificates/lms.momentumsolar.app.crt"
//   ),
//   ca: fs.readFileSync(
//     "/opt/bitnami/letsencrypt/certificates/lms.momentumsolar.app.issuer.crt"
//   )
// };

// app.use(express.static(path.join(__dirname, "build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
var whitelist = ["http://localhost:3000"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});

// if (useragent.Agent.isMobile == false) {
//   https.createServer(options, app).listen(PORT, () => {
//     console.log(`App Listening on ${PORT} ${app}   `);
//   });
// } else if (useragent.Agent.isMobile) {
//   //window.replace('google.com')
// }
