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

const updateOrderValidation = [
  body("price").optional().notEmpty().trim(),
  body("date").optional().notEmpty().trim(),
  body("user_id").optional().notEmpty().trim(),
];
ordersRouter = express.Router();

ordersRouter.get("/", getAllOrders);

ordersRouter.get("/:id", checkOrder, getOrderById);

ordersRouter.put("/:id", updateOrderValidation, checkOrder, putOrder);

ordersRouter.delete("/:id", checkOrder, deleteOrder);

ordersRouter.post(
  "/",
  body("price").notEmpty().trim(),
  body("date").notEmpty().trim(),
  body("user_id").notEmpty().trim(),
  postOrder
);

module.exports = ordersRouter;
