const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Addresses", addressSchema);
