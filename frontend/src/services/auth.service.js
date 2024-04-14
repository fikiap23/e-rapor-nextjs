import axios from "axios";
import { apiUrl } from "./apiUrls";

const BASE_URL = `${apiUrl}/auth`;
const authService = {
  login: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Login Gagal!";
    }
  },

  changePassword: async (token, data) => {
    try {
      const response = await axios.patch(`${BASE_URL}/change-password`,
        data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Gagal mengubah password!";
    }
  },
};

export default authService;
