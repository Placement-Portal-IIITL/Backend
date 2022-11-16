const Announcements = require("../models/announcements");
const Students = require("../models/students");

exports.newAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcements({
      ...req.body,
      studentId: req.auth.studentId,
    });
    await announcement.save();
    res.json(announcement);
  } catch (error) {
    console.log("Error occurred in /newAnnouncement", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getAnnouncementDetails = async (req, res) => {
  try {
    const announcement = await Announcements.findOne({
      _id: req.query.announcementId,
    });
    if (!announcement) {
      return res.status(404).json({ error: "Announcement does not exist" });
    }
    res.json(announcement);
  } catch (error) {
    console.log("Error occurred in /getAnnouncementDetails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    const studentProfile = await Students.findOne({
      userId: req.auth._id,
    }).select({
      _id: 1,
      courseId: 1,
      passingYear: 1,
    });

    let findObj = {
      courseId: { $in: [studentProfile.courseId] },
      year: studentProfile.passingYear,
    };
    const announcementCount = await Announcements.countDocuments(findObj);
    const announcements = await Announcements.find(findObj)
      .sort({ createdAt: -1 })
      .skip((page - 1) * entriesPerPage)
      .limit(entriesPerPage)
      .exec();
    return res.json({
      pageCount: Math.ceil(announcementCount / entriesPerPage),
      data: announcements,
    });
  } catch (error) {
    console.log("Error occurred in /getAnnouncements", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getAdminAnnouncements = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    let findObj = {};
    if (req.query.courseId) {
      findObj.courseId = { $in: [req.query.courseId] };
    }
    if (req.query.year && Number(req.query.year)) {
      findObj.year = Number(req.query.year);
    }
    const announcementCount = await Announcements.countDocuments(findObj);
    const announcements = await Announcements.find(findObj)
      .sort({ createdAt: -1 })
      .skip((page - 1) * entriesPerPage)
      .limit(entriesPerPage)
      .exec();
    return res.json({
      pageCount: Math.ceil(announcementCount / entriesPerPage),
      data: announcements,
    });
  } catch (error) {
    console.log("Error occurred in /getAnnouncements", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcements.findOne({
      _id: req.body.announcementId,
    });
    if (!announcement) {
      return res.status(404).json({ error: "Announcement does not exist" });
    }
    const updatedAnnouncement = await Announcements.updateOne(
      { _id: req.body.announcementId },
      { ...req.body, lastUpdatedBy: req.auth.studentId }
    );
    if (updatedAnnouncement.modifiedCount == 0) {
      return res.status(500).json({ error: "Failed to update announcement" });
    }
    res.json({ msg: "Announcement updated successfully" });
  } catch (error) {
    console.log("Error occurred in /updateAnnouncement", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcements.findOne({
      _id: req.body.announcementId,
    });
    if (!announcement) {
      return res.status(404).json({ error: "Announcement does not exist" });
    }
    const deletedAnnouncement = await Announcements.deleteOne({
      _id: req.body.announcementId,
    });
    if (deletedAnnouncement.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete announcement" });
    }
    res.json({ msg: "Announcement deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /deleteAnnouncement", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
