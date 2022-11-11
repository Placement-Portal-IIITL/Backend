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
  getQueryList,
  getQueryDetails,
  addQuery,
  markQueryAsResolved,
  deleteQuery,
} = require("../controllers/query.js");

router.get(
  "/getQueryList",
  isSignedIn,
  [
    check("studentId")
      .optional()
      .custom((studentId) => mongoose.isValidObjectId(studentId))
      .withMessage("Invalid Student Id"),
  ],
  handleValidationError,
  getQueryList
);

router.get(
  "/getQueryDetails",
  isSignedIn,
  [
    check("queryId")
      .notEmpty()
      .withMessage("Query Id is required")
      .custom((queryId) => mongoose.isValidObjectId(queryId))
      .withMessage("Invalid Query Id"),
  ],
  handleValidationError,
  getQueryDetails
);

router.post(
  "/addQuery",
  isSignedIn,
  isStudent,
  getStudentAuth,
  [check("message").notEmpty().withMessage("Message is required")],
  handleValidationError,
  addQuery
);

router.post(
  "/markQueryAsResolved",
  isSignedIn,
  [
    check("queryId")
      .notEmpty()
      .withMessage("Query Id is required")
      .custom((queryId) => mongoose.isValidObjectId(queryId))
      .withMessage("Invalid Query Id"),
    check("response").notEmpty().withMessage("Response is required"),
  ],
  handleValidationError,
  markQueryAsResolved
);

router.delete(
  "/deleteQuery",
  isSignedIn,
  [
    check("queryId")
      .notEmpty()
      .withMessage("Query Id is required")
      .custom((queryId) => mongoose.isValidObjectId(queryId))
      .withMessage("Invalid Query Id"),
  ],
  handleValidationError,
  deleteQuery
);

module.exports = router;
