const { response } = require("express");
const db = require("../../db");

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
          message: dataArray.length-responseArray.length +" Kurs(er) tillagda",
          errorcount: responseArray.length,
          errormessage: "Kurs(er) existerar redan",
          error: responseArray,
          
        });
      } else {
        res
          .status(200)
          .json({ addcount: dataArray.length, message: "Kurs(er) tillagda" });
      }
    }
    iteration++;
  });
};

const getCourse = async (req, res) => {
  const sqlQuery = "SELECT * FROM course WHERE id=$1";
  // "SELECT course.name, course.startdate, course.enddate, test.testname, users.email FROM courseoccasion INNER JOIN course ON course.id = courseoccasion.courseid INNER JOIN users ON users.id = courseoccasion.userid INNER JOIN test ON test.id = course.testid";

  let result = await db.query(sqlQuery, [req.params.id]);
  if (typeof result.rows[0] != "undefined" && result.rows[0] != null) {
    res.status(200).json({ message: result.rows[0] });
  } else {
    res.status(400).json({ message: "Misslyckat" });
  }
};

const getCourses = async (req, res) => {
  const sqlQuery =
    "SELECT course.id, courseoccasion.courseorganizer, courseoccasion.name, courseoccasion.startdate, courseoccasion.enddate, test.testname, users.email FROM course INNER JOIN courseoccasion ON course.courseid = courseoccasion.id INNER JOIN users ON users.id = course.userid INNER JOIN test ON test.id = courseoccasion.testid";
  let result = await db.query(sqlQuery);
  if (result.rowCount > 0) {
    res.status(200).json(result.rows);
  } else {
    res.status(400).json({ message: "Inga kurser funna" });
  }
};

const deleteCourse = async (req, res) => {
  let result;
  let sqlQuery = "DELETE FROM course WHERE id=$1";
  result = await db.query(sqlQuery, [req.params.id]);
  console.log(result.rowCount);
  if (result.rowCount) {
    res.status(200).json({ message: "Kursen borttagen" });
  } else {
    res.status(400).json({ message: "Misslyckat" });
  }
};

module.exports = {
  createCourses,
  getCourses,
  deleteCourse,
  getCourse
};
