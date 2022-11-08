const mongoose = require("mongoose");

const emailSchema = mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Types.ObjectId,
    },
    email: {
      type: String,
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Emails", emailSchema);
