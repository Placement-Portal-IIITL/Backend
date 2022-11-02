const Users = require("../models/users");
const Students = require("../models/students");
const Courses = require("../models/courses");
const Departments = require("../models/departments");

exports.studentRegister = async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.auth._id }).select({
      email: 1,
    });
    const student = await Students.findOne({ userId: req.auth._id });
    if (student) {
      return res.status(400).json({ msg: "Student already registered" });
    }
    let studentObj = {
      ...req.body,
      collegeEmail: user.email,
      userId: req.auth._id,
    };
    const course = await Courses.findOne({ _id: req.body.courseId });
    if (!course) {
      return res.status(400).json({ msg: "Course does not exist" });
    }
    studentObj.courseName = course.courseName;

    const department = await Departments.findOne({
      _id: req.body.departmentId,
    });
    if (!department) {
      return res.status(400).json({ msg: "Department does not exist" });
    }
    studentObj.departmentName = department.departmentName;
    const newStudent = new Students(studentObj);
    await newStudent.save();
    await Users.updateOne(
      { _id: req.auth._id },
      { $push: { roles: "STUDENT" } }
    );
    res.json({ student: newStudent, msg: "Registered Successfully" });
  } catch (error) {
    console.log("Error occurred in /studentRegister", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
