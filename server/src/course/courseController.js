const db = require("../../db");

const createCourse = async (req, res) => {
  try {
     let sqlQuery =
       "INSERT INTO courseoccasion (courseid, userid) VALUES($1,$2)";
     let result = await db.query(sqlQuery, [
       req.body.courseid,
       req.body.userid,
     ]);
    res.status(200).json({message:"Konto skapat"});
  } catch (error) {
    res.status(400).json({message:"Misslyckat"});
  }
};

const getCourse = async (req, res) => {
  const sqlQuery = "SELECT * FROM course WHERE id=$1";
  let result = await db.query(sqlQuery, [req.params.id]);
  if (typeof (result.rows[0]) != "undefined" && result.rows[0] != null) {
    res.status(200).json({ message: result.rows[0] });
  } else {
    res.status(400).json({ message: "Misslyckat" });
  }
}
 
const getCourses = async (req, res) => {
  const sqlQuery = "SELECT * FROM course";
  let result = await db.query(sqlQuery);
  if (typeof result.rows[0] != "undefined") {
    res.status(200).json({ courses: result.rows });
  } else {
    res.status(400).json({ message: "Inga kurser funna" });
  }
};

const deleteCourse = async (req, res) => {
  let result;
  let sqlQuery = "DELETE FROM course WHERE id=$1";
  result = await db.query(sqlQuery, [req.params.id]);
  console.log(result.rowCount)
  if(result.rowCount){
    res.status(200).json({message:"Kursen borttagen"})
  }
  else{
    res.status(400).json({message:"Misslyckat"})
  }
 
};
module.exports = { createCourse, getCourses, deleteCourse, getCourse };
