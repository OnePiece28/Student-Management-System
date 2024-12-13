const Teacher = require("../models/Teacher");
const Course = require("../models/Course");
// Get all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find() // Populate students if necessary
      .populate("courses").sort({createdAt:-1}); // Populate the courses field with Course documents

    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a single teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { name, email, courses } = req.body;

  try {
    const newTeacher = new Teacher({
      name,
      email,
      courses,
    });

    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a teacher by ID
exports.updateTeacher = async (req, res) => {
  const { name, email, subjects, courses } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, email, subjects, courses },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a teacher by ID
exports.deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
