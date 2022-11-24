const express = require("express");
const router = express.Router();
const {
  uploadTest,
  deleteTest,
  getTestById,
  getTests,
} = require("./testController");

router.get("/api/test", getTests);
router.get("/api/test/:id", getTestById);
router.post("/api/test", uploadTest);
router.delete("/api/test/:id", deleteTest);

module.exports = router;
