const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isSignedIn, isInPlacementTeam } = require("../controllers/auth");

const {
  getRecruiterPhoneNos,
  getRecruiterPhoneNoDetails,
  addRecruiterPhoneNo,
  updateRecruiterPhoneNo,
  deleteRecruiterPhoneNo,
} = require("../controllers/recruiterPhoneNo");

router.get(
  "/getRecruiterPhoneNos",
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
  getRecruiterPhoneNos
);

router.get(
  "/getRecruiterPhoneNoDetails",
  isSignedIn,
  isInPlacementTeam,
  [
    check("phoneNoId")
      .notEmpty()
      .withMessage("Phone No. Id is required")
      .custom((phoneNoId) => mongoose.isValidObjectId(phoneNoId))
      .withMessage("Invalid Phone No. Id"),
  ],
  handleValidationError,
  getRecruiterPhoneNoDetails
);

router.post(
  "/addRecruiterPhoneNo",
  isSignedIn,
  isInPlacementTeam,
  [
    check("recruiterId")
      .notEmpty()
      .withMessage("Recruiter Id is required")
      .custom((recruiterId) => mongoose.isValidObjectId(recruiterId))
      .withMessage("Invalid Recruiter Id"),
    check("countryCode").notEmpty().withMessage("Country code is required"),
    check("phoneNo").notEmpty().withMessage("Phone No. is required"),
  ],
  handleValidationError,
  addRecruiterPhoneNo
);

router.post(
  "/updateRecruiterPhoneNo",
  isSignedIn,
  isInPlacementTeam,
  [
    check("phoneNoId")
      .notEmpty()
      .withMessage("Phone No. Id is required")
      .custom((phoneNoId) => mongoose.isValidObjectId(phoneNoId))
      .withMessage("Invalid Phone No. Id"),
  ],
  handleValidationError,
  updateRecruiterPhoneNo
);

router.delete(
  "/deleteRecruiterPhoneNo",
  isSignedIn,
  isInPlacementTeam,
  [
    check("phoneNoId")
      .notEmpty()
      .withMessage("Phone No. Id is required")
      .custom((phoneNoId) => mongoose.isValidObjectId(phoneNoId))
      .withMessage("Invalid Phone No. Id"),
  ],
  handleValidationError,
  deleteRecruiterPhoneNo
);

module.exports = router;
