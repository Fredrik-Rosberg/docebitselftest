const db = require("../../db");

const uploadCsv = async (req, res) => {
  try {
    let data = req.body;
    console.log(req.body.name);
    let uploaded = new Date().toLocaleDateString("se-SE");
    let sqlQuery =
      "INSERT INTO test(testname, uploaddate, maxscore) VALUES ($1, $2, $3)";
    let result = await db.query(sqlQuery, [data.name, uploaded, 40]);
    console.log(result);
    res.json({ message: "Test tillagt" });
  } catch (error) {
    console.log(error);
    if (error.code == 23505) {
      res
        .status(400)
        .json({ error: "Test med det här namnet existerar redan" });
    } else {
      res.status(400).json({ error: error.detail });
    }
  }
};

module.exports = { uploadCsv };
