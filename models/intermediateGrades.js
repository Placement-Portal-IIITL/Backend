const mongoose = require("mongoose");

const intermediateGradeSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    gradeType: {
      type: String,
    },
    grade: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IntermediateGrades", intermediateGradeSchema);
