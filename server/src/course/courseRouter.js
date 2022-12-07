const express = require("express");
const multer = require("multer");

const router = express.Router();
const {
  createCourses,
  deleteCourse,
  getCourses,
  getCourse,
  getCourseByUserId,
  getTestResultByCourseId,
  saveImage,
} = require("./courseController");

// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}. ${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowed"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});
//Skapa kurstillfälle
router.post("/api/course", createCourses);
router.delete("/api/course/:id", deleteCourse);
router.get("/api/course", getCourses);
router.get("/api/course/user/:id", getCourseByUserId);
router.get("/api/course/result/:id", getTestResultByCourseId);
router.post("/api/course/organizer", upload.single("image"), saveImage);

router.get("/api/course/:id", getCourse);

module.exports = router;
