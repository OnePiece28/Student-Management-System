import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    courses: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingTeacherId, setEditingTeacherId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/teachers");
        setTeachers(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchTeachers();
  }, []);

  // Handle delete
  const handleDelete = async (teacherID) => {
    try {
      await axios.delete(`http://localhost:5000/teachers/${teacherID}`);
      setTeachers(teachers.filter((t) => t._id !== teacherID));
    } catch (err) {
      console.error("Error deleting teacher:", err);
    }
  };

  // Handle form submission (create or update teacher)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update Teacher
        await axios.put(
          `http://localhost:5000/teachers/${editingTeacherId}`,
          formData
        );
        setTeachers((prev) =>
          prev.map((t) =>
            t._id === editingTeacherId ? { ...t, ...formData } : t
          )
        );
      } else {
        // Create New Teacher
        const res = await axios.post("http://localhost:5000/teachers", formData);
        setTeachers((prev) => [...prev, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  // Open modal for creating new teacher
  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      name: "",
      email: "",
      courses: "",
    });
    setModalVisible(true);
  };

  // Open modal for editing teacher
  const openEditModal = (teacher) => {
    setIsEditing(true);
    setEditingTeacherId(teacher._id);
    setFormData({
      name: teacher.name,
      email: teacher.email,
      courses: teacher.courses.map((course) => course.name).join(", "),
    });
    setModalVisible(true);
  };

  // Close modal
  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      email: "",
      courses: "",
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Teacher List</h2>
        <div className="actions">
          <button className="btn create-btn" onClick={openCreateModal}>
            Create Teacher
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Courses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id}>
                <td>{teacher.name}</td>
                <td>{teacher.email}</td>
                <td>{teacher.courses ? teacher.courses.name : "Not Assigned"}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn edit-btn" onClick={() => openEditModal(teacher)}>
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(teacher._id)}
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
            <h2>{isEditing ? "Edit Teacher" : "Create Teacher"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <label>Courses:</label>
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

export default TeacherList;
