const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isInPlacementTeam, isSignedIn } = require("../controllers/auth");

const {
  getRecruiterList,
  getRecruiterDetails,
  addRecruiter,
  updateRecruiter,
  deleteRecruiter,
} = require("../controllers/recruiter.js");

router.get(
  "/getRecruiterList",
  isSignedIn,
  isInPlacementTeam,
  [
    check("companyId")
      .optional()
      .custom((companyId) => mongoose.isValidObjectId(companyId))
      .withMessage("Invalid Company Id"),
  ],
  handleValidationError,
  getRecruiterList
);

router.get(
  "/getRecruiterDetails",
  isSignedIn,
  isInPlacementTeam,
  [
    check("recruiterId")
      .notEmpty()
      .withMessage("Recruiter Id is required")
      .custom((recruiterId) => mongoose.isValidObjectId(recruiterId))
      .withMessage("Invalid Recruiter Id"),
  ],
  handleValidationError,
  getRecruiterDetails
);

router.post(
  "/addRecruiter",
  isSignedIn,
  isInPlacementTeam,
  [check("firstName").notEmpty().withMessage("Recruiter name is required")],
  handleValidationError,
  addRecruiter
);

router.post(
  "/updateRecruiter",
  isSignedIn,
  isInPlacementTeam,
  [
    check("recruiterId")
      .notEmpty()
      .withMessage("Recruiter Id is required")
      .custom((recruiterId) => mongoose.isValidObjectId(recruiterId))
      .withMessage("Invalid Recruiter Id"),
  ],
  handleValidationError,
  updateRecruiter
);

router.delete(
  "/deleteRecruiter",
  isSignedIn,
  isInPlacementTeam,
  [
    check("recruiterId")
      .notEmpty()
      .withMessage("Recruiter Id is required")
      .custom((recruiterId) => mongoose.isValidObjectId(recruiterId))
      .withMessage("Invalid Recruiter Id"),
  ],
  handleValidationError,
  deleteRecruiter
);

module.exports = router;
