const TeamMembers = require("../models/teamMembers");

exports.getTeamMemberList = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    let findObj = {};
    if (req.query.year) {
      findObj.year = req.query.year;
    }

    const teamMemberCount = await TeamMembers.countDocuments(findObj);
    const teamMemberList = await TeamMembers.find(findObj)
      .sort({ year: -1, level: 1, _id: 1 })
      .skip((page - 1) * entriesPerPage)
      .limit(entriesPerPage)
      .exec();
    res.json({
      pageCount: Math.ceil(teamMemberCount / entriesPerPage),
      data: teamMemberList,
    });
  } catch (error) {
    console.log("Error occurred in /getTeamMemberList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getTeamMemberDetails = async (req, res) => {
  try {
    let findObj = {};
    if (req.query.teamMemberId) {
      findObj.teamMemberId = req.query.teamMemberId;
    } else if (req.query.studentId) {
      findObj.studentId = req.query.studentId;
    } else {
      findObj.studentId = req.auth.studentId;
    }
    const teamMember = await TeamMembers.findOne(findObj);
    if (!teamMember) {
      return res.status(404).json({ error: "Team member does not exist" });
    }
    res.json(teamMember);
  } catch (error) {
    console.log("Error occurred in /getTeamMemberDetails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addTeamMember = async (req, res) => {
  try {
    if (req.body.studentId) {
      const teamMember = await TeamMembers.findOne({
        studentId: req.body.studentId,
      });
      if (teamMember) {
        return res
          .status(400)
          .json({ error: "Student is already in placement team" });
      }
    }
    const newTeamMember = new TeamMembers(req.body);
    await newTeamMember.save();
    res.json(newTeamMember);
  } catch (error) {
    console.log("Error occurred in /addTeamMember", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    const teamMemberId = req.body.teamMemberId;
    const teamMember = await TeamMembers.findOne({ _id: teamMemberId });
    if (!teamMember) {
      return res.status(404).json({ error: "Team member does not exist" });
    }
    const updatedTeamMember = await TeamMembers.updateOne(
      { _id: teamMemberId },
      req.body
    );
    if (updatedTeamMember.modifiedCount == 0) {
      return res.status(500).json({ error: "Failed to update team member" });
    }
    res.json({ msg: "Team member updated successfully" });
  } catch (error) {
    console.log("Error occurred in /updateTeamMember", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    const teamMemberId = req.body.teamMemberId;
    const teamMember = await TeamMembers.findOne({ _id: teamMemberId });
    if (!teamMember) {
      return res.status(404).json({ error: "Team member does not exist" });
    }
    const deletedTeamMember = await TeamMembers.deleteOne({
      _id: teamMemberId,
    });
    if (deletedTeamMember.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete team member" });
    }
    res.json({ msg: "Team member deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /deleteTeamMember", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
