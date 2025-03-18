import axios from "axios";
import User from "../models/User";

const API_URL = "https://localhost:7095";

export const AuthService = {

    register: async (userData: {email: string; password: string}) => {
        const response = await axios.post(`${API_URL}/register`, userData)
        return response.data
    },


    // register: (userData: {email: string; password: string}) =>
    //     fetch(`${API_URL}/register`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(userData),
    //         })
    //         .then(handleResponse)
    //         .then(data => data as {message: string}),

            
    login: async (credentials: {email: string, password: string}) => {
        const response = await axios.post(`${API_URL}/api/login`, credentials)
        return response.data;
    },

    logout: async () => {
        await axios.post(`${API_URL}/api/user/logout`)
    },
    
    getProfile: async (token: string) => {
        const response = await axios.get(`${API_URL}/api/user/profile`, {
            headers: {  Authorization: `Bearer ${token}`    }
        });
        return response.data as User
    },    
}
