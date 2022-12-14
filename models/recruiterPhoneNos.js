const mongoose = require("mongoose");

const phoneNoSchema = mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    countryCode: {
      type: Number,
    },
    phoneNo: {
      type: Number,
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

module.exports = mongoose.model("RecruiterPhoneNos", phoneNoSchema);
