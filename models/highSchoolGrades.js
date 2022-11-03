const mongoose = require("mongoose");

const highSchoolGradeSchema = mongoose.Schema(
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

module.exports = mongoose.model("HighSchoolGrades", highSchoolGradeSchema);
