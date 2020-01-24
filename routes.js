const router = require("express").Router();

var handlebars = require("handlebars");
var fs = require("fs");
const axios = require("axios");

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
  ],
  Scheduling: [
    "amidoneck@momentumsolar.com",
    "tcaytuiro@momentumsolar.com",
    "dyabut@momentumsolar.com"
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

// var transporter = nodemailer.createTransport({
//   host: "smtp.office365.com", // Office 365 server
//   port: 587, // secure SMTP
//   auth: {
//     user: "mtscancels@momentumsolar.com",
//     pass: "Solar1210"
//   },
//   tls: {
//     ciphers: "SSLv3"
//   },
//   requireTLS: true
// });

router.post("/api/send", async (req, res) => {
  readHTMLFile("./emailtemplate.html", req, async function(err, html) {
    var template = handlebars.compile(html);
    let { emailReport, escalationType } = req.body;
    var htmlToSend = template(emailReport);

    const body = {
      to: distros[escalationType],
      from: "nightlyreports@momentumsolar.app",
      subject: `${escalationType} - SA NIGHTLY REPORT ESCALATION`,
      body: htmlToSend
    };

    try {
      const res = await axios.post(
        "https://veeyieqt20.execute-api.us-east-1.amazonaws.com/api/sendmailbulk",
        { ...body },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(res);
      return res.send("success");
    } catch (err) {
      throw new Error(err);
    }
    // transporter.sendMail(msg, function(error, response) {
    //   if (error) {
    //     console.log(error);
    //   }
    //   res.send("success");
    // });
  });
});

module.exports = router;
