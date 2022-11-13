const express = require("express");
const router = express.Router();
const { signInUser, signOut } = require("./authController");

router.post("/api/signin", signInUser);
router.delete("/api/signin", signOut)

module.exports = router;
