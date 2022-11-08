const Recruiters = require("../models/recruiters");

exports.getRecruiterList = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    let findObj = {};
    if (req.query.companyId) {
      findObj.companyId = req.query.companyId;
    }

    let sortObj = { name: 1, _id: 1 };

    if (!req.query.searchQuery) {
      const recruiterCount = await Recruiters.countDocuments(findObj);
      const recruiterList = await Recruiters.find(findObj)
        .sort(sortObj)
        .skip((page - 1) * entriesPerPage)
        .limit(entriesPerPage)
        .exec();
      return res.json({
        pageCount: Math.ceil(recruiterCount / entriesPerPage),
        data: recruiterList,
      });
    }
    const searchResults = await Recruiters.aggregate([
      {
        $search: {
          index: "Recruiter",
          text: { query: req.query.searchQuery, path: { wildcard: "*" } },
        },
      },
      {
        $match: findObj,
      },
      {
        $sort: sortObj,
      },
    ]);
    let recruiterCount = 0;
    const data = searchResults.filter(() => {
      recruiterCount++;
      if (
        recruiterCount > (page - 1) * entriesPerPage &&
        recruiterCount <= page * entriesPerPage
      )
        return true;
      return false;
    });
    res.json({ totalPages: Math.ceil(recruiterCount / entriesPerPage), data });
  } catch (error) {
    console.log("Error occurred in /getRecruiterList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getRecruiterDetails = async (req, res) => {
  try {
    const recruiter = await Recruiters.findOne({
      _id: req.query.recruiterId,
    });
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter does not exist" });
    }
    res.json(recruiter);
  } catch (error) {
    console.log("Error occurred in /getRecruiterDetails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addRecruiter = async (req, res) => {
  try {
    const newRecruiter = new Recruiters(req.body);
    await newRecruiter.save();
    res.json(newRecruiter);
  } catch (error) {
    console.log("Error occurred in /addRecruiter", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateRecruiter = async (req, res) => {
  try {
    const recruiterId = req.body.recruiterId;
    const recruiter = await Recruiters.findOne({ _id: recruiterId });
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter does not exist" });
    }
    const updatedRecruiter = await Recruiters.updateOne(
      { _id: recruiterId },
      req.body
    );
    if (updatedRecruiter.modifiedCount == 0) {
      return res.status(500).json({ error: "Failed to update recruiter" });
    }
    res.json({ msg: "Recruiter updated successfully" });
  } catch (error) {
    console.log("Error occurred in /updateRecruiter", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteRecruiter = async (req, res) => {
  try {
    const recruiterId = req.body.recruiterId;
    const recruiter = await Recruiters.findOne({ _id: recruiterId });
    if (!recruiter) {
      return res.status(404).json({ error: "Recruiter does not exist" });
    }
    const deletedRecruiter = await Recruiters.deleteOne({ _id: recruiterId });
    if (deletedRecruiter.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete recruiter" });
    }
    res.json({ msg: "Recruiter deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /deleteRecruiter", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
