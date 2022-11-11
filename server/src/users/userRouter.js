const express = require("express");
const router = express.Router();
const {
  createAccount,
  getUsers,
  getUser,
  changePassword,
} = require("./userController");

router.post("/api/user", createAccount);
router.get("/api/user", getUsers);
router.get("/api/user/:id", getUser);
router.put("/api/user/:id/changePassword", changePassword);

module.exports = router;
