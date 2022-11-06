const mongoose = require("mongoose");

const companySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    linkedIn: {
      type: String,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    natureOfBusiness: {
      type: String,
    },
    expectedCTC: {
      type: Number,
    },
    expectedBase: {
      type: Number,
    },
    expectedStipend: {
      type: Number,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Companies", companySchema);
