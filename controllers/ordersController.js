const db = require("../db/client");

//checkOrder;
const checkOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await db.query(`SELECT * FROM orders WHERE id = $1`, [id]);
    if (!order.rows[0]) {
      throw { status: 404, message: "Order not found" };
    }
    // console.log(" user.rows[0]", user.rows[0]);
    req.order = order.rows[0];
    next();
  } catch (error) {
    next(error);
  }
};

//all orders
const getAllOrders = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM orders");

    if (result.rows.length === 0) {
      throw { status: 404, message: "Not found" };
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: result.rows,
    });
    // res.send(result.rows);
  } catch (error) {
    next(error);
  }
};

//by Id
const getOrderById = async (req, res, next) => {
  try {
    const order = req.order;
    res.status(200).json({ status: "success", code: 200, data: order });
  } catch (error) {
    next(error);
  }
};

//change user
const putOrder = async (req, res, next) => {
  try {
    const id = req.params.id;

    const priceOrder = req.body.price;
    const dateOrder = req.body.date;
    const user_idOrder = req.body.user_id;

    const order = req.order;
    const newOrderPrice = priceOrder || order.price;
    const newOrderdate = dateOrder || order.date;
    const newOrderUser_id = user_idOrder || order.user_id;

    text = `UPDATE orders
  SET price = $1, date = $2, user_id=$3
  WHERE id=$4 RETURNING *`;
    const values = [newOrderPrice, newOrderdate, newOrderUser_id, id];

    const resultPut = await db.query(text, values);

    res.send(resultPut.rows[0]);
  } catch (error) {
    next(error);
  }
};

//delete userSelect:
const deleteOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resultDelete = await db.query(
      `DELETE FROM orders WHERE id=$1 RETURNING *`,
      [id]
    );
    //res.send(resultDelete.rows[0]);
    res.status(200).json({
      status: "success deleted",
      code: 200,
      data: resultDelete.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

//post user:
const postOrder = async (req, res, next) => {
  try {
    const { price, date, user_id } = req.body;
    if (!price || !date || !user_id) {
      throw { status: 400, message: "Bad Request. Field missing." };
    } else {
      const resultPost = await db.query(
        "INSERT INTO orders (price, date, user_id ) VALUES ($1, $2,$3)  RETURNING *",
        [price, date, user_id]
      );

      res
        .status(201)
        .json({ status: "Created ", code: 201, data: resultPost.rows[0] });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  putOrder,
  deleteOrder,
  postOrder,
  checkOrder,
};
