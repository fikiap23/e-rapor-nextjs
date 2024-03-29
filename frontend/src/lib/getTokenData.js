import { jwtDecode } from 'jwt-decode'

const getTokenData = (token) => {
  return jwtDecode(token.toString())
}

export default getTokenData
