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
    emails: {
      type: Array,
      default: [],
    },
    phoneNumbers: {
      type: Array,
      default: [],
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recruiters", recruiterSchema);
