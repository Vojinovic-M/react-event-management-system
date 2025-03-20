import axios from "axios";
import User from "../models/User";

const API_URL = "https://localhost:7095";

export const AuthService = {

    register: async (userData: {email: string; password: string}) => {
        const response = await axios.post(`${API_URL}/register`, userData)
        return response.data
    },


    login: async (credentials: {email: string, password: string}) => {
        const response = await axios.post(`${API_URL}/login`, credentials)
        console.log(response)
        return response.data;
    },


    logout: async () => await axios.post(`${API_URL}/api/user/logout`),

    
    getProfile: async (accessToken: string) => {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
            headers: {  Authorization: `Bearer ${accessToken}`, },
        });
        return response.data as User;
    },
}
