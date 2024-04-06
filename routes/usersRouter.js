const express = require("express");
const {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
  postUser,
  checkUser,
} = require("../controllers/usersController");

usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", checkUser, getUserById);

usersRouter.put("/:id", checkUser, putUser);

usersRouter.delete("/:id", checkUser, deleteUser);

usersRouter.post(
  "/",

  postUser
);

module.exports = usersRouter;
