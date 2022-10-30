const mongoose = require("mongoose");

const intermediateGradeSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    gradeType: {
      type: String,
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("intermediateGrades", intermediateGradeSchema);
