const express = require("express");
const router = express.Router();
const {createCourses, deleteCourse,getCourses, getCourse}= require("./courseController");


//Skapa kurstillfälle
router.post("/api/course", createCourses);
router.delete("/api/course/:id", deleteCourse);
router.get("/api/course", getCourses);
router.get("/api/course/:id", getCourse);


module.exports = router;
