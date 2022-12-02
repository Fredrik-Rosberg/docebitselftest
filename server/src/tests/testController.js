const db = require("../../db");
const { getCoursesByFKId } = require("../course/courseController");

const getQuestions = (data) => {
  let questions = data.filter((element) => Object.values(element)[0] != "");
  return questions;
};

const getTestByName = async (testname) => {
  try {
    const sqlQuery = "SELECT id FROM test WHERE testname=$1";
    let result = await db.query(sqlQuery, [testname]);
    if (result.error) return error;
    return result;
  } catch (error) {
    return error;
  }
};

const getTests = async (req, res) => {
  const sqlQuery = "SELECT * FROM test";
  let result = await db.query(sqlQuery);
  if (result.rowCount > 0) {
    result.rows?.map((obj) => {
      obj.uploaddate = new Date(obj.uploaddate).toLocaleDateString("se-SE");
    });
    res.status(200).json(result.rows);
  } else {
    res.status(404).json({ error: "Inga test funna" });
  }
};

const getTestById = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM question WHERE testid=$1";
    let result = await db.query(sqlQuery, [req.params.id]);
    if (result.rowCount > 0) {
      res.send(result.rows);
    } else {
      res.status(404).json({ error: "Hittade ingen test med det id" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: error.detail });
  }
};

const uploadTest = async (req, res) => {
  try {
    let data = req.body;
    let correctCsvFile = data.file.some((element) =>
      Object.keys(element).includes("Fråga")
    );
    if (correctCsvFile) {
      let questions = getQuestions(data.file);
      let uploaded = new Date().toLocaleDateString("se-SE");
      let testnameExist = await getTestByName(data.name);

      if (!testnameExist.rows[0]) {
        let sqlQuery =
          "INSERT INTO test(testname, uploaddate, maxscore) VALUES ($1, $2, $3) RETURNING id";
        let result = await db.query(sqlQuery, [
          data.name,
          uploaded,
          questions.length,
        ]);
        if (!result.error) {
          let id = result.rows[0].id;
          let sqlQuery2 =
            "INSERT INTO question(questionnr, question, alternativea, alternativeb, alternativec, alternatived, alternativee, alternativef, alternativeg, alternativeh, alternativei, alternativej, alternativek, answer, testid) VALUES ($1, $2, $3, $4,$5, $6, $7,$8,$9,$10,$11,$12,$13,$14, $15)";
          questions.forEach((row) => {
            row.testid = id;
            db.query(sqlQuery2, Object.values(row), (err, res) => {
              if (err) {
                throw new Error(err);
              } else {
                console.log("Inserted" + res.rowCount + " row", row);
              }
            });
          });
          res.json({ message: "Test tillagt" });
        }
      } else {
        throw "Angivet testnamn existerar redan";
      }
    } else {
      throw "Fel på csv-filen";
    }
  } catch (error) {
    console.log({ Error: error });
    if (error.code == 23505) {
      res.status(400).json({ error: "Angivet testnamn existerar redan" });
    } else {
      res.status(400).json({ error: error });
    }
  }
};
//Lagt till cascade på foreignkey i table question
//Error hantering behövs på backend

const deleteTest = async (req, res) => {
  try {
    let resp = await getCoursesByFKId(req.params.id, "test");
    if (resp.rowCount) {
      throw "Ta bort test från kurs först";
    } else {
      let sqlQuery = "DELETE FROM test WHERE id=$1";
      let result = await db.query(sqlQuery, [req.params.id]);
      res.json({ message: "Test borttaget" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = { uploadTest, deleteTest, getTestById, getTests };
