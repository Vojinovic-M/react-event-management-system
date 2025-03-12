import { useEffect, useState } from "react";
import User from '../models/User';
import { Link } from "react-router-dom";
import { logout } from "../services/AuthService";
import '../lib/navbar.css';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const tokenData = localStorage.getItem('user');
        if (tokenData) {
            try {
                const { accessToken } = JSON.parse(tokenData!);
                fetch('https://localhost:7095/api/user/profile/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error(`Failed to fetch user profile: ${response.status}`);
                })
                .then((data: any) => {  setUser(data);  }  )
                .catch(error => console.error('Error fetching user profile:', error));
            } catch(error) {
                console.error("Error parsing user data from localStorage: ", error);
            }
            
        }
    }, []);

    const handleLogout = async () => {
      await logout();
      setUser(null);
    }

    return <div>
        <ul className="flex w-full justify-center bg-blue-700 p-4 mb-16">
            {user ? (
                <>
                <li className="mr-6"><Link className="text-gray-100 hover:text-blue-100" to="/">Events List</Link></li>
                <li className="mr-6"><Link to="/user/profile" className="text-gray-100 hover:text-blue-100">User Profile</Link></li>
                <li className="mr-6"><button onClick={handleLogout} className="text-gray-100 hover:text-blue-100">Logout</button></li> 
                <li className="mr-6"><Link to="/event/create" className="text-gray-100 hover:text-blue-100">Create Event</Link></li>
                <li className="mr-6"><p className="text-gray-100 hover:text-blue-100 mr-8">Hi, {user.email}</p></li>
            </>
            ) : (
                <>
                    <li className="mr-6"><Link className="text-gray-100 hover:text-blue-100" to="/">Events List</Link></li>
                    <li className="mr-6"><Link className="text-gray-100 hover:text-blue-100" to="/user/login">Login</Link></li>
                    <li className="mr-6"><Link className="text-gray-100 hover:text-blue-100" to="/user/register">Register</Link></li>
                </>
                )}
        </ul>
    </div>
}