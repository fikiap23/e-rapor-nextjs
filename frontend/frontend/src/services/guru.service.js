import axios from 'axios'
import { apiUrl } from './apiUrls'

const BASE_URL = `${apiUrl}/guru`
const teacherService = {
  create: async (data, token) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data?.data || 'Guru Berhasil Di Ditambahkan'
    } catch (error) {
      throw error.response?.data?.message || 'Guru Gagal Ditambahkan'
    }
  },

  update: async (token, id, data) => {
    try {
      console.log(id)
      const response = await axios.put(`${BASE_URL}/bypass/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      throw error.response?.data?.message || 'Guru Gagal Diupdate'
    }
  },

  updateStatusAkun: async (token, id, data) => {
    try {
      console.log(id)
      const response = await axios.put(`${apiUrl}/user/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data
    } catch (error) {
      throw error.response?.data?.message || 'Guru Gagal Diupdate'
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
      throw error.response?.data?.message || 'Guru Gagal Dihapus'
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
        'Ada kesalahan saat mengambil data guru'
      )
    }
  },
}

export default teacherService
