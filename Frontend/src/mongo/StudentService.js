import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Update this with your backend URL

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
