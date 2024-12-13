const express = require("express");
const router = express.Router();
const CounselorController = require("../controllers/counselorController");

// Get all counselors
router.get("/", CounselorController.getCounselors);

// Get a single counselor by ID
router.get("/:id", CounselorController.getCounselorById);

// Create a new counselor
router.post("/", CounselorController.createCounselor);

// Update a counselor by ID
router.put("/:id", CounselorController.updateCounselor);

// Delete a counselor by ID
router.delete("/:id", CounselorController.deleteCounselor);

module.exports = router;
