const mongoose = require("mongoose");

const announcementSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    courseId: {
      type: Array,
      default: [],
    },
    lastUpdatedBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcements", announcementSchema);
