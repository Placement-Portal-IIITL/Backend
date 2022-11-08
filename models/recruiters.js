const mongoose = require("mongoose");

const recruiterSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    linkedIn: {
      type: String,
    },
    gender: {
      type: String,
    },
    designation: {
      type: String,
    },
    companyId: {
      type: mongoose.Types.ObjectId,
    },
    photo: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recruiters", recruiterSchema);
