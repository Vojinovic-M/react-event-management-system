const API_URL = "https://localhost:7095";

export const register = async (userData: any) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
        });
        return response.json();

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
        const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include'
        });
        localStorage.removeItem('user');

    } catch (error) {
        console.error('Error logging out:', error);
    }
}