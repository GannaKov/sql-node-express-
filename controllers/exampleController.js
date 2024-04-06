const Student = require("../models/exampleModel");

const getAllStudents = async (req, res, next) => {
  try {
    const result = await Student.find();

    if (result.length === 0) {
      throw { status: 404, message: "No student found" };
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = { getAllStudents };
