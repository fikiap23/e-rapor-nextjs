import axios from 'axios'
import { apiUrl } from './apiUrls'

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

  createTp: async (token, data) => {
    try {
      const response = await axios.post(`${BASE_URL_TP}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Gagal Ditambahkan!'
    }
  },

  deleteTp: async (token, id) => {
    try {
      const response = await axios.delete(`${BASE_URL_TP}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Gagal Dihapus!'
    }
  },

  updateTp: async (token, id, data) => {
    try {
      const response = await axios.put(`${BASE_URL_TP}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Gagal Diupdate!'
    }
  },
}

export default cpTpService
