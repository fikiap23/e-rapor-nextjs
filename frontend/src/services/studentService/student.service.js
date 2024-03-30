import axios from "axios";
import { apiUrl } from "../apiUrls";

const BASE_URL = `${apiUrl}/murid`;
const siswaService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || "Siswa Gagal Ditambahkan";
    }
  },

  update: async (token, id, data) => {
    try {
      console.log(id);
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || "Siswa Gagal Diupdate";
    }
  },

  updateStatusAkun: async (token, id, data) => {
    try {
      console.log(id);
      const response = await axios.put(`${apiUrl}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Siswa Gagal Diupdate";
    }
  },

  delete: async (token, id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Siswa Gagal Dihapus";
    }
  },

  getById: async (id, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Gagal mengambil data siswa";
    }
  },

};

export default siswaService;
