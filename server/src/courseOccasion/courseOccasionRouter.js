const express = require("express");
const router = express.Router();
const {
  createCourseOccasion,
  getCourseOccasions, deleteCourseOccasion
} = require("./courseOccasionController");

router.post("/api/courseoccasion", createCourseOccasion);
router.get("/api/courseoccasion", getCourseOccasions);
router.delete("/api/courseoccasion/:id", deleteCourseOccasion);
module.exports = router;
