const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    counselors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Counselor" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", departmentSchema);
