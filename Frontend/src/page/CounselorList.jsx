import React, { useState, useEffect } from "react";
import axios from "axios";

const CounselorList = () => {
  const [counselors, setCounselors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    students: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingCounselorId, setEditingCounselorId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/counselors");
        setCounselors(data);
      } catch (err) {
        console.error("Error fetching counselors:", err);
      }
    };

    fetchCounselors();
  }, []);

  const handleDelete = async (counselorID) => {
    try {
      await axios.delete(`http://localhost:5000/counselors/${counselorID}`);
      setCounselors(counselors.filter((c) => c._id !== counselorID));
    } catch (err) {
      console.error("Error deleting counselor:", err);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update Counselor
        const { data } = await axios.put(
          `http://localhost:5000/counselors/${editingCounselorId}`,
          formData
        );
        setCounselors((prev) =>
          prev.map((c) => (c._id === editingCounselorId ? { ...c, ...data } : c))
        );
      } else {
        // Create New Counselor
        const { data } = await axios.post("http://localhost:5000/counselors", formData);
        setCounselors((prev) => [...prev, data]);
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
      email: "",
      students: [],
    });
    setModalVisible(true);
  };

  const openEditModal = (counselor) => {
    setIsEditing(true);
    setEditingCounselorId(counselor._id);
    setFormData({
      name: counselor.name,
      email: counselor.email,
      students: counselor.students || [],
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setFormData({
      name: "",
      email: "",
      students: [],
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Counselor List</h2>
        <div className="actions">
          <button className="btn create-btn" onClick={openCreateModal}>
            Create Counselor
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Students</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {counselors.map((counselor) => (
              <tr key={counselor._id}>
                <td>{counselor.name}</td>
                <td>{counselor.email}</td>
                <td>
                  {counselor.students.map((student) => (
                    <span key={student._id}>{student.name}, </span>
                  ))}
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn edit-btn"
                      onClick={() => openEditModal(counselor)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(counselor._id)}
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
            <h2>{isEditing ? "Edit Counselor" : "Create Counselor"}</h2>
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
              <label>Students:</label>
              <input
                type="text"
                value={formData.students.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    students: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
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

export default CounselorList;
