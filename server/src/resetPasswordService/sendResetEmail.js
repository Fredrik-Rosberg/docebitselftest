const nodemailer = require("nodemailer");

const sendMail=()=>{
let transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3",
  },

  secure: false,

  auth: {
    user: "dbselftest@gmail.com",
    pass: "arnojqzyavuwerrc",
  },
});


let mailOptions = {
  from: "dbselftest@gmail.com",
  to: "fredrik.rosberg45@gmail.com",
  subject: "Sent from project",
  text: "Skickat från NodeJs :)",
  html:`<a href="http://localhost:5173/newpassword">Återställ lösenord</a>`,
};


transporter.sendMail(mailOptions, function (err, success) {
  if (err) {
    console.log(err);
  } else {
    console.log("Email is sent");
  }
})
};

module.exports=sendMail
