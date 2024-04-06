const express = require("express");
const usersRouter = require("./routes/usersRouter");
//require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(cors());

//app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//const path = require('path');

app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send("Not found !");
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;

  res.status(status).json({ message });
});

module.exports = app;
