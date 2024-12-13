const Counselor = require("../models/Counselor");

// Get all counselors
exports.getCounselors = async (req, res) => {
  try {
    const counselors = await Counselor.find().populate("students");
    res.status(200).json(counselors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single counselor by ID
exports.getCounselorById = async (req, res) => {
  try {
    const counselor = await Counselor.findById(req.params.id).populate(
      "students"
    );
    if (!counselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    res.status(200).json(counselor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new counselor
exports.createCounselor = async (req, res) => {
  const { name, email, students } = req.body;

  try {
    const newCounselor = new Counselor({
      name,
      email,
      students,
    });

    const savedCounselor = await newCounselor.save();
    res.status(201).json(savedCounselor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a counselor by ID
exports.updateCounselor = async (req, res) => {
  const { name, email, students } = req.body;

  try {
    const updatedCounselor = await Counselor.findByIdAndUpdate(
      req.params.id,
      { name, email, students },
      { new: true }
    );

    if (!updatedCounselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }

    res.status(200).json(updatedCounselor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a counselor by ID
exports.deleteCounselor = async (req, res) => {
  try {
    const deletedCounselor = await Counselor.findByIdAndDelete(req.params.id);
    if (!deletedCounselor) {
      return res.status(404).json({ message: "Counselor not found" });
    }
    res.status(200).json({ message: "Counselor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
