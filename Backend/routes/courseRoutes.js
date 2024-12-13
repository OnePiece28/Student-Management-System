const express = require("express");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/coursenameController"); // Import course controller functions

const router = express.Router();

// Get all courses
router.get("/", getCourses);

// Get a course by ID
router.get("/:id", getCourseById);

// Create a new course
router.post("/", createCourse);

// Update a course by ID
router.put("/:id", updateCourse);

// Delete a course by ID
router.delete("/:id", deleteCourse);

module.exports = router;
