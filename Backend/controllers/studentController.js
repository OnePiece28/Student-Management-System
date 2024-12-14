const Student = require("../models/Student");
const Result = require("../models/Result");
const Counselor = require("../models/Counselor");
const Teacher = require("../models/Teacher");
const Course = require("../models/Course"); // Import the Course model
const Department = require("../models/department");
// Get all students
// exports.getStudents = async (req, res) => {
//   try {
//     const students = await Student.find().populate("teacher counselor results").sort({createdAt: -1});
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getStudents = async (req, res) => {
//   try {
//     // Fetch all students
//     const students = await Student.find().populate("counselor department").sort({ createdAt: -1 });

//     // Map through students and attach results, teachers, and counselors
//     const detailedStudents = await Promise.all(
//       students.map(async (student) => {
//         const studentObj = student.toObject(); // Convert to plain JavaScript object

//         // Fetch related data
//         studentObj.results = await Result.find({ student: student._id });
//         studentObj.teachers = await Teacher.find({ students: student._id }); // Assuming teachers have a `students` field
//         studentObj.counselors = await Counselor.find({ students: student._id }); // Assuming counselors have a `students` field
//         studentObj.department = await Department.find({}); // Assuming
//         studentObj.courses = await Course.find({ students: student.id }); // Assuming
        

//         return studentObj;
//       })
//     );

//     res.status(200).json(detailedStudents);
//   } catch (err) {
//     console.error("Error fetching students:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate("counselor results department").sort({createdAt: -1});
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get a single student by ID
// exports.getStudentById = async (req, res) => {
//   try {
//     const student = await Student.findById(req.params.id).populate(
//       "teacher counselor results"
//     );
//     if (!student) {
//       return res.status(404).json({ message: "Student not found" });
//     }
//     res.status(200).json(student);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getStudentById = async (req, res) => {
  try {
    // Find the student by ID
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Fetch results, teachers, and counsellors for the student
    const results = await Result.find({ student: student._id });
    const teachers = await Teacher.find({ student: student._id });
    const counsellors = await Counselor.find({ student: student._id });

    // Attach the fetched data to the student object
    student.results = results;
    student.teachers = teachers;
    student.counsellors = counsellors;

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Create a new student
exports.createStudent = async (req, res) => {
  const { name, age, email, teacher, counselor, results ,courses ,department} = req.body;

  try {
    const newStudent = new Student({
      name,
      age,
      email,
      teacher,
      counselor,
      results,
      courses,
      department,
    });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a student by ID
exports.updateStudent = async (req, res) => {
  const { name, age, email, teacher, counselor, results,department} = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        age,
        email,
        teacher,
        counselor,
        results,
        courses,
        department,
      },
      { new: true }
    ).populate("student");
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
