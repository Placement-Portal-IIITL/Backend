const mongoose = require("mongoose");

const graduationGradeSchema = mongoose.Schema(
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
    degree: {
      type: String,
    },
    specialization: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GraduationGrades", graduationGradeSchema);
