const db = require("../../db");
const encrypt = require("../../config/encryption");

const getUserByEmail = async (email) => {
  try {
    let sqlQuery = "SELECT id, email FROM users WHERE email=$1";
    const userExists = await db.query(sqlQuery, [email]);

    if (userExists.rowCount) {
      return userExists.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const getUsers = async (req, res) => {
  try {
    let sqlQuery = "SELECT id, email, firstname, lastname FROM users";
    const users = await db.query(sqlQuery);
    if (users.rowCount != 0) {
      res.status(200).json(users.rows);
    } else {
      res.status(200).json({ message: "Inga användare funna" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getUserById = async (req, res) => {
  try {
    let sqlQuery =
      "SELECT id, email, firstname, lastname, role FROM users WHERE id=$1";
    const user = await db.query(sqlQuery, [req.params.id]);
    if (user.rows[0]) {
      res.json(user.rows[0]);
    } else {
      res.status(404).json({ message: "Ingen användare funnen" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
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
        req.body.firstname,
        req.body.lastname,
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

const editUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role } = req.body;
    const userId = req.params.id;
    let encryptedPassword = encrypt(password);
    let sqlQuery =
      "UPDATE users SET firstname=$1,lastname=$2,email=$3,hashedpassword=$4,role=$5 WHERE id =$6";
    let result = await db.query(sqlQuery, [
      firstname,
      lastname,
      email,
      encryptedPassword,
      role,
      userId,
    ]);
    if (result.rowCount) {
      res.status(200).json({ message: "Konto uppdaterat" });
    } else {
      res.status(400).json({ message: "Något gick fel" });
    }
  } catch (error) {
    console.error(error);
  }
};

const changePassword = async (req, res) => {
  try {
    if (req.body.password) {
    }
  } catch (error) {
    console.log();
  }
};

module.exports = {
  getUserByEmail,
  getUsers,
  createAccount,
  changePassword,
  getUserById,
  editUser,
};
