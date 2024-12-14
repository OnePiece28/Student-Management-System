const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRouters");
const counselorRoutes = require("./routes/counselorRouters");
const courseRoutes = require("./routes/courseRoutes");
const resultRoutes = require("./routes/resultRouters");
const departmentRoutes = require("./routes/departmentRouters");
dotenv.config();

// Connect to the MongoDB database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/counselors", counselorRoutes);
app.use("/results", resultRoutes);
app.use("/courses", courseRoutes);
app.use("/departments", departmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
