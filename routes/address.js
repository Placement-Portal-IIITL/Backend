const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const mongoose = require("mongoose");

const { handleValidationError } = require("../functions/validator");
const {
  isSignedIn,
  isStudent,
  getStudentAuth,
} = require("../controllers/auth");

const {
  addAddress,
  getAddress,
  deleteAddress,
  getAddressList,
} = require("../controllers/address");

router.post(
  "/addAddress",
  isSignedIn,
  isStudent,
  getStudentAuth,
  [
    check("address").notEmpty().withMessage("Address is required"),
    check("city").notEmpty().withMessage("City name is required"),
    check("state").notEmpty().withMessage("State name is required"),
    check("zipCode").notEmpty().withMessage("Zip code is required"),
  ],
  handleValidationError,
  addAddress
);

router.get(
  "/getAddress",
  isSignedIn,
  [
    check("addressId")
      .notEmpty()
      .withMessage("Address Id is required")
      .custom((addressId) => mongoose.isValidObjectId(addressId))
      .withMessage("Invalid Address Id"),
  ],
  handleValidationError,
  getAddress
);

router.get(
  "/getAddressList",
  isSignedIn,
  isStudent,
  getStudentAuth,
  getAddressList
);

router.delete(
  "/deleteAddress",
  isSignedIn,
  isStudent,
  getStudentAuth,
  [
    check("addressId")
      .notEmpty()
      .withMessage("Address Id is required")
      .custom((addressId) => mongoose.isValidObjectId(addressId))
      .withMessage("Invalid Address Id"),
  ],
  handleValidationError,
  deleteAddress
);

module.exports = router;
