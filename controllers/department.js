const Departments = require("../models/departments");

exports.getDepartmentList = async (req, res) => {
  try {
    const departments = await Departments.find();
    res.json({ departments });
  } catch (error) {
    console.log("Error occurred in /getDepartmentList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const department = await Departments.find({
      departmentName: req.body.departmentName,
    });
    if (department.length > 0) {
      return res
        .status(400)
        .json({ error: "Department with same name already exists" });
    }
    const newDepartment = new Departments({
      departmentName: req.body.departmentName,
    });
    await newDepartment.save();
    res.json({ department: newDepartment });
  } catch (error) {
    console.log("Error occurred in /addDepartment", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Departments.findOne({
      _id: req.body.departmentId,
    });
    if (!department) {
      return res.status(400).json({ error: "Department does not exists" });
    }
    const deletedDepartment = await Departments.deleteOne({
      _id: req.body.departmentId,
    });
    if (deletedDepartment.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete department" });
    }
    res.json({ msg: "Department successfully deleted" });
  } catch (error) {
    console.log("Error occurred in /deleteDepartment", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
