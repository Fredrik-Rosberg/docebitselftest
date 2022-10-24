const express = require("express");
const router = express.Router();
const db = require("../../db");
const { signInUser } = require("./authController");

router.get("/api/signin", async (req, res) => {
  let result = await db.query("SELECT * FROM users");
  res.json(result);
});
router.post("/api/signin", signInUser);
router.delete("/api/signin");

module.exports = router;
