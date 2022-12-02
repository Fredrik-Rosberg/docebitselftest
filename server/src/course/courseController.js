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
  try {
    dataArray.forEach(async (data) => {
      let result = await getCourseById(data);
      if ((await result).rows[0]) {
        responseArray.push(result.rows[0]);
      }

      if (iteration == dataArray.length) {
        if (responseArray.length > 0) {
          res
            .status(400)
            .json({ data: responseArray, error: "Kurs(er) existerar redan" });
        } else {
          try {
            dataArray.map(async (obj) => {
              await db.query(sqlQuery, [
                obj.courseoccasionid,
                obj.userid,
                obj.testid,
              ]);
            });

            res.status(200).json({
              addcount: dataArray.length,
              message: "Kurs(er) tillagda",
            });
          } catch (error) {
            res.status(404).json(error);
          }
        }
      }
      iteration++;
    });
  } catch (error) {
    console.log(error);
  }
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
      "SELECT course.id, courseoccasion.courseorganizer,courseoccasion.name, courseoccasion.startdate, courseoccasion.enddate, test.testname, users.email FROM course INNER JOIN courseoccasion ON course.courseoccasionid = courseoccasion.id INNER JOIN users ON users.id = course.userid INNER JOIN test ON test.id = course.testid";
    let result = await db.query(sqlQuery);
    if (result.rowCount > 0) {
      result.rows.map((obj) => {
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

const getCourseByUserId = async (req, res) => {
  const sqlQuery =
    "SELECT course.id, courseoccasion.courseorganizer,courseoccasion.name, courseoccasion.startdate, courseoccasion.enddate, test.testname, test.maxscore, results.score  FROM users INNER JOIN course ON course.userid=users.id INNER JOIN courseoccasion ON courseoccasion.id = course.courseoccasionid INNER JOIN test ON test.id = course.testid INNER JOIN results ON results.userid = users.id  WHERE users.id=$1;    ";

  let result = await db.query(sqlQuery, [req.params.id]);
  if (result.rowCount > 0) {
    result.rows.map((obj) => {
      obj.startdate = new Date(obj.startdate).toLocaleDateString("se-SE");
      obj.enddate = new Date(obj.enddate).toLocaleDateString("se-SE");
    });
    res.status(200).json({ data: result.rows });
  } else {
    res.status(404).json({ message: "Ingen kurs funnen med det id" });
  }
};
module.exports = {
  createCourses,
  getCourses,
  deleteCourse,
  getCourse,
  getCoursesByFKId,
  getCourseByUserId,
};
