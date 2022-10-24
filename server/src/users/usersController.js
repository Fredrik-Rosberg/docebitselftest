const db = require("../../db");

const getUserByEmail = async (email) => {
  try {
    let sqlQuery = "SELECT id, email FROM users WHERE email=$1";
    const userExists = await db.query(sqlQuery, [email]);

    if (userExists.rows[0]) {
      return userExists;
    }
    return null;
  } catch (error) {
    return error;
  }
};

module.exports = { getUserByEmail };
