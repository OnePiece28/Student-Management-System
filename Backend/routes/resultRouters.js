const express = require("express");
const router = express.Router();
const ResultController = require("../controllers/resultController");

// Get all results
router.get("/", ResultController.getResults);

// Get a single result by ID
router.get("/:id", ResultController.getResultById);

// Create a new result
router.post("/", ResultController.createResult);

// Update a result by ID
router.put("/:id", ResultController.updateResult);

// Delete a result by ID
router.delete("/:id", ResultController.deleteResult);

module.exports = router;
