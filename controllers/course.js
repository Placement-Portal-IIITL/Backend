const Courses = require("../models/courses");
const Departments = require("../models/departments");

exports.getCourseList = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.json({ courses });
  } catch (error) {
    console.log("Error occurred in /getCourseList", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const courses = await Courses.find({
      courseName: req.body.courseName,
    });
    if (courses.length > 0) {
      return res
        .status(400)
        .json({ error: "course with same name already exists" });
    }
    const newCourse = new Courses({
      courseName: req.body.courseName,
    });
    await newCourse.save();
    res.json({ course: newCourse });
  } catch (error) {
    console.log("Error occurred in /addCourse", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.addDepartmentInCourse = async (req, res) => {
  try {
    const course = await Courses.findOne({
      _id: req.body.courseId,
    });
    if (!course) {
      return res.status(400).json({ error: "Course does not exists" });
    }
    const department = await Departments.findOne({
      _id: req.body.departmentId,
    });
    if (!department) {
      return res.status(400).json({ error: "Department does not exists" });
    }
    const updatedCourse = await Courses.updateOne(
      { _id: req.body.courseId },
      { $push: { departments: req.body.departmentId } }
    );
    if (updatedCourse.modifiedCount == 0) {
      return res
        .status(500)
        .json({ error: "Failed to add department in course" });
    }
    res.json({ msg: "Department added in course successfully" });
  } catch (error) {
    console.log("Error occurred in /addDepartmentInCourse", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Courses.findOne({
      _id: req.body.courseId,
    });
    if (!course) {
      return res.status(400).json({ error: "Course does not exists" });
    }
    const deletedCourse = await Courses.deleteOne({
      _id: req.body.courseId,
    });
    if (deletedCourse.deletedCount == 0) {
      return res.status(500).json({ error: "Failed to delete course" });
    }
    res.json({ msg: "Course successfully deleted" });
  } catch (error) {
    console.log("Error occurred in /deleteCourse", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
