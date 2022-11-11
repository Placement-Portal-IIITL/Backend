const mongoose = require("mongoose");

const querySchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
    message: {
      type: String,
    },
    response: {
      type: String,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Queries", querySchema);
