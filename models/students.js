const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    collegeEmail: {
      type: String,
      required: true,
    },
    personalEmail: {
      type: String,
      required: true,
    },
    enrollmentNo: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      requierd: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    departmentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    departmentName: {
      type: String,
      required: true,
    },
    passingYear: {
      type: Number,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    altPhoneNo: {
      type: Number,
      required: true,
    },
    resumeLink: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    maxCTCOffered: {
      type: Number,
    },
    photo: {
      type: String,
    },
    aadhar: {
      type: String,
    },
    PAN: {
      type: String,
    },
    addressId: {
      type: mongoose.Types.ObjectId,
    },
    isParticipatingInPlacements: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Students", studentSchema);
