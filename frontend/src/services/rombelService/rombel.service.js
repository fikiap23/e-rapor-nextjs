import axios from 'axios'
import { apiUrl } from '../apiUrls'

const BASE_URL = `${apiUrl}/rombel`
const BASE_URL_KATEGORI = `${apiUrl}/rombel/kategori`
const rombelService = {
  createKategori: async (token, data) => {
    try {
      const response = await axios.post(`${BASE_URL_KATEGORI}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Login Gagal!'
    }
  },

  updateKategori: async (token, id, data) => {
    try {
      const response = await axios.put(`${BASE_URL_KATEGORI}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Login Gagal!'
    }
  },
}

export default rombelService
