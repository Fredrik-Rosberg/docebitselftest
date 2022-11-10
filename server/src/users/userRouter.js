const express = require("express");
const router = express.Router();
const { createAccount, getUsers } = require("./userController");

router.post("/api/user", createAccount);
router.get("api/user", getUsers)

module.exports = router;
