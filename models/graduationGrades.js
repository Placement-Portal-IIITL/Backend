const mongoose = require("mongoose");

const graduationGradeSchema = mongoose.Schema(
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
    degree: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("graduationGrades", graduationGradeSchema);
