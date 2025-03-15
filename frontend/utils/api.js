import axios from "axios";

// Backend base URL
const API_BASE_URL = "http://localhost:8000/api";

/**
 * Send text message to the backend for processing.
 * @param {string} userInput - The message to send.
 * @returns {Promise<object>} - The response from the backend.
 */
export const sendMessageToBackend = async (userInput) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/generate_story/`, {
      message: userInput,
    });

    return response.data;
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    return { success: false, error: "Failed to send message to the backend." };
  }
};