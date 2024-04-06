const express = require("express");
const { body } = require("express-validator");

const {
  getAllOrders,
  getOrderById,
  putOrder,
  deleteOrder,
  postOrder,
  checkOrder,
} = require("../controllers/ordersController");

ordersRouter = express.Router();

ordersRouter.get("/", getAllOrders);

ordersRouter.get("/:id", checkOrder, getOrderById);

ordersRouter.put("/:id", checkOrder, putOrder);

ordersRouter.delete("/:id", checkOrder, deleteOrder);

ordersRouter.post(
  "/",
  body("price").notEmpty().trim(),
  body("date").notEmpty().trim(),
  body("user_id").notEmpty().trim(),
  postOrder
);

module.exports = ordersRouter;
