const express = require("express");
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

////GET /:id/orders
//get the orders of a user
usersRouter.get("/:id/orders", checkUser, getOrdersOfUser);
usersRouter.post("/", postUser);
usersRouter.put("/:id/check-inactive", checkUser, changeStatusActiveUser);

module.exports = usersRouter;
