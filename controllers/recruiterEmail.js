const RecruiterEmails = require("../models/recruiterEmails");

exports.getRecruiterEmails = async (req, res) => {
  try {
    const recruiterEmails = await RecruiterEmails.find({
      recruiterId: req.query.recruiterId,
    });
    return res.json(recruiterEmails);
  } catch (error) {
    console.log("Error occurred in /getRecruiterEmails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getRecruiterEmailDetails = async (req, res) => {
  try {
    const recruiterEmail = await RecruiterEmails.findOne({
      _id: req.query.emailId,
    });
    if (!recruiterEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    return res.json(recruiterEmail);
  } catch (error) {
    console.log("Error occurred in /getRecruiterEmailDetails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addRecruiterEmail = async (req, res) => {
  try {
    const recruiterEmail = await RecruiterEmails.findOne({
      recruiterId: req.body.recruiterId,
      email: req.body.email,
    });
    if (recruiterEmail) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const newRecruiterEmail = new RecruiterEmails(req.body);
    await newRecruiterEmail.save();
    res.json(newRecruiterEmail);
  } catch (error) {
    console.log("Error occurred in /addRecruiterEmail", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateRecruiterEmail = async (req, res) => {
  try {
    const recruiterEmail = await RecruiterEmails.findOne({
      _id: req.body.emailId,
    });
    if (!recruiterEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    const updatedRecruiterEmail = await RecruiterEmails.updateOne(
      { _id: req.body.emailId },
      req.body
    );
    if (updatedRecruiterEmail.modifiedCount == 0) {
      return res
        .status(500)
        .json({ error: "Failed to update recruiter email" });
    }
    res.json({ msg: "Email updated successfully" });
  } catch (error) {
    console.log("Error occurred in /updateRecruiterEmail", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteRecruiterEmail = async (req, res) => {
  try {
    const recruiterEmail = await RecruiterEmails.findOne({
      _id: req.body.emailId,
    });
    if (!recruiterEmail) {
      return res.status(404).json({ error: "Email not found" });
    }
    const deletedRecruiterEmail = await RecruiterEmails.deleteOne({
      _id: req.body.emailId,
    });
    if (deletedRecruiterEmail.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete email" });
    }
    res.json({ msg: "Email deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /deleteRecruiterEmail", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
