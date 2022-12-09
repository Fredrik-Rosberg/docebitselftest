const db = require("../../db");
const multer = require("multer");

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

const uploadSingleImage = upload.single("image");

const addCourseOrganizer = async (req, res) => {
  uploadSingleImage(req, res, async function (err) {
    try {
      if (err) {
        throw "Ogiltig fil";
      }
      const { filename } = req.file;
      const { city, name } = req.body;

      if (!city || !name || !filename) {
        throw "Vänligen fyll i samtliga fält";
      }

      let sqlQuery =
        "INSERT INTO courseorganizer(name, city, imagepath) VALUES ($1, $2, $3)";
      await db.query(sqlQuery, [name, city, filename]);
      res.status(200).json({ message: "Lyckad inläsning" });
    } catch (error) {
      console.log({ Error: error });
      if (error.code == 23505) {
        res
          .status(400)
          .json({ error: "Angiven kursanordnare existerar redan" });
      } else {
        res.status(400).json({ error: error });
      }
    }
  });
};

const getOrganizers = async (req, res) => {
  const sqlQuery = "SELECT * FROM courseorganizer";
  let result = await db.query(sqlQuery);
  if (result.rowCount > 0) {
    res.status(200).json(result.rows);
  } else {
    res.status(404).json({ message: "Ingen kurs funnen med det id" });
  }
};

module.exports = {
  addCourseOrganizer,
  getOrganizers,
};
