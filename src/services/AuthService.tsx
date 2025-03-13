import User from "../models/User";

const API_URL = "https://localhost:7095";

export const register = async (userData: {email: string; password: string}) => {
    console.log("Registering user:", userData);

    try {
        const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        })
        console.log("Response status:", response.status);
        
        let responseData = null;
        try {
            responseData = await response.json();
            console.log("Response data:", responseData);
        } catch {
            console.warn("No JSON in response. Probably works.")
        }
        
        if (!response.ok) throw new Error("Registration failed!")

        return responseData ?? {message: "Success"};

    } catch (error) {
        console.error('Error registering:', error);
    }
}


export const login = async (credentials: any) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        });
        return response.json();

    } catch (error) {
        console.error('Error logging in:', error);
    }
}

export const logout = async () => {
    try {
        await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
        });
        localStorage.removeItem('user');
        window.location.href='/user/login';

    } catch (error) {
        console.error('Error logging out:', error);
    }
}
export async function getUserProfile(): Promise<User | null> {
    const tokenData = localStorage.getItem('user');
    if (!tokenData) return null;
    
    try {
        const { accessToken } = JSON.parse(tokenData!);
        const response = await fetch(`${API_URL}/api/user/profile/`, {
            method: 'GET',
            credentials: 'include', // za cookies
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status}`);
        }

        const userData: { email: string; roles?: string[]} = await response.json();
        return {
            email: userData.email,
            roles: userData.roles || []
        }
    
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }

}
