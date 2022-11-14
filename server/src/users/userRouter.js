const express = require("express");
const router = express.Router();
const {
  createAccount,
  getUsers,
  getUserById,
  changePassword,
  editUser,
} = require("./userController");

router.post("/api/user", createAccount);
router.get("/api/user", getUsers);
router.get("/api/user/:id", getUserById);
router.put("/api/user/:id/changePassword", changePassword);
router.put("/api/user/:id", editUser);

module.exports = router;
