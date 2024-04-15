import axios from "axios";
import { apiUrl } from "./apiUrls";

const BASE_URL = `${apiUrl}/rapor`;
const raportService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data?.data || "Raport Berhasil Di Ditambahkan";
    } catch (error) {
      throw error.response?.data?.message || "Raport Gagal Ditambahkan";
    }
  },

  update: async (token, id, data) => {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response?.data?.message || "Raport Gagal Diupdate";
    }
  },

  updateStatusAkun: async (token, id, data) => {
    try {
      const response = await axios.put(`${apiUrl}/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Raport Gagal Diupdate";
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
      throw error.response?.data?.message || "Raport Gagal Dihapus";
    }
  },

  getAll: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "Ada kesalahan saat mengambil data guru"
      );
    }
  },

  getOne: async (nama, nis, idSemester) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/search-by-semester/${idSemester}`,
        {
          params: {
            nama: nama,
            nis: nis,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        "Ada kesalahan saat mengambil data rapor"
      );
    }
  },
};

export default raportService;
