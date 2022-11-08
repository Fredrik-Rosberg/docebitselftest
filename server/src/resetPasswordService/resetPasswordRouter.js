const express = require("express");
const router = express.Router();
const { sendMail, resetPassword, getExpireDate} = require("./resetPasswordController");


router.post("/api/reset", sendMail);
router.put("/api/reset", resetPassword);
router.get("/api/reset/:id", getExpireDate);


module.exports = router;
