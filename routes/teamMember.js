const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isInPlacementTeam, isSignedIn } = require("../controllers/auth");

const {
  getTeamMemberList,
  getTeamMemberDetails,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamMember");

router.get("/getTeamMemberList", isSignedIn, getTeamMemberList);

router.get(
  "/getTeamMemberDetails",
  isSignedIn,
  [
    check("teamMemberId")
      .optional()
      .custom((teamMemberId) => mongoose.isValidObjectId(teamMemberId))
      .withMessage("Invalid Team Member Id"),
    check("studentId")
      .optional()
      .custom((studentId) => mongoose.isValidObjectId(studentId))
      .withMessage("Invalid Studnet Id"),
  ],
  handleValidationError,
  getTeamMemberDetails
);

router.post(
  "/addTeamMember",
  isSignedIn,
  isInPlacementTeam,
  [
    check("studentId")
      .notEmpty()
      .withMessage("StudentId")
      .custom((studentId) => mongoose.isValidObjectId(studentId))
      .withMessage("Invalid Student Id"),
    check("name").notEmpty().withMessage("Name is required"),
    check("email").notEmpty().withMessage("Email is required"),
    check("designation").notEmpty().withMessage("Designation is required"),
    check("level").notEmpty().withMessage("Level is required"),
    check("year").notEmpty().withMessage("Year is required"),
  ],
  handleValidationError,
  addTeamMember
);

router.post(
  "/updateTeamMember",
  isSignedIn,
  isInPlacementTeam,
  [
    check("teamMemberId")
      .notEmpty()
      .withMessage("Team member Id is required")
      .custom((teamMemberId) => mongoose.isValidObjectId(teamMemberId))
      .withMessage("Invalid Team member Id"),
  ],
  handleValidationError,
  updateTeamMember
);

router.delete(
  "/deleteTeamMember",
  isSignedIn,
  isInPlacementTeam,
  [
    check("teamMemberId")
      .notEmpty()
      .withMessage("Team member Id is required")
      .custom((teamMemberId) => mongoose.isValidObjectId(teamMemberId))
      .withMessage("Invalid Team member Id"),
  ],
  handleValidationError,
  deleteTeamMember
);

module.exports = router;
