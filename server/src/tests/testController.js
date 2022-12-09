const db = require("../../db");
const { getCoursesByFKId } = require("../course/courseController");

const getTestByName = async (testname) => {
  try {
    const sqlQuery = "SELECT id FROM test WHERE testname=$1";
    let testnameExist = await db.query(sqlQuery, [testname]);
    return testnameExist.rows[0] ? true : false;
  } catch (error) {
    console.log(error);
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

const getTestByUserId = async (req, res) => {
  console.log(req.params.id);
  const sqlQuery =
    "SELECT test.testname,course.id, test.id AS testid FROM course INNER JOIN test ON test.id = course.testid WHERE course.userid=$1";
  let result = await db.query(sqlQuery, [req.params.id]);
  if (result.rowCount > 0) {
    res.status(200).json(result.rows);
  } else {
    res.status(404).json({ error: "Inga test funna" });
  }
};
const getQuestionsById = async (req, res) => {
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

const addTest = async (req, res) => {
  try {
    let data = req.body;

    // Kollar om en fil existerar
    if (Object.keys(data.file).length === 0) {
      throw "Ogiltigt filformat";
    }
    // Kollar att csv-filen är giltig: om csv filen innehåller 14 kolumner eller innehåller kolumnerna Fråga och FrågealternativK
    if (
      Object.keys(data.file[0]).length != 14 ||
      !csvFileContainsSpecificColumns
    ) {
      throw "Ogiltig csv-fil";
    }
    // Kollar om testnamn redan existerar i databasen
    if (await getTestByName(data.name)) {
      throw "Angivet testnamn existerar redan";
    }
    // Hämtar alla frågor
    let questions = getQuestions(data.file);
    // Lägger till test i db
    let sqlQuery =
      "INSERT INTO test(testname, uploaddate, maxscore) VALUES ($1, $2, $3) RETURNING id";
    let result = await db.query(sqlQuery, [
      data.name,
      new Date().toLocaleDateString("se-SE"),
      questions.length,
    ]);

    if (result.error) {
      throw "Något gick fel";
    }
    // Lägger till frågor i db om inga error skett vid insert av test
    let id = result.rows[0].id;
    let sqlQuery2 =
      "INSERT INTO question(questionnr, question, alternativea, alternativeb, alternativec, alternatived, alternativee, alternativef, alternativeg, alternativeh, alternativei, alternativej, alternativek, answer, testid) VALUES ($1, $2, $3, $4,$5, $6, $7,$8,$9,$10,$11,$12,$13,$14, $15)";
    questions.forEach((row) => {
      row.testid = id;
      db.query(sqlQuery2, Object.values(row), (err, res) => {
        if (err) {
          throw new Error(err);
        }
      });
    });
    // Allt har gått bra
    res.json({ message: "Test tillagt" });
  } catch (error) {
    console.log({ Error: error });
    res.status(400).json({ error: error });
  }
};

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

const csvFileContainsSpecificColumns = () => {
  return data.file.some(
    (element) =>
      Object.keys(element).includes("Fråga") &&
      Object.keys(element).includes("FrågealternativK")
  );
};

const getQuestions = (data) => {
  let questions = data.filter((element) => Object.values(element)[0] != "");
  return questions;
};
module.exports = {
  addTest,
  deleteTest,
  getTestByUserId,
  getTests,
  getQuestionsById,
};
