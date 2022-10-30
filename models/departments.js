const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Departments", departmentSchema);
