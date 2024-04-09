import axios from 'axios'
import { apiUrl } from './apiUrls'

const BASE_URL = `${apiUrl}/semester`
const semesterService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Semester Gagal Ditambahkan'
    }
  },

  update: async (token, id, data) => {
    try {
      console.log(id)
      const response = await axios.put(`${BASE_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Semester Gagal Diupdate'
    }
  },

  delete: async (token, id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Semester Gagal Dihapus'
    }
  },

  getAll: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw (
        error.response?.data?.message ||
        'Ada kesalahan saat mengambil data Semester'
      )
    }
  },
}

export default semesterService
