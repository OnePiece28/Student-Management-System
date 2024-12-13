const Department = require("../models/department");

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find()
      .populate("students", "name email")
      .populate("teachers", "name email")
      .populate("counselors", "name email")
      .populate("courses", "name description");
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Get department by ID
exports.getDepartmentsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id)
      .populate("students", "name email")
      .populate("teachers", "name email")
      .populate("counselors", "name email")
      .populate("courses", "name description");
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Create a new department
exports.createDepartments = async (req, res) => {
  try {
    const { name, students, teachers, counselors, courses } = req.body;

    // Ensure name is provided
    if (!name) {
      return res.status(400).json({ message: "Department name is required." });
    }

    const newDepartment = new Department({
      name,
      students: students || [],
      teachers: teachers || [],
      counselors: counselors || [],
      courses: courses || [],
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Update an existing department
exports.updateDepartments = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, students, teachers, counselors, courses } = req.body;

    // Ensure name is provided
    if (!name) {
      return res.status(400).json({ message: "Department name is required." });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      id,
      {
        name,
        students: students || [],
        teachers: teachers || [],
        counselors: counselors || [],
        courses: courses || [],
      },
      { new: true, runValidators: true }
    );

    if (!updatedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a department
exports.deleteDepartments = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDepartment = await Department.findByIdAndDelete(id);

    if (!deletedDepartment) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
