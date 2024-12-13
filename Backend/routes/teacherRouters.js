const express = require("express");
const router = express.Router();
const TeacherController = require("../controllers/teacherController");

// Get all teachers
router.get("/", TeacherController.getTeachers);

// Get a single teacher by ID
router.get("/:id", TeacherController.getTeacherById);

// Create a new teacher
router.post("/", TeacherController.createTeacher);

// Update a teacher by ID
router.put("/:id", TeacherController.updateTeacher);

// Delete a teacher by ID
router.delete("/:id", TeacherController.deleteTeacher);

module.exports = router;
