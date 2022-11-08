const RecruiterPhoneNos = require("../models/recruiterPhoneNos");

exports.getRecruiterPhoneNos = async (req, res) => {
  try {
    const recruiterPhoneNos = await RecruiterPhoneNos.find({
      recruiterId: req.query.recruiterId,
    });
    return res.json(recruiterPhoneNos);
  } catch (error) {
    console.log("Error occurred in /getRecruiterPhoneNos", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getRecruiterPhoneNoDetails = async (req, res) => {
  try {
    const recruiterPhoneNo = await RecruiterPhoneNos.findOne({
      _id: req.query.phoneNoId,
    });
    if (!recruiterPhoneNo) {
      return res.status(404).json({ error: "Phone No. not found" });
    }
    return res.json(recruiterPhoneNo);
  } catch (error) {
    console.log("Error occurred in /getRecruiterPhoneNoDetails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addRecruiterPhoneNo = async (req, res) => {
  try {
    const recruiterPhoneNo = await RecruiterPhoneNos.findOne({
      recruiterId: req.body.recruiterId,
      phoneNo: req.body.phoneNo,
    });
    if (recruiterPhoneNo) {
      return res.status(400).json({ error: "Phone No. already exists" });
    }
    const newRecruiterPhoneNo = new RecruiterPhoneNos(req.body);
    await newRecruiterPhoneNo.save();
    res.json(newRecruiterPhoneNo);
  } catch (error) {
    console.log("Error occurred in /addRecruiterPhoneNo", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateRecruiterPhoneNo = async (req, res) => {
  try {
    const recruiterPhoneNo = await RecruiterPhoneNos.findOne({
      _id: req.body.phoneNoId,
    });
    if (!recruiterPhoneNo) {
      return res.status(404).json({ error: "Phone No. not found" });
    }
    const updatedRecruiterPhoneNo = await RecruiterPhoneNos.updateOne(
      { _id: req.body.phoneNoId },
      req.body
    );
    if (updatedRecruiterPhoneNo.modifiedCount == 0) {
      return res
        .status(500)
        .json({ error: "Failed to update recruiter phone no." });
    }
    res.json({ msg: "Phone No. updated successfully" });
  } catch (error) {
    console.log("Error occurred in /updateRecruiterPhoneNo", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteRecruiterPhoneNo = async (req, res) => {
  try {
    const recruiterPhoneNo = await RecruiterPhoneNos.findOne({
      _id: req.body.phoneNoId,
    });
    if (!recruiterPhoneNo) {
      return res.status(404).json({ error: "Phone No. not found" });
    }
    const deletedRecruiterPhoneNo = await RecruiterPhoneNos.deleteOne({
      _id: req.body.phoneNoId,
    });
    if (deletedRecruiterPhoneNo.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete phone no." });
    }
    res.json({ msg: "Phone No. deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /deleteRecruiterPhoneNo", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
