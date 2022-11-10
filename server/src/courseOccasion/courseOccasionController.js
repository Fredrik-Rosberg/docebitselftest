const db = require("../../db");

const createCourseOccasion = async (req, res) => {
  try {
    const sqlQuery =
      "INSERT INTO courseoccasion (name, startdate, enddate, courseorganizer) VALUES($1, $2,$3, $4)";
    let result = await db.query(sqlQuery, [
      req.body.name,
      req.body.startdate,
      req.body.enddate,
      req.body.courseorganizer
    ]);
   
    
    console.log(result)
    if (result.rowCount) {
      res.status(200).json({message:"Kurstillfälle skapat"})
    } else {
      res.status(400).json({ message: "Misslyckat", result: false });
    }
  } catch (error) {
    res.status(400).json({ message: "Kurstillfälle existerar redan", result: false });
    console.log(error) 
  }
};

const getCourseOccasions = async (req, res) => {
  const sqlQuery =
    "SELECT course.name, course.startdate, course.enddate, test.testname, users.email FROM courseoccasion INNER JOIN course ON course.id = courseoccasion.courseid INNER JOIN users ON users.id = courseoccasion.userid INNER JOIN test ON test.id = course.testid";
  let result = await db.query(sqlQuery);
  res.json(result.rows);
};

module.exports = { createCourseOccasion, getCourseOccasions };
