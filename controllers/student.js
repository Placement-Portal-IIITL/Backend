const Users = require("../models/users");
const Students = require("../models/students");
const Courses = require("../models/courses");
const Departments = require("../models/departments");
const HighSchoolGrades = require("../models/highSchoolGrades");
const IntermediateGrades = require("../models/intermediateGrades");
const GraduationGrades = require("../models/graduationGrades");
const CGPAGrades = require("../models/cgpaGrades");
const Addresses = require("../models/addresses");

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

exports.getStudentProfile = async (req, res) => {
  try {
    const studentId = req.auth.studentId;
    let student = (await Students.findOne({ _id: studentId }))?._doc;
    const highSchoolGrades = await HighSchoolGrades.findOne({
      studentId,
    });
    if (highSchoolGrades) {
      student.highSchoolGrades = highSchoolGrades;
    }
    const intermediateGrades = await IntermediateGrades.findOne({
      studentId,
    });
    if (intermediateGrades) {
      student.intermediateGrades = intermediateGrades;
    }
    const graduationGrades = await GraduationGrades.findOne({
      studentId,
    });
    if (graduationGrades) {
      student.graduationGrades = graduationGrades;
    }
    const cgpaGrades = await CGPAGrades.findOne({ studentId });
    if (cgpaGrades) {
      student.cgpaGrades = cgpaGrades;
    }
    const address = await Addresses.findOne({ studentId });
    if (address) {
      student.address = address;
    }
    res.json({ ...student });
  } catch (error) {
    console.log("Error occurred in /getStudentProfile", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};

exports.updateStudentProfile = async (req, res) => {
  try {
    const studentId = req.auth.studentId;
    await Students.updateOne({ _id: studentId }, req.body);
    if (req.body.highSchoolGrades) {
      const highSchoolGrades = await HighSchoolGrades.findOne({ studentId });
      if (highSchoolGrades) {
        await HighSchoolGrades.updateOne(
          { studentId },
          req.body.highSchoolGrades
        );
      } else {
        const newHighSchoolGrades = new HighSchoolGrades({
          ...req.body.highSchoolGrades,
          studentId,
        });
        await newHighSchoolGrades.save();
      }
    }
    if (req.body.intermediateGrades) {
      const intermediateGrades = await IntermediateGrades.findOne({
        studentId,
      });
      if (intermediateGrades) {
        await IntermediateGrades.updateOne(
          { studentId },
          req.body.intermediateGrades
        );
      } else {
        const newIntermediateGrades = new IntermediateGrades({
          ...req.body.intermediateGrades,
          studentId,
        });
        await newIntermediateGrades.save();
      }
    }
    if (req.body.graduationGrades) {
      const graduationGrades = await GraduationGrades.findOne({ studentId });
      if (graduationGrades) {
        await GraduationGrades.updateOne(
          { studentId },
          req.body.graduationGrades
        );
      } else {
        const newGraduationGrades = new GraduationGrades({
          ...req.body.graduationGrades,
          studentId,
        });
        await newGraduationGrades.save();
      }
    }
    if (req.body.cgpaGrades) {
      const cgpaGrades = await CGPAGrades.findOne({ studentId });
      if (cgpaGrades) {
        await CGPAGrades.updateOne({ studentId }, req.body.cgpaGrades);
      } else {
        const newCGPAGrades = new CGPAGrades({
          ...req.body.graduationGrades,
          studentId,
        });
        await newCGPAGrades.save();
      }
    }
    if (req.body.address) {
      const address = await Addresses.findOne({ studentId });
      if (address) {
        await Addresses.updateOne({ studentId }, req.body.address);
      } else {
        const newAddress = new Addresses({
          ...req.body.address,
          studentId,
        });
        await newAddress.save();
      }
    }
    res.json({ msg: "Profile updated successfully" });
  } catch (error) {
    console.log("Error occurred in /updateStudentProfile", error);
    res.status(500).json({ error: "Some error occurred" });
  }
};
