const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const { isInPlacementTeam, isSignedIn } = require("../controllers/auth");

const {
  getCompanyList,
  addCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/company.js");

router.get("/getCompanyList", isSignedIn, isInPlacementTeam, getCompanyList);

router.post(
  "/addCompany",
  isSignedIn,
  isInPlacementTeam,
  [check("name").notEmpty().withMessage("Company name is required")],
  handleValidationError,
  addCompany
);

router.post(
  "/updateCompany",
  isSignedIn,
  isInPlacementTeam,
  [
    check("companyId")
      .notEmpty()
      .withMessage("Company Id is required")
      .custom((companyId) => mongoose.isValidObjectId(companyId))
      .withMessage("Invalid Company Id"),
  ],
  handleValidationError,
  updateCompany
);

router.delete(
  "/deleteCompany",
  isSignedIn,
  isInPlacementTeam,
  [
    check("companyId")
      .notEmpty()
      .withMessage("Company Id is required")
      .custom((companyId) => mongoose.isValidObjectId(companyId))
      .withMessage("Invalid Company Id"),
  ],
  handleValidationError,
  deleteCompany
);

module.exports = router;
