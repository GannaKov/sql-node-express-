const db = require("../db/client");
const { matchedData, validationResult } = require("express-validator");

//checkUser;
const checkUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (!user.rows[0]) {
      throw { status: 404, message: "User not found" };
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    next(error);
  }
};

//all users
const getAllUsers = async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM users");

    if (result.rows.length === 0) {
      throw { status: 404, message: "Not found" };
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

//by Id
const getUserById = async (req, res, next) => {
  try {
    const user = req.user;

    res.status(200).json({ status: "success", code: 200, data: user });
  } catch (error) {
    next(error);
  }
};

//put change user
const putUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const ageUser = req.body.age;
    const activeUser = req.body.active;
    // if (!firstName && !lastName) {
    //   throw { status: 400, message: "Bad Request" };
    // }
    const user = req.user;
    const newUserFirstName = firstName || user.first_name;
    const newUserLastName = lastName || user.last_name;
    const newUserAge = ageUser || user.age;
    const newUserActive = activeUser || user.active;
    text = `UPDATE users
  SET first_name = $1, last_name = $2, age=$3,active=$4
  WHERE id=$5 RETURNING *`;
    const values = [
      newUserFirstName,
      newUserLastName,
      newUserAge,
      newUserActive,
      id,
    ];
    const resultPut = await db.query(text, values);
    res.send(resultPut.rows[0]);
  } catch (error) {
    next(error);
  }
};

//delete userSelect:
const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resultDelete = await db.query(
      `DELETE FROM users WHERE id=$1 RETURNING *`,
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
const postUser = async (req, res, next) => {
  try {
    //const { first_name, last_name, age, active } = req.body;
    const validResult = validationResult(req);
    if (validResult.isEmpty()) {
      const { first_name, last_name, age, active } = matchedData(req);
      const resultPost = await db.query(
        "INSERT INTO users (first_name, last_name,age,active) VALUES ($1, $2,$3, $4)  RETURNING *",
        [first_name, last_name, age, active]
      );
      //return res.send(resultPost.rows[0]);

      res
        .status(201)
        .json({ status: "Created ", code: 201, data: resultPost.rows[0] });
    } else {
      throw {
        status: 400,
        message: `Bad Request: ${validResult.array()[0].path} is ${
          validResult.array()[0].value === undefined ? "missing " : "empty"
        }`,
        errors: validResult.array(),
      };
    }

    // if (!first_name || !last_name || !age) {
    //   throw { status: 400, message: "Bad Request" };
    // } else {
    //   const resultPost = await db.query(
    //     "INSERT INTO users (first_name, last_name,age,active) VALUES ($1, $2,$3, $4)  RETURNING *",
    //     [first_name, last_name, age, active]
    //   );
    //   //return res.send(resultPost.rows[0]);

    //   res
    //     .status(201)
    //     .json({ status: "Created ", code: 201, data: resultPost.rows[0] });
    // }
  } catch (error) {
    next(error);
  }
};

// GET orders of user
const getOrdersOfUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await db.query(`select * from orders where user_id=$1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      throw { status: 404, message: `Orders of user ${id} not found` };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result.rows,
    });
  } catch (error) {
    next(error);
  }
};

//PUT /:id/check-inactive
const changeStatusActiveUser = async (req, res, next) => {
  const id = req.params.id;
  const resultOrders = await db.query(`select * from orders where user_id=$1`, [
    id,
  ]);
  let usersActiveStatus;
  if (resultOrders.rows.length === 0) {
    usersActiveStatus = false;
  } else {
    usersActiveStatus = true;
  }

  const result = await db.query(
    `UPDATE users
  SET active=${usersActiveStatus}
  WHERE id=$1 RETURNING *`,
    [id]
  );
  res.status(200).json({
    status: "success updated status",
    code: 200,
    data: result.rows[0],
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  putUser,
  deleteUser,
  postUser,
  checkUser,
  getOrdersOfUser,
  changeStatusActiveUser,
};
