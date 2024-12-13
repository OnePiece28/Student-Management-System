const Course = require("../models/Course"); // Import the Course model
const Teacher = require("../models/Teacher"); // Import the Teacher model

// Get all courses
// exports.getCourses = async (req, res) => {
//   try {
//     const courses = await Course.find().populate("teacher"); // Populate teacher details
//     res.status(200).json(courses);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
exports.getCourses = async (req, res) => {
  try {
    // Fetch all courses
    const courses = await Course.find()
    .populate("teacher");

    // Loop through courses and attach teacher details
    for (const course of courses) {
      // Find teachers where the course ID matches
      const teachers = await Teacher.find({ courses: course._id });

      // Attach the teachers directly to the course object
      course.teachers = teachers;
    }

    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get a single course by its ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacher");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  const { name, code, teacher } = req.body;

  // Check if the course already exists by its code
  const existingCourse = await Course.findOne({ code });
  if (existingCourse) {
    return res
      .status(400)
      .json({ message: "Course with this code already exists" });
  }

  try {
    const newCourse = new Course({ name, code, teacher });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course by ID
exports.updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("teacher");

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course by ID
exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
