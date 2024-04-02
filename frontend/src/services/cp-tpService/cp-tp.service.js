import axios from 'axios'
import { apiUrl } from '../apiUrls'

const BASE_URL_CP = `${apiUrl}/silabus/cp`
const BASE_URL_TP = `${apiUrl}/silabus/tp`
const cpTpService = {
  updateCp: async (token, data) => {
    try {
      const response = await axios.put(`${BASE_URL_CP}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Gagal Ditambahkan!'
    }
  },
}

export default cpTpService
