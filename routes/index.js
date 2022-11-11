const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const accountRoutes = require("./account");
const departmentRoutes = require("./department");
const courseRoutes = require("./course");
const studentRoutes = require("./student");
const companyRoutes = require("./company");
const recruiterRoutes = require("./recruiter");
const scrapperRouters = require("./scrapper");
const recruiterEmailRoutes = require("./recruiterEmail");
const recruiterPhoneNoRoutes = require("./recruiterPhoneNo");
const queryRoutes = require("./query");
const announcementRoutes = require("./announcement");

router.use("/", authRoutes);
router.use("/", accountRoutes);
router.use("/", departmentRoutes);
router.use("/", courseRoutes);
router.use("/", studentRoutes);
router.use("/", companyRoutes);
router.use("/", recruiterRoutes);
router.use("/", scrapperRouters);
router.use("/", recruiterEmailRoutes);
router.use("/", recruiterPhoneNoRoutes);
router.use("/", queryRoutes);
router.use("/", announcementRoutes);

module.exports = router;
