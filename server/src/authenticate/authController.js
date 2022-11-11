const db = require("../../db");
const encrypt = require("../../config/encryption");

const signInUser = async (req, res) => {
  let encryptedPassword = encrypt(req.body.password);

  try {
    let user = await db.query(
      "SELECT id, email FROM users WHERE email =$1 AND hashedpassword=$2",
      [req.body.email, encryptedPassword]
    );
    if (user.rows[0]) {
      user = user.rows[0];
      req.session.user = user;
      req.session.user.loggedIn = true;
      res
        .status(200)
        .json({ loggedIn: true, message: "Inloggad", userId: user.id });
    } else {
      res
        .status(401)
        .json({ loggedIn: false, message: "Inloggning misslyckades" });
    }
  } catch (error) {
    res
      .status(401)
      .json({ loggedIn: false, message: "Inloggning misslyckades" });
    console.log(error);
  }
};

module.exports = { signInUser };
