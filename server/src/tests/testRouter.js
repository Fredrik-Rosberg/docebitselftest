const express = require("express");
const router = express.Router();
const { uploadCsv } = require("./testController");

router.post("/api/test", uploadCsv);

module.exports = router;
