const express = require("express");
const router = express.Router();
const { signInUser } = require("./authController");

router.post("/api/signin", signInUser);

module.exports = router;
