const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isSignedIn, isInPlacementTeam } = require("../controllers/auth");

const {
  getRecruiterEmails,
  getRecruiterEmailDetails,
  addRecruiterEmail,
  updateRecruiterEmail,
  deleteRecruiterEmail,
} = require("../controllers/recruiterEmail");

router.get(
  "/getRecruiterEmails",
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
  getRecruiterEmails
);

router.get(
  "/getRecruiterEmailDetails",
  isSignedIn,
  isInPlacementTeam,
  [
    check("emailId")
      .notEmpty()
      .withMessage("Email Id is required")
      .custom((emailId) => mongoose.isValidObjectId(emailId))
      .withMessage("Invalid EmailId"),
  ],
  handleValidationError,
  getRecruiterEmailDetails
);

router.post(
  "/addRecruiterEmail",
  isSignedIn,
  isInPlacementTeam,
  [
    check("recruiterId")
      .notEmpty()
      .withMessage("Recruiter Id is required")
      .custom((recruiterId) => mongoose.isValidObjectId(recruiterId))
      .withMessage("Invalid Recruiter Id"),
    check("email").isEmail().withMessage("Email is required"),
  ],
  handleValidationError,
  addRecruiterEmail
);

router.post(
  "/updateRecruiterEmail",
  isSignedIn,
  isInPlacementTeam,
  [
    check("emailId")
      .notEmpty()
      .withMessage("Email Id is required")
      .custom((emailId) => mongoose.isValidObjectId(emailId))
      .withMessage("Invalid EmailId"),
  ],
  handleValidationError,
  updateRecruiterEmail
);

router.delete(
  "/deleteRecruiterEmail",
  isSignedIn,
  isInPlacementTeam,
  [
    check("emailId")
      .notEmpty()
      .withMessage("Email Id is required")
      .custom((emailId) => mongoose.isValidObjectId(emailId))
      .withMessage("Invalid EmailId"),
  ],
  handleValidationError,
  deleteRecruiterEmail
);

module.exports = router;
