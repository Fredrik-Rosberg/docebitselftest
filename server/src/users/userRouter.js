const express = require("express");
const router = express.Router();
const { createAccount } = require("./userController");

router.post("/api/user", createAccount);

module.exports = router;
