const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("servers up and running");
});

app.listen(port, () => {
  console.log(`listening to ${port}`);
});
