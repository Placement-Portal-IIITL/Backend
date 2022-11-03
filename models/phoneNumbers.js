const mongoose = require("mongoose");

const phoneNumberSchema = mongoose.Schema(
  {
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

module.exports = mongoose.model("PhoneNumbers", phoneNumberSchema);
