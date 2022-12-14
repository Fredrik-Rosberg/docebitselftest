const express = require("express");

const router = express.Router();
const {
  createCourses,
  deleteCourse,
  getCourses,
  getCourse,
  getCourseByUserId,
  getTestResultByCourseId,
  createResult,
} = require("./courseController");

//Skapa kurstillfälle
router.post("/api/course", createCourses);
router.post("/api/course/result", createResult);
router.delete("/api/course/:id", deleteCourse);
router.get("/api/course", getCourses);
router.get("/api/course/user/:id", getCourseByUserId);
router.get("/api/course/result/:id", getTestResultByCourseId);
router.get("/api/course/:id", getCourse);

module.exports = router;
