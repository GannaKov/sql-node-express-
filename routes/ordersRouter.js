const express = require("express");
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

ordersRouter.post("/", postOrder);

module.exports = ordersRouter;
