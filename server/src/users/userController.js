const db = require("../../db");
const encrypt = require("../../config/encryption");

const getUserByEmail = async (email) => {
  try {
    let sqlQuery = "SELECT id, email FROM users WHERE email=$1";
    const userExists = await db.query(sqlQuery, [email.trim().toLowerCase()]);

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
    if (!userExists) {
      let result = await db.query(sqlQuery, [
        req.body.firstname.trim(),
        req.body.lastname.trim(),
        req.body.email.trim().toLowerCase(),
        encryptedPassword,
        req.body.role,
      ]);
      if (result.rowCount) {
        res.json({ message: "Konto skapat", result: true });
      }
    } else {
      res.json({ error: "Användare finns redan", result: false });
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
  console.log(req.body.password);
  const encryptedPassword = encrypt(req.body.password);

  try {
    let sqlQuery = "UPDATE users SET hashedpassword=$1 WHERE id=$2";
    let result = await db.query(sqlQuery, [encryptedPassword, req.body.id]);
    console.log(result);
    if (result.rowCount) {
      res.status(200).json({ message: "Lösenord ändrat", result: true });
    } else {
      res.status(400).json({ message: "Misslyckad ändring", result: false });
    }
  } catch (error) {
    res.status(400).json({ message: "Misslyckad ändring2" });
  }
};

const checkCurrentPassword = async (req, res) => {
  let hashedpassword = encrypt(req.body.currentpassword);

  try {
    let getCurrentPassword = await db.query(
      "SELECT hashedpassword FROM users WHERE id =$1 and hashedpassword=$2",
      [req.params.id, hashedpassword]
    );
    console.log(getCurrentPassword);
    if (getCurrentPassword.rowCount) {
      res.status(200).json({ message: "correct password", result: true });
    } else {
      res.status(400).json({ message: "wrong password", result: false });
    }
  } catch (error) {
    res.status(400).json({ message: "nublevdefel" });
    console.log(error);
  }
};

module.exports = {
  getUserByEmail,
  getUsers,
  createAccount,
  changePassword,
  getUserById,
  editUser,
  checkCurrentPassword,
};
