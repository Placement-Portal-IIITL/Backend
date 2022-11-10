const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isInPlacementTeam, isSignedIn } = require("../controllers/auth");

const {
  getCourseList,
  addCourse,
  deleteCourse,
  addDepartmentInCourse,
  updateCourse,
} = require("../controllers/course.js");

router.get("/getCourseList", getCourseList);

router.post(
  "/addCourse",
  isSignedIn,
  isInPlacementTeam,
  [check("courseName").notEmpty().withMessage("Course name is required")],
  handleValidationError,
  addCourse
);

router.post(
  "/updateCourse",
  isSignedIn,
  isInPlacementTeam,
  [
    check("courseId")
      .notEmpty()
      .withMessage("Course Id is required")
      .custom((courseId) => mongoose.isValidObjectId(courseId))
      .withMessage("Invalid Course Id"),
  ],
  handleValidationError,
  updateCourse
);

router.post(
  "/addDepartmentInCourse",
  isSignedIn,
  isInPlacementTeam,
  [
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
  ],
  handleValidationError,
  addDepartmentInCourse
);

router.delete(
  "/deleteCourse",
  isSignedIn,
  isInPlacementTeam,
  [
    check("courseId")
      .notEmpty()
      .withMessage("Course Id is required")
      .custom((courseId) => mongoose.isValidObjectId(courseId))
      .withMessage("Invalid Course Id"),
  ],
  handleValidationError,
  deleteCourse
);

module.exports = router;
