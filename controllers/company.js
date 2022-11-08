const Companies = require("../models/companies");

exports.getCompanyList = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const entriesPerPage = Number(req.query.entriesPerPage) || 10;

    let findObj = {};
    if (req.query.minCTC && req.query.maxCTC) {
      findObj.expectedCTC = {
        $gte: Number(req.query.minCTC),
        $lte: Number(req.query.maxCTC),
      };
    } else if (req.query.minCTC) {
      findObj.expectedCTC = { $gte: Number(req.query.minCTC) };
    } else if (req.query.maxCTC) {
      findObj.expectedCTC = { $lte: Number(req.query.maxCTC) };
    }
    if (req.query.minBase && req.query.maxBase) {
      findObj.expectedBase = {
        $gte: Number(req.query.minBase),
        $lte: Number(req.query.maxBase),
      };
    } else if (req.query.minBase) {
      findObj.expectedBase = { $gte: Number(req.query.minBase) };
    } else if (req.query.maxBase) {
      findObj.expectedBase = { $lte: Number(req.query.maxBase) };
    }
    if (req.query.minStipend && req.query.maxStipend) {
      findObj.expectedStipend = {
        $gte: Number(req.query.minStipend),
        $lte: Number(req.query.maxStipend),
      };
    } else if (req.query.minStipend) {
      findObj.expectedStipend = { $gte: Number(req.query.minStipend) };
    } else if (req.query.maxStipend) {
      findObj.expectedStipend = { $lte: Number(req.query.maxStipend) };
    }

    let sortObj = {};
    if (req.query.sortByName) {
      sortObj.name = Number(req.query.sortByName);
    }
    if (req.query.sortByDate) {
      sortObj.createdAt = Number(req.query.sortByDate);
    }
    if (req.query.sortByCTC) {
      sortObj.expectedCTC = Number(req.query.sortByCTC);
    }
    if (req.query.sortByBase) {
      sortObj.expectedBase = Number(req.query.sortByBase);
    }
    if (req.query.sortByStipend) {
      sortObj.expectedStipend = Number(req.query.sortByStipend);
    }
    sortObj._id = 1;

    if (!req.query.searchQuery) {
      const companyCount = await Companies.countDocuments(findObj);
      const companyList = await Companies.find(findObj)
        .sort(sortObj)
        .skip((page - 1) * entriesPerPage)
        .limit(entriesPerPage)
        .exec();
      return res.json({
        pageCount: Math.ceil(companyCount / entriesPerPage),
        data: companyList,
      });
    }
    const searchResults = await Companies.aggregate([
      {
        $search: {
          index: "Company",
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
    let companyCount = 0;
    const data = searchResults.filter(() => {
      companyCount++;
      if (
        companyCount > (page - 1) * entriesPerPage &&
        companyCount <= page * entriesPerPage
      )
        return true;
      return false;
    });
    res.json({ totalPages: Math.ceil(companyCount / entriesPerPage), data });
  } catch (error) {
    console.log("Error occurred in /getCompanyList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.getCompanyDetails = async (req, res) => {
  try {
    const company = await Companies.findOne({ _id: req.query.companyId });
    if (!company) {
      return res.status(404).json({ error: "Company does not exist" });
    }
    res.json(company);
  } catch (error) {
    console.log("Error occurred in /addCompany", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addCompany = async (req, res) => {
  try {
    const company = await Companies.findOne({ name: req.body.name });
    if (company) {
      return res
        .status(400)
        .json({ error: "Company with same name already exist" });
    }
    const newCompany = new Companies(req.body);
    await newCompany.save();
    res.json(newCompany);
  } catch (error) {
    console.log("Error occurred in /addCompany", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const company = await Companies.findOne({ _id: companyId });
    if (!company) {
      return res.status(404).json({ error: "Company does not exist" });
    }
    const updatedCompany = await Companies.updateOne(
      { _id: companyId },
      req.body
    );
    if (updatedCompany.modifiedCount == 0) {
      return res.status(500).json({ error: "Failed to update company" });
    }
    res.json({ msg: "Company updated successfully" });
  } catch (error) {
    console.log("Error occurred in /getCompanyList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const companyId = req.body.companyId;
    const company = await Companies.findOne({ _id: companyId });
    if (!company) {
      return res.status(404).json({ error: "Company does not exist" });
    }
    const deletedCompany = await Companies.deleteOne({ _id: companyId });
    if (deletedCompany.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete company" });
    }
    res.json({ msg: "Company deleted successfully" });
  } catch (error) {
    console.log("Error occurred in /getCompanyList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
