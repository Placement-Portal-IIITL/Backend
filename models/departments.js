const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Departments", departmentSchema);
