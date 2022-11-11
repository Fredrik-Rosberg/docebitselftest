const express = require("express");
const router = express.Router();
const { createAccount, getUsers, changePassword } = require("./userController");

router.post("/api/user", createAccount);
router.get("/api/user", getUsers)

router.put("/api/user/:id/changePassword", changePassword)


module.exports = router;
