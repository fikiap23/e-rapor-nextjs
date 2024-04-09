import { jwtDecode } from 'jwt-decode'

const getTokenData = (token) => {
  if (!token) return
  return jwtDecode(token)
}

export default getTokenData
