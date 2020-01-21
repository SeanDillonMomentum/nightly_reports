const router = require("express").Router();
var nodemailer = require("nodemailer");
var handlebars = require("handlebars");
var fs = require("fs");

const distros = {
  "Project Executive": [
    "OKalat@momentumsolar.com",
    "spetinga@momentumsolar.com",
    "sung@momentumsolar.com",
    "jmahoney@momentumsolar.com",
    "dmorrissey@momentumsolar.com"
  ],
  Retention: [
    "APerez@MomentumSolar.com",
    "RosselysGonzalez@MomentumSolar.com",
    "JHenne@momentumsolar.com",
    "JValerioti@MomentumSolar.com",
    "JDeAnna@MomentumSolar.com"
  ],
  Design: ["GPrado@MomentumSolar.com", "SKou@momentumsolar.com"],
  "Exterior Mods": [
    "RMeier@momentumsolar.com",
    "KNeuenkirch@MomentumSolar.com",
    "HSagastume@momentumsolar.com",
    "JSkislak@MomentumSolar.com"
  ],
  Install: [
    "westcoastIM@momentumsolar.com",
    "eastcoastim@momentumsolar.com",
    "JValerioti@MomentumSolar.com"
  ]
};

var readHTMLFile = function(path, object, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function(err, html) {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
};

require("dotenv").config();

var transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Office 365 server
  port: 587, // secure SMTP
  auth: {
    user: "mtscancels@momentumsolar.com",
    pass: "Solar1210"
  },
  tls: {
    ciphers: "SSLv3"
  },
  requireTLS: true
});

router.post("/api/send", async (req, res) => {
  readHTMLFile("./emailtemplate.html", req, function(err, html) {
    var template = handlebars.compile(html);
    let { emailReport, escalationType } = req.body;
    var htmlToSend = template(emailReport);
    const msg = {
      to: distros[escalationType],
      from: "SA-Nightly@momentumsolar.com",
      subject: `${escalationType} - SA NIGHTLY REPORT ESCALATION`,
      html: htmlToSend
    };
    transporter.sendMail(msg, function(error, response) {
      if (error) {
        console.log(error);
      }
      res.send("success");
    });
  });
});

module.exports = router;
