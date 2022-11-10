const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isInPlacementTeam, isSignedIn } = require("../controllers/auth");

const {
  getDepartmentList,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department.js");

router.get("/getDepartmentList", getDepartmentList);

router.post(
  "/addDepartment",
  isSignedIn,
  isInPlacementTeam,
  [
    check("departmentName")
      .notEmpty()
      .withMessage("Department name is required"),
  ],
  handleValidationError,
  addDepartment
);

router.post(
  "/updateDepartment",
  isSignedIn,
  isInPlacementTeam,
  [
    check("departmentId")
      .notEmpty()
      .withMessage("Department Id is required")
      .custom((departmentId) => mongoose.isValidObjectId(departmentId))
      .withMessage("Invalid DepartmentId"),
  ],
  handleValidationError,
  updateDepartment
);

router.delete(
  "/deleteDepartment",
  isSignedIn,
  isInPlacementTeam,
  [
    check("departmentId")
      .notEmpty()
      .withMessage("Department Id is required")
      .custom((departmentId) => mongoose.isValidObjectId(departmentId))
      .withMessage("Invalid DepartmentId"),
  ],
  handleValidationError,
  deleteDepartment
);

module.exports = router;
