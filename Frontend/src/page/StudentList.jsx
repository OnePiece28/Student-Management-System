import React, { useState, useEffect } from "react";
import axios from "axios";
import { getStudents } from "../mongo/StudentService";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    counselor: "",
    results: "",
    courses: "",
    department: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (studentID) => {
    try {
      await axios.delete(`http://localhost:5000/students/${studentID}`);
      setStudents(students.filter((s) => s._id !== studentID));
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update Student
        await axios.put(`http://localhost:5000/students/${editingStudentId}`, formData);
        setStudents((prev) =>
          prev.map((s) => (s._id === editingStudentId ? { ...s, ...formData } : s))
        );
      } else {
        // Create New Student
        const res = await axios.post("http://localhost:5000/students", formData);
        setStudents((prev) => [...prev, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      age: "",
      email: "",
      counselor: "",
      results: "",
      courses: "",
      department: "",
    });
    setModalVisible(true);
  };

  const openEditModal = (student) => {
    setIsEditing(true);
    setEditingStudentId(student._id);
    setFormData({
      name: student.name,
      age: student.age,
      email: student.email,
      counselor: student.counselor.name || "",
      results: student.results.marks || "",
      courses: student.courses.name || "",
      department: student.department.name || "",
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      age: "",
      email: "",
      counselor: "",
      results: "",
      courses: "",
      department: "",
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Student List</h2>
        <div className="actions">
          <button className="btn create-btn" onClick={openCreateModal}>
            Create Student
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Department</th>
              {/* <th>Teacher</th> */}
              <th>Counselor</th>
              <th>Results</th>
              {/* <th>Courses</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.email}</td>
                {/* <td>{student.teacher ? student.teacher.name : "Not Assigned"}</td> */}
                <td>{student.department ? student.department.name : "Not Assigned"}</td>
                <td>{student.counselor ? student.counselor.name : "Not Assigned"}</td>
                <td>{student.results ? student.results.marks : "Not Assigned"}</td>
                {/* <td>{student.courses? student.courses.name : "Not Assigned"}</td> */}
                <td>
                  <div className="btn-group">
                    <button className="btn edit-btn" onClick={() => openEditModal(student)}>
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>
              &times;
            </span>
            <h2>{isEditing ? "Edit Student" : "Create Student"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Age:</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label>Department:</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
              <label>Counselor:</label>
              <input
                type="text"
                value={formData.counselor}
                onChange={(e) => setFormData({ ...formData, counselor: e.target.value })}
              />
              <label>Results:</label>
              <input
                type="text"
                value={formData.results}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
              />
              <button type="submit" className="btn submit-btn">
                {isEditing ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
