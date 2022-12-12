const db = require("../../db");
const encrypt = require("../../config/encryption");
const {
  resetPassword,
} = require("../resetPasswordService/resetPasswordController");

const signInUser = async (req, res) => {
  let encryptedPassword = encrypt(req.body.password);
  try {
    let user = await db.query(
      "SELECT id, email, role FROM users WHERE email =$1 AND hashedpassword=$2",
      [req.body.email, encryptedPassword]
    );

    if (user.rows[0]) {
      user = user.rows[0];
      req.session.user = user;
      req.session.user.loggedIn = true;
      res
        .status(200)
        .json({
          loggedIn: true,
          message: "Inloggad",
          userId: user.id,
          role: user.role,
        });
    } else {
      res
        .status(401)
        .json({ loggedIn: false, message: "Inloggning misslyckades" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ loggedIn: false, message: "Inlogging misslyckades" });
    console.log(error);
  }
};

const signOut = async (req, res) => {
  req.session.destroy();
  if (req.session == undefined) {
    res.status(200).json({ message: "Du är nu utloggad", signedOut: true });
  } else {
    res
      .status(400)
      .json({ message: "Utloggning misslyckades", signedOut: false });
  }
};

module.exports = { signInUser, signOut };
