const nodemailer = require("nodemailer");
const key = require("./key.json");


exports.sendMail = async (message, callback) => {

  var authMail = {
    type: "service_account",
    user: "system.admin@halabjagroup.co",
    serviceClient: key.client_id,
    client_secret: key.client_secret,
    pass: "wobvuidmeqflrcga",

  }
  let transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    // tls: {
    //   rejectUnauthorized: true
    // },
    auth: authMail
  });

  transporter.sendMail(message, async function (error, info) {
    callback(error, info);

  })
 
}