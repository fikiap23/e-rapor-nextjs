import axios from 'axios'

// API URL
export const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Fetch API using Axios
export const ApiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
