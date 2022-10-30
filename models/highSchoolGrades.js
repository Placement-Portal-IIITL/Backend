const mongoose = require("mongoose");

const highSchoolGradeSchema = mongoose.Schema(
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

module.exports = mongoose.model("highSchoolGrades", highSchoolGradeSchema);
