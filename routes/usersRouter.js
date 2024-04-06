const express = require("express");
const { body } = require("express-validator");

const {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
  postUser,
  checkUser,
  getOrdersOfUser,
  changeStatusActiveUser,
} = require("../controllers/usersController");

usersRouter = express.Router();

usersRouter.get("/", getAllUsers);

usersRouter.get("/:id", checkUser, getUserById);

usersRouter.put("/:id", checkUser, putUser);

usersRouter.delete("/:id", checkUser, deleteUser);

usersRouter.post(
  "/",
  body("first_name").notEmpty().trim(),
  body("last_name").notEmpty().trim(),
  body("age").notEmpty().trim(),
  body("active").notEmpty(),
  postUser
);

//get the orders of a user
usersRouter.get("/:id/orders", checkUser, getOrdersOfUser);

//change status
usersRouter.put("/:id/check-inactive", checkUser, changeStatusActiveUser);

module.exports = usersRouter;
