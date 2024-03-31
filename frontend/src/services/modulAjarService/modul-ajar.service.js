import axios from 'axios'
import { apiUrl } from '../apiUrls'

const BASE_URL = `${apiUrl}/modul-ajar`
const modulAjarService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Modul Ajar Gagal Ditambahkan'
    }
  },
}

export default modulAjarService
