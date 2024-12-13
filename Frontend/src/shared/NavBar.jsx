import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Management System</div>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/StudentList">Student</Link>
        </li>
        <li className="navbar-item">
          <Link to="/TeacherList">Teacher</Link>
        </li>
        <li className="navbar-item">
          <Link to="/DepartmentList">Department</Link>
        </li>
        <li className="navbar-item">
          <Link to="/ResultList">Result</Link>
        </li>
        <li className="navbar-item">
          <Link to="/CounselorList">Counselor</Link>
        </li>
        <li className="navbar-item">
          <Link to="/CoursesList">Courses</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
