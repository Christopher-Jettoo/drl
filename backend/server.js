const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const tableController = require("./controllers/tableController.js");

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.post(
  "/user",
  tableController.addUsers,
  tableController.addUserResponse,
  tableController.returnUserResults,
  (req, res) => {
    const userForm = req.body;
    console.log(userForm);
  }
);

app.listen(4000, () => {
  console.log("Server is running...");
});
