const express = require("express");
const router = express.Router();
const {createCourses, deleteCourse,getCourses, getCourse, getTests}= require("./courseController");


//Skapa kurstillfälle
router.post("/api/course", createCourses);
router.delete("/api/course/:id", deleteCourse);
router.get("/api/course", getCourses);
router.get("/api/course/:id", getCourse);
router.get("/api/test", getTests);


module.exports = router;
