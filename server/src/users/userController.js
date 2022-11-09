const db = require("../../db");
const encrypt = require("../../config/encryption");

const getUserByEmail = async (email) => {
  try {
    let sqlQuery = "SELECT id, email FROM users WHERE email=$1";
    const userExists = await db.query(sqlQuery, [email]);

    if (userExists.rows[0]) {
      return userExists.rows[0];
    }
    return null;
  } catch (error) {
    return error;
  }
};

const createAccount = async (req, res) => {
  try {
    let encryptedPassword = encrypt(req.body.password);
    let sqlQuery =
      "INSERT INTO users (firstname, lastname, email, hashedpassword, role) VALUES ($1,$2,$3,$4,$5 )";
    const userExists = await getUserByEmail(req.body.email);
    if (userExists == null) {
      let result = await db.query(sqlQuery, [
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        encryptedPassword,
        req.body.role,
      ]);
      if (result.rowCount) {
        res.json({ message: "Konto skapat", result: true });
      }
    } else {
      res.json({ message: "Användare finns redan", result: false });
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUserByEmail,
  createAccount,
};
