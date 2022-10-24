const db = require("../../db");
const encrypt = require("../../config/encryption");
const { getUserByEmail } = require("../users/usersController");

const signInUser = async (req, res) => {
  let encryptedPassword = encrypt(req.body.password);
  let userExists = await getUserByEmail(req.body.email);
  if (userExists) {
    try {
      let user = await db.query(
        "SELECT id, email FROM users WHERE email =$1 AND hashedpassword=$2",
        [req.body.email, encryptedPassword]
      );
      user = user.rows[0];
      req.session.user = user;
      req.session.user.loggedIn = true;
      res.status(200).json({ loggedIn: true, message: "User is logged in" });
    } catch (error) {
      res.status(401).json({ loggedIn: false, message: "Wrong password" });
      console.log(error);
    }
  } else {
    res.status(401).json({ loggedIn: false, message: "No matching user" });
  }
};

module.exports = { signInUser };
