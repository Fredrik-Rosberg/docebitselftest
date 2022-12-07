const express = require("express");
const multer = require("multer");

const router = express.Router();
const {
  createCourses,
  deleteCourse,
  getCourses,
  getCourse,
  getCourseByUserId,
  getTestResultByCourseId,
  saveImage,
} = require("./courseController");


//Skapa kurstillfälle
router.post("/api/course", createCourses);
router.delete("/api/course/:id", deleteCourse);
router.get("/api/course", getCourses);
router.get("/api/course/user/:id", getCourseByUserId);
router.get("/api/course/result/:id", getTestResultByCourseId);
router.post("/api/course/organizer", saveImage);

router.get("/api/course/:id", getCourse);

module.exports = router;
