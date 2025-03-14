import User from "../models/User";
import { handleResponse } from "./HandleResponse";

const API_URL = "https://localhost:7095";

export const AuthService = {

    register: (userData: {email: string; password: string}) =>
        fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
            })
            .then(handleResponse)
            .then(data => data as {message: string}),


    login: (credentials: { email: string; password: string}) =>
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            })
            .then(handleResponse)
            .then(data => data as {accessToken: string}),


    logout: () => 
        fetch(`${API_URL}/api/user/logout`, {
            method: 'POST',
            credentials: 'include'
            })
            .then(handleResponse),


    getProfile: (accessToken: string) =>
        fetch(`${API_URL}/api/user/profile/`, {
            method: 'GET',
            credentials: 'include', // za cookies
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
        })
        .then(handleResponse)
        .then(data => ({
            email: data.email,
            roles: data.roles || []
        } as User))
    
}
