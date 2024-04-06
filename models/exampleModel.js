const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
  first_name: {
    type: String,
    minlength: [3, "Too Short!"],
    maxlength: [50, "Too Long!"],
    required: [true, "Required"],
  },
  last_name: {
    type: String,
    minlength: [3, "Too Short!"],
    maxlength: [50, "Too Long!"],
    required: [true, "Required"],
  },
  email: {
    type: String,
    validate: {
      validator: (value) => {
        return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(value);
      },
      message: "Must be a valid email!",
    },
    required: [true, "Required"],
  },
});

const Student = model("Student", studentSchema);

module.exports = Student;
