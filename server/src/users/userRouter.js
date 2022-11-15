const express = require("express");
const router = express.Router();
const {
  createAccount,
  getUsers,
  getUserById,
  changePassword,
  editUser,
  checkCurrentPassword,
} = require("./userController");

router.post("/api/user", createAccount);
router.get("/api/user", getUsers);
router.get("/api/user/:id", getUserById);
router.put("/api/user/:id/changepassword", changePassword);
router.post("/api/user/:id/changepassword", checkCurrentPassword);
router.put("/api/user/:id", editUser);

module.exports = router;
