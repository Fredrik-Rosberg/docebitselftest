const express = require("express");
const router = express.Router();
const {
  addTest,
  deleteTest,
  getTestByUserId,
  getTests,
  getQuestionsById,
} = require("./testController");

router.get("/api/test", getTests);
router.get("/api/test/questions/:id", getQuestionsById);
router.get("/api/test/:id", getTestByUserId);

router.post("/api/test", addTest);
router.delete("/api/test/:id", deleteTest);

module.exports = router;
