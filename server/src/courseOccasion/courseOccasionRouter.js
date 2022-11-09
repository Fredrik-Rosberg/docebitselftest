const express = require("express");
const router = express.Router();
const { courseOccasion } = require("./courseOccasionController");

router.post("/api/course/occasion", courseOccasion);
router.get("/api/courseoccasion", );
module.exports = router;
