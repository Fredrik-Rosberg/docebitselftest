const express = require("express");

const router = express.Router();
const {
  addCourseOrganizer,
  getOrganizers,
} = require("./courseorganizerController.js");

router.get("/api/organizer", getOrganizers);
router.post("/api/organizer", addCourseOrganizer);

module.exports = router;
