import React, { useState, useEffect } from "react";
import axios from "axios";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [formData, setFormData] = useState({
    student: "",
    course: "",
    marks: "",
    grade: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingResultId, setEditingResultId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/results");
        setResults(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    fetchResults();
  }, []);

  const handleDelete = async (resultID) => {
    try {
      await axios.delete(`http://localhost:5000/results/${resultID}`);
      setResults(results.filter((r) => r._id !== resultID));
    } catch (err) {
      console.error("Error deleting result:", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update Result
        await axios.put(`http://localhost:5000/results/${editingResultId}`, formData);
        setResults((prev) =>
          prev.map((r) => (r._id === editingResultId ? { ...r, ...formData } : r))
        );
      } else {
        // Create New Result
        const res = await axios.post("http://localhost:5000/results", formData);
        setResults((prev) => [...prev, res.data]);
      }
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      student: "",
      course: "",
      marks: "",
      grade: "",
    });
    setModalVisible(true);
  };

  const openEditModal = (result) => {
    setIsEditing(true);
    setEditingResultId(result._id);
    setFormData({
      student: result.student.name || "",
      course: result.course.name || "",
      marks: result.marks || "",
      grade: result.grade || "",
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      student: "",
      course: "",
      marks: "",
      grade: "",
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Result List</h2>
        <div className="actions">
          <button className="btn create-btn" onClick={openCreateModal}>
            Create Result
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result._id}>
                <td>{result.student ? result.student.name : "Not Assigned"}</td>
                <td>{result.course ? result.course.name : "Not Assigned"}</td>
                <td>{result.marks}</td>
                <td>{result.grade}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn edit-btn" onClick={() => openEditModal(result)}>
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(result._id)}
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
            <h2>{isEditing ? "Edit Result" : "Create Result"}</h2>
            <form onSubmit={handleFormSubmit}>
              <label>Student:</label>
              <input
                type="text"
                value={formData.student}
                onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                required
              />
              <label>Course:</label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              />
              <label>Marks:</label>
              <input
                type="number"
                value={formData.marks}
                onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                required
              />
              <label>Grade:</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
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

export default ResultList;
