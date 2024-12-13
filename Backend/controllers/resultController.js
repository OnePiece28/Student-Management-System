

const Result = require("../models/Result");

// Get all results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find().populate("student course");
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single result by ID
exports.getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate(
      "student course"
    );
    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new result
exports.createResult = async (req, res) => {
  const { student, course, marks, grade } = req.body;

  try {
    const newResult = new Result({
      student,
      course,
      marks,
      grade,
    });

    const savedResult = await newResult.save();
    res.status(201).json(savedResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a result by ID
exports.updateResult = async (req, res) => {
  const { student, course, marks, grade } = req.body;

  try {
    const updatedResult = await Result.findByIdAndUpdate(
      req.params.id,
      { student, course, marks, grade },
      { new: true }
    );

    if (!updatedResult) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.status(200).json(updatedResult);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a result by ID
exports.deleteResult = async (req, res) => {
  try {
    const deletedResult = await Result.findByIdAndDelete(req.params.id);
    if (!deletedResult) {
      return res.status(404).json({ message: "Result not found" });
    }
    res.status(200).json({ message: "Result deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
