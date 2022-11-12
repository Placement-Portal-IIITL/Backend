const Queries = require("../models/queries");

exports.getQueryList = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    let findObj = { studentId: req.auth.studentId };
    if (req.query.isResolved && Boolean(req.query.isResolved)) {
      findObj.isResolved = req.query.isResolved;
    }
    const queryCount = await Queries.countDocuments(findObj);
    const queryList = await Queries.find(findObj)
      .sort({ createdAt: -1 })
      .skip((page - 1) * entriesPerPage)
      .limit(entriesPerPage)
      .exec();
    return res.json({
      pageCount: Math.ceil(queryCount / entriesPerPage),
      data: queryList,
    });
  } catch (error) {
    console.log("Error occurred in /getQueryList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getAdminQueryList = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    let findObj = {};
    if (req.query.studentId) {
      findObj.studentId = req.query.studentId;
    }
    if (req.query.isResolved && Boolean(req.query.isResolved)) {
      findObj.isResolved = req.query.isResolved;
    }
    const queryCount = await Queries.countDocuments(findObj);
    const queryList = await Queries.find(findObj)
      .sort({ createdAt: -1 })
      .skip((page - 1) * entriesPerPage)
      .limit(entriesPerPage)
      .exec();
    return res.json({
      pageCount: Math.ceil(queryCount / entriesPerPage),
      data: queryList,
    });
  } catch (error) {
    console.log("Error occurred in /getQueryList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getQueryDetails = async (req, res) => {
  try {
    const query = await Queries.findOne({ _id: req.query.queryId });
    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }
    res.json(query);
  } catch (error) {
    console.log("Error occurred in /getQueryDetails", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addQuery = async (req, res) => {
  try {
    const query = new Queries({ ...req.body, studentId: req.auth.studentId });
    await query.save();
    res.json(query);
  } catch (error) {
    console.log("Error occurred in /addQuery", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.markQueryAsResolved = async (req, res) => {
  try {
    const query = await Queries.findOne({ _id: req.body.queryId });
    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }
    const updatedQuery = await Queries.updateOne(
      { _id: req.body.queryId },
      { isResolved: true, response: req.body.response }
    );
    if (updatedQuery.modifiedCount == 0) {
      return res.status(500).json({ error: "Failed to update query" });
    }
    res.json({ msg: "Marked query as resolved" });
  } catch (error) {
    console.log("Error occurred in /markQueryAsResolved", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteQuery = async (req, res) => {
  try {
    const query = await Queries.findOne({ _id: req.body.queryId });
    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }
    const deletedQuery = await Queries.deleteOne({ _id: req.body.queryId });
    if (deletedQuery.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete query" });
    }
    res.json({ msg: "Query deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /deleteQuery", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
