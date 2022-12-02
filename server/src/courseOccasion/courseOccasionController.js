const db = require("../../db");
const { getCoursesByFKId } = require("../course/courseController");
const createCourseOccasion = async (req, res) => {
  try {
    const sqlQuery =
      "INSERT INTO courseoccasion (name, startdate, enddate, courseorganizer) VALUES($1, $2,$3, $4)";
    let result = await db.query(sqlQuery, [
      req.body.name,
      req.body.startdate,
      req.body.enddate,
      req.body.courseorganizer,
    ]);
    if (result.rowCount) {
      res.status(200).json({ message: "Kurstillfälle skapat" });
    } else {
      res.status(400).json({ message: "Misslyckat", result: false });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Kurstillfälle existerar redan", result: false });
    console.log(error);
  }
};

const getCourseOccasions = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM courseoccasion";
    let result = await db.query(sqlQuery);
    if (result.rowCount > 0) {
      result.rows.map((obj) => {
        obj.startdate = new Date(obj.startdate).toLocaleDateString("se-SE");
        obj.enddate = new Date(obj.enddate).toLocaleDateString("se-SE");
      });
      res.json(result.rows);
    } else {
      res.status(404).json({ error: "Inga kurstillfälle funna" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Något gick fel" });
  }
};

const deleteCourseOccasion = async (req, res) => {
  try {
    let resp = await getCoursesByFKId(req.params.id, "courseoccasion");
    if (resp.rowCount) {
      throw "Ta bort kurstillfälle från kurs först";
    } else {
      let sqlQuery = "DELETE FROM courseoccasion WHERE id=$1";
      let result = await db.query(sqlQuery, [req.params.id]);
      res.json({ message: "Kurstillfälle borttaget" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  createCourseOccasion,
  getCourseOccasions,
  deleteCourseOccasion,
};
