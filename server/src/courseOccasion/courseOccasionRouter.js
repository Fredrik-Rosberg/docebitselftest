const express = require("express");
const router = express.Router();
const {
  createCourseOccasion,
  getCourseOccasions,
} = require("./courseOccasionController");

router.post("/api/courseoccasion", createCourseOccasion);
router.get("/api/courseoccasion", getCourseOccasions);
module.exports = router;
