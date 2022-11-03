const mongoose = require("mongoose");

const courseCreditSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    semester1: {
      type: Number,
    },
    semester2: {
      type: Number,
    },
    semester3: {
      type: Number,
    },
    semester4: {
      type: Number,
    },
    semester5: {
      type: Number,
    },
    semester6: {
      type: Number,
    },
    semester7: {
      type: Number,
    },
    semester8: {
      type: Number,
    },
    semester9: {
      type: Number,
    },
    semester10: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseCredits", courseCreditSchema);
