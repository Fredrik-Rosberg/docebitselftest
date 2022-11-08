const crypto = require("crypto");
const nodemailer = require("nodemailer");
const encrypt = require("../../config/encryption");
const db = require("../../db");

const sendMail = async (req, res) => {
  await setResetIdByEmail(req.body.mail);
  const resetId = await getResetIdByEmail(req.body.mail);

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
    to: req.body.mail,
    subject: "Återställ lösenord",
    text: "Skickat från DocebIT selftest",
    html: `<a href="http://localhost:5173/newpassword/${resetId}">Återställ lösenord</a>`,
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
      res.status(401).json({ message: "inget mail skickat" });
    } else {
      console.log("Email is sent");
      res.status(200).json({ message: "mail är skickat" });
    }
  });
};

const resetPassword = async (req, res) => {
  const encryptedPassword = encrypt(req.body.newPassword);

  try {
    let sqlQuery = "SELECT email FROM users WHERE resetid=$1";
    let result = await db.query(sqlQuery, [req.body.usedResetId]);

    if (result.rows[0]) {
      let sqlQuery =
        "UPDATE users SET resetid=$1, hashedpassword=$2 WHERE resetid=$3";
      let result = await db.query(sqlQuery, [
        null,
        encryptedPassword,
        req.body.usedResetId,
      ]);
      res.json({ message: "success", result: true });
    } else {
      res.json({ message: "failed", result: false });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error" });
  }
};
const setResetIdByEmail = async (email) => {
  let randomUuid = crypto.randomUUID();
  let expiredDate = new Date();
  expiredDate.setHours(expiredDate.getHours() + 1);
  let mailSentDate = new Date(expiredDate).toLocaleString("sv-SE");

  try {
    let sqlQuery = "UPDATE users SET resetid=$1, resetexpire=$2 WHERE email=$3";
    const addReset = await db.query(sqlQuery, [
      randomUuid,
      mailSentDate,
      email,
    ]);
  } catch (error) {
    console.log(error);
  }
};
const getResetIdByEmail = async (email) => {
  try {
    let sqlQuery = "Select resetid FROM users where email=$1";
    const resetid = await db.query(sqlQuery, [email]);
    if (resetid.rows[0]) {
      return resetid.rows[0].resetid;
    }
    return null;
  } catch (error) {
    return error;
  }
};

const getExpireDate = async (req, res) => {
  try {
    let sqlQuery = "SELECT resetexpire FROM users WHERE resetid=$1";
    let result = await db.query(sqlQuery, [req.params.id]);

    result = result.rows[0];
    let expirationTime = new Date(Date.parse(result.resetexpire));
    let now = new Date();

    if (now < expirationTime) {
      res.json({ resetIdValid: true });
    } else {
      res.json({ resetIdValid: false });
    }
  } catch (error) {res.json({message: error})}
};

module.exports = { sendMail, resetPassword, getExpireDate };
