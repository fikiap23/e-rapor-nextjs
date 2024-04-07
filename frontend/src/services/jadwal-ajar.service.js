import axios from 'axios'
import { apiUrl } from './apiUrls'

const BASE_URL = `${apiUrl}/jadwal-ajar`
const jadwalAjarService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Jadwal Gagal Ditambahkan'
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
      throw error.response?.data?.message || 'Jadwal Ajar Gagal Dihapus'
    }
  },
}

export default jadwalAjarService
