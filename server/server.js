const express = require("express");
const app = express();
const PORT = 3001;
const oneDay = 1000 * 60 * 60 * 24;

//Middlewhere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Session
let session = require("express-session");
app.use(
  session({
    secret: "keyboard cat jksfj<khsdka",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: oneDay, // Gör att användaren är inloggad i en dag fastän man stänger ner browsern, antingen den här eller expire
      secure: false, // set to true with https
      httpOnly: true,
      expires: 60000, //Vid en inaktiv minut så loggas man ut
    },
  })
);

//Routes
const sendMail = require("./src/resetPasswordService/resetPasswordRouter.js");
const authRouter = require("./src/authenticate/authRouter.js");
const userRouter = require("./src/users/userRouter");
const courseRouter = require("./src/course/courseRouter");
const testRouter = require("./src/tests/testRouter");

const courseOccasionRouter = require("./src/courseOccasion/courseOccasionRouter");
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", sendMail);
app.use("/", courseRouter);
app.use("/", courseOccasionRouter);
app.use("/", testRouter);

app.get("/api", (req, res) => {
  res.send("servers up and running");
});
//declared nodemailer

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
