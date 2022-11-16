const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const {
  isInPlacementTeam,
  isSignedIn,
  isStudent,
  getStudentAuth,
} = require("../controllers/auth");

const {
  newAnnouncement,
  getAnnouncementDetails,
  getAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  getAdminAnnouncements,
} = require("../controllers/announcement");

router.post(
  "/newAnnouncement",
  isSignedIn,
  isStudent,
  getStudentAuth,
  isInPlacementTeam,
  [
    check("title").notEmpty().withMessage("Title is required"),
    check("content").notEmpty().withMessage("Content is required"),
    check("year").notEmpty().withMessage("Year is required"),
  ],
  handleValidationError,
  newAnnouncement
);

router.get(
  "/getAnnouncementDetails",
  isSignedIn,
  isStudent,
  [
    check("announcementId")
      .notEmpty()
      .withMessage("Announcement Id is required")
      .custom((announcementId) => mongoose.isValidObjectId(announcementId))
      .withMessage("Invalid Announcement Id"),
  ],
  handleValidationError,
  getAnnouncementDetails
);

router.get(
  "/getAnnouncements",
  isSignedIn,
  isStudent,
  getStudentAuth,
  getAnnouncements
);

router.get(
  "/getAdminAnnouncements",
  isSignedIn,
  isInPlacementTeam,
  getAdminAnnouncements
);

router.post(
  "/updateAnnouncement",
  isSignedIn,
  isStudent,
  getStudentAuth,
  isInPlacementTeam,
  [
    check("announcementId")
      .notEmpty()
      .withMessage("Announcement Id is required")
      .custom((announcementId) => mongoose.isValidObjectId(announcementId))
      .withMessage("Invalid Announcement Id"),
  ],
  handleValidationError,
  updateAnnouncement
);

router.delete(
  "/deleteAnnouncement",
  isSignedIn,
  isInPlacementTeam,
  [
    check("announcementId")
      .notEmpty()
      .withMessage("Announcement Id is required")
      .custom((announcementId) => mongoose.isValidObjectId(announcementId))
      .withMessage("Invalid Announcement Id"),
  ],
  handleValidationError,
  deleteAnnouncement
);

module.exports = router;
