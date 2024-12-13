import React, { useState, useEffect } from "react";
import axios from "axios";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]); // For populating teacher options
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    teacher: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/courses");
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    const fetchTeachers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/teachers");
        setTeachers(data);
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };

    fetchCourses();
    fetchTeachers();
  }, []);

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:5000/courses/${courseId}`);
      setCourses(courses.filter((c) => c._id !== courseId));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update Course
        const { data } = await axios.put(`http://localhost:5000/courses/${editingCourseId}`, formData);
        setCourses((prev) =>
          prev.map((c) => (c._id === editingCourseId ? { ...c, ...data } : c))
        );
      } else {
        // Create New Course
        const { data } = await axios.post("http://localhost:5000/courses", formData);
        setCourses((prev) => [...prev, data]);
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
      code: "",
      teacher: "",
    });
    setModalVisible(true);
  };

  const openEditModal = (course) => {
    setIsEditing(true);
    setEditingCourseId(course._id);
    setFormData({
      name: course.name,
      code: course.code,
      teacher: course.teacher ? course.teacher._id : "",
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      code: "",
      teacher: "",
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Courses List</h2>
        <div className="actions">
          <button className="btn create-btn" onClick={openCreateModal}>
            Create Course
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Teacher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>{course.teacher ? course.teacher.name : "Not Assigned"}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn edit-btn"
                      onClick={() => openEditModal(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(course._id)}
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
            <h2>{isEditing ? "Edit Course" : "Create Course"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <label>Code:</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
              />
              <label>Teacher:</label>
              <select
                value={formData.teacher}
                onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
              >
                <option value="">Select a Teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
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

export default CoursesList;