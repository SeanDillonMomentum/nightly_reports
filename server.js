const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const dotenv = require('dotenv');
const ipfilter = require('express-ipfilter').IpFilter;
const ips = [
  '67.84.129.31',
  '::ffff:67.84.129.31',
  '::ffff:69.9.36.186',
  '69.9.36.186',
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1',
];

// Initialize variables.
var PORT = 443 || process.env.PORT;

app.use(bodyParser.json());

app.use(ipfilter(ips, { mode: 'allow' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

dotenv.config({ debug: process.env.DEBUG });

// ! insert your own options here
var options = {
  key: fs.readFileSync(
    '/opt/bitnami/letsencrypt/certificates/inventory.momentumsolar.app.key'
  ),
  cert: fs.readFileSync(
    '/opt/bitnami/letsencrypt/certificates/inventory.momentumsolar.app.crt'
  ),
  ca: fs.readFileSync(
    '/opt/bitnami/letsencrypt/certificates/inventory.momentumsolar.app.issuer.crt'
  ),
};

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(cors());

https.createServer(options, app).listen(PORT, () => {
  console.log(`App Listening on ${PORT} ${app}   `);
});
