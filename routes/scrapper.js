const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { handleValidationError } = require("../functions/validator");
const { isSignedIn, isInPlacementTeam } = require("../controllers/auth");

const {
  scrapCompanyProfile,
  scrapUserProfile,
} = require("../controllers/scrapper");

router.get(
  "/scrapCompanyProfile",
  isSignedIn,
  isInPlacementTeam,
  [check("profileId").notEmpty().withMessage("Profile Id is required")],
  handleValidationError,
  scrapCompanyProfile
);

router.get(
  "/scrapUserProfile",
  isSignedIn,
  isInPlacementTeam,
  [check("profileId").notEmpty().withMessage("Profile Id is required")],
  handleValidationError,
  scrapUserProfile
);

module.exports = router;
