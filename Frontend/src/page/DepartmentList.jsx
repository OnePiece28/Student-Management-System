import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    students: "",
    teachers: "",
    counselors: "",
    courses: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:5000/departments");
        setDepartments(res.data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (departmentId) => {
    try {
      await axios.delete(`http://localhost:5000/departments/${departmentId}`);
      setDepartments(departments.filter((d) => d._id !== departmentId));
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update Department
        await axios.put(`http://localhost:5000/departments/${editingDepartmentId}`, formData);
        setDepartments((prev) =>
          prev.map((d) => (d._id === editingDepartmentId ? { ...d, ...formData } : d))
        );
      } else {
        // Create New Department
        const res = await axios.post("http://localhost:5000/departments", formData);
        setDepartments((prev) => [...prev, res.data]);
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
      students: "",
      teachers: "",
      counselors: "",
      courses: "",
    });
    setModalVisible(true);
  };

  const openEditModal = (department) => {
    setIsEditing(true);
    setEditingDepartmentId(department._id);
    setFormData({
      name: department.name,
      students: department.students.join(", "),
      teachers: department.teachers.join(", "),
      counselors: department.counselors.join(", "),
      courses: department.courses.join(", "),
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      students: "",
      teachers: "",
      counselors: "",
      courses: "",
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Department List</h2>
        <div className="actions">
          <button className="btn create-btn" onClick={openCreateModal}>
            Create Department
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Students</th>
              <th>Teachers</th>
              <th>Counselors</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department._id}>
                <td>{department.name}</td>
                <td>{department.students.map(student => student.name).join(", ")}</td>
                <td>{department.teachers.map(teacher => teacher.name).join(", ")}</td>
                <td>{department.counselors.map(counselor => counselor.name).join(", ")}</td>
                <td>{department.courses.map(course => course.name).join(", ")}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn edit-btn" onClick={() => openEditModal(department)}>
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(department._id)}
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
            <h2>{isEditing ? "Edit Department" : "Create Department"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Students (IDs):</label>
              <input
                type="text"
                value={formData.students}
                onChange={(e) => setFormData({ ...formData, students: e.target.value })}
              />
              <label>Teachers (IDs):</label>
              <input
                type="text"
                value={formData.teachers}
                onChange={(e) => setFormData({ ...formData, teachers: e.target.value })}
              />
              <label>Counselors (IDs):</label>
              <input
                type="text"
                value={formData.counselors}
                onChange={(e) => setFormData({ ...formData, counselors: e.target.value })}
              />
              <label>Courses (IDs):</label>
              <input
                type="text"
                value={formData.courses}
                onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
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

export default DepartmentList;
