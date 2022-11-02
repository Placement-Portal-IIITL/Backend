const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isSignedIn } = require("../controllers/auth");

const { studentRegister } = require("../controllers/student");

router.post(
  "/studentRegister",
  isSignedIn,
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("gender").notEmpty().withMessage("Gender is required"),
    check("personalEmail").notEmpty().withMessage("Personal email is required"),
    check("enrollmentNo").notEmpty().withMessage("Enrollment No. is required"),
    check("courseId")
      .notEmpty()
      .withMessage("Course Id is required")
      .custom((courseId) => mongoose.isValidObjectId(courseId))
      .withMessage("Invalid Course Id"),
    check("departmentId")
      .notEmpty()
      .withMessage("Department Id is required")
      .custom((departmentId) => mongoose.isValidObjectId(departmentId))
      .withMessage("Invalid Department Id"),
    check("passingYear").notEmpty().withMessage("Passing year is required"),
    check("phoneNo").notEmpty().withMessage("Phone No is required"),
    check("altPhoneNo").notEmpty().withMessage("Alt Phone No is required"),
  ],
  handleValidationError,
  studentRegister
);

module.exports = router;
