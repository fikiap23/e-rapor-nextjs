import axios from 'axios'
import { apiUrl } from './apiUrls'

const BASE_URL = `${apiUrl}/sekolah`
const sekolahService = {
  update: async (token, data) => {
    try {
      const response = await axios.put(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Sekolah Gagal Diupdate!'
    }
  },

  create: async (token, data) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Sekolah Gagal Ditambahkan'
    }
  },
}

export default sekolahService
