const db = require("../../db");

const createCourses = async (req, res) => {
  // array
  let response = [];
  const dataArray = req.body;
  let result = dataArray.forEach((data) => createCourse(data));

  console.log(response);
  console.log(result);
  // if (result.rowCount) {
  //   res.status(200).json({ message: "Kurs har skapats" });
  // } else {
  //   res.status(400).send({ error: "Kurs ej skapad" });
  // }
};

const createCourse = async (data) => {
  try {
    let result = await addTestToCourseOccasion(
      data.testid,
      data.courseoccasionid
    );

    if (!result.error) {
      let sqlQuery =
        "INSERT INTO course (courseoccasionid, userid) VALUES($1,$2)";
      let result = await db.query(sqlQuery, [
        data.courseoccasionid,
        data.userid,
      ]);
      return { message: "success" };
    } else {
      return { error: result.error };
    }
  } catch (error) {
    return { error: error.detail };
  }
};
const addTestToCourseOccasion = async (testId, courseOccasionId) => {
  try {
    let sqlQuery = "UPDATE courseoccasion SET testid=$1 WHERE id=$2";
    let result = await db.query(sqlQuery, [testId, courseOccasionId]);
    if (result.rowCount) {
      return { message: "TestId tillags i kurstillfälle" };
    } else {
      return { error: "Något gick fel" };
    }
  } catch (error) {
    return { error: error };
  }
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
const getTests = async (req, res) => {
  const sqlQuery = "SELECT * FROM test";
  let result = await db.query(sqlQuery);
  if (result.rowCount > 0) {
    res.status(200).json(result.rows);
  } else {
    res.status(400).json({ message: "Inga test funna" });
  }
};
module.exports = {
  createCourse,
  getCourses,
  deleteCourse,
  getCourse,
  getTests,
  createCourses,
};
