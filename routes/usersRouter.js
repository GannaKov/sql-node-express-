const express = require("express");
const {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
  postUser,
  checkUser,
} = require("../controllers/controllers");

usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", checkUser, getUserById);

usersRouter.put("/:id", checkUser, putUser);

usersRouter.delete("/:id", deleteUser);

usersRouter.post(
  "/",

  postUser
);

module.exports = usersRouter;
