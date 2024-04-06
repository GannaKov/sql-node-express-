const express = require("express");

exampleRouter = express.Router();
const { getAllStudents } = require("../controllers/exampleController");

exampleRouter.get("/", getAllStudents);

module.exports = exampleRouter;
