const express = require("express");
const router = express.Router();
const { createCourseOccasion } = require("./courseOccasionController");

router.post("/api/course/occasion", createCourseOccasion);
router.get("/api/courseoccasion", );
module.exports = router;
