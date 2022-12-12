const db = require("../../db");
const getCourseById = async (data) => {
  let sqlQuery =
    "SELECT * FROM course WHERE userid=$1 AND courseoccasionid=$2 AND testid=$3";
  return await db.query(sqlQuery, [
    data.userid,
    data.courseoccasionid,
    data.testid,
  ]);
};
const createCourses = async (req, res) => {
  let responseArray = [];

  let dataArray = req.body;

  let sqlQuery =
    "INSERT INTO course(courseoccasionid, userid, testid) VALUES ($1, $2, $3)";

  let iteration = 1;

  dataArray.forEach(async (data) => {
    try {
      await db.query(sqlQuery, [
        data.courseoccasionid,
        data.userid,
        data.testid,
      ]);
    } catch (error) {
      responseArray.push(error.detail);
    }
    console.log(iteration);
    if (iteration == dataArray.length) {
      if (responseArray.length > 0) {
        res.status(400).json({
          message:
            dataArray.length - responseArray.length + " kurs(er) tillagda",
          errorcount: responseArray.length,
          errormessage: `${responseArray.length} kurs(er) existerar redan`,
          error: responseArray,
        });
      } else {
        res
          .status(200)
          .json({
            addcount: dataArray.length,
            message: `${dataArray.length} kurs(er) tillagda`,
          });
      }
    }
    iteration++;
  });
};

const getCourse = async (req, res) => {
  const sqlQuery = "SELECT * FROM course WHERE id=$1";

  let result = await db.query(sqlQuery, [req.params.id]);
  if (typeof result.rows[0] != "undefined" && result.rows[0] != null) {
    res.status(200).json({ message: result.rows[0] });
  } else {
    res.status(404).json({ message: "Ingen kurs funnen med det id" });
  }
};

const getCourses = async (req, res) => {
  try {
    const sqlQuery =
      "SELECT course.id, courseorganizer.name AS organizer, courseorganizer.city, courseoccasion.name, courseoccasion.startdate, courseoccasion.enddate, test.testname, users.email FROM course INNER JOIN courseoccasion ON course.courseoccasionid = courseoccasion.id INNER JOIN courseorganizer ON courseoccasion.courseorganizerid = courseorganizer.id INNER JOIN users ON users.id = course.userid INNER JOIN test ON test.id = course.testid";
    let result = await db.query(sqlQuery);
    if (result.rowCount > 0) {
      result.rows.map((obj) => {
        obj.organizer = `${obj.organizer} ${obj.city}`;
        obj.startdate = new Date(obj.startdate).toLocaleDateString("se-SE");
        obj.enddate = new Date(obj.enddate).toLocaleDateString("se-SE");
      });
      res.status(200).json(result.rows);
    } else {
      res.status(404).json({ message: "Inga kurser funna" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Inga kurser funna" });
  }
};

const deleteCourse = async (req, res) => {
  let result;
  let sqlQuery = "DELETE FROM course WHERE id=$1";
  result = await db.query(sqlQuery, [req.params.id]);
  if (result.rowCount) {
    res.status(200).json({ message: "Kursen borttagen" });
  } else {
    res.status(400).json({ error: "Misslyckat" });
  }
};

const getCoursesByFKId = async (id, table) => {
  let sqlQuery = `SELECT * FROM course WHERE ${table + "id"}=$1`;
  let result = await db.query(sqlQuery, [id]);
  return result;
};
// select course.id, courseoccasion.name, courseoccasion.courseorganizer from course inner join courseoccasion ON courseoccasion.id = course.courseoccasionid where course.userid=50
// select test.testname, test.maxscore, results.score from course inner join results on results.courseid = course.id inner join test on test.id = course.testid where course.id=100
const getCourseByUserId = async (req, res) => {
  const sqlQuery =
    "SELECT DISTINCT courseoccasion.id, courseoccasion.name, courseoccasion.startdate, courseoccasion.enddate, courseorganizer.name as organizer, courseorganizer.city from course inner join courseoccasion ON courseoccasion.id = course.courseoccasionid left join courseorganizer on courseorganizer.id = courseoccasion.courseorganizerid where course.userid=$1";

  let result = await db.query(sqlQuery, [req.params.id]);
  if (result.rowCount > 0) {
    result.rows.map((obj) => {
      obj.startdate = new Date(obj.startdate).toLocaleDateString("se-SE");
      obj.enddate = new Date(obj.enddate).toLocaleDateString("se-SE");
    });
    res.status(200).json(result.rows);
  } else {
    res.status(404).json({ message: "Ingen kurs funnen med det id" });
  }
};

const getTestResultByCourseId = async (req, res) => {
  const sqlQuery =
    "SELECT test.testname, test.maxscore, results.time, results.score from course inner join results on results.courseid = course.id inner join test on test.id = course.testid where course.courseoccasionid=$1";

  let result = await db.query(sqlQuery, [req.params.id]);
  if (result.rowCount > 0) {
    res.status(200).json(result.rows);
  } else {
    res.status(404).json({ message: "Inga resultat funna" });
  }
};

const createResult = async (req, res) => {
  try {
    let sqlQuery =
      "INSERT INTO results(courseid, score, time) VALUES($1,$2,$3)";
    let result = await db.query(sqlQuery, [
      req.body.courseid,
      req.body.score,
      req.body.time,
    ]);
    console.log(result);
    if (result.rowCount) {
      res.status(200).json({ message: "Resultat sparat", result: true });
    } else {
      res.status(400).json({ message: "Resultat ej sparat", result: false });
    }
  } catch (error) {
    res.status(400).json({ message: "Misslyckad ändring2" });
  }
};

module.exports = {
  createCourses,
  getCourses,
  deleteCourse,
  getCourse,
  getCoursesByFKId,
  getCourseByUserId,
  getTestResultByCourseId,
  createResult,
};
