const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, unique: true, required: true },
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    counselor: { type: mongoose.Schema.Types.ObjectId, ref: "Counselor" },
    results: { type: mongoose.Schema.Types.ObjectId, ref: "Result" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses" }],
    department:{ type: mongoose.Schema.Types.ObjectId,ref: "Department" },
  },  
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
