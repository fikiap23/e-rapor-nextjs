import axios from 'axios'
import { apiUrl } from '../apiUrls'

const BASE_URL = `${apiUrl}/guru`
const teacherService = {
  create: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Guru Gagal Ditambahkan'
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
      throw error.response?.data?.message || 'Guru Gagal Ditampilkan'
    }
  },
}

export default teacherService
