import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./shared/NavBar";
import StudentList from "./page/StudentList";
import TeacherList from "./page/TeacherList";
import DepartmentList from "./page/DepartmentList";
import ResultList from "./page/ResultList";
import CounselorList from "./page/CounselorList";
import CoursesList from "./page/CoursesList";
import './App.css';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/StudentList" element={<StudentList />} />
        <Route path="/TeacherList" element={<TeacherList />} />
        <Route path="/DepartmentList" element={<DepartmentList />} />
        <Route path="/ResultList" element={<ResultList />} />
        <Route path="/CounselorList" element={<CounselorList />} />
        <Route path="/CoursesList" element={<CoursesList />} />
      </Routes>
    </Router>
  );
};

export default App;
