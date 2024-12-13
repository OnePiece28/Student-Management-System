const mongoose = require("mongoose");

const counselorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Counselor", counselorSchema);
