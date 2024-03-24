// authService.js
import axios from 'axios';
import { LoginReqType } from '../types/request/auth.request.type';
import { LoginResType } from '../types/response/auth.response.type';
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;
const authService = {
    login: async (userData: LoginReqType) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, userData);
            return response.data as LoginResType
        } catch (error: any) {
            throw (error.response.data?.message || "Login Gagal!");
        }
    },
};

export default authService;