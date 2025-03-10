import { useEffect, useState } from "react";
import User from '../models/User';
import { Link } from "react-router-dom";
import { logout } from "../services/AuthService";
import '../lib/navbar.css';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [sidenavVisible, setSidenavVisible] = useState(false);

    useEffect(() => {
        const tokenData = localStorage.getItem('user');
        if (tokenData) {
            const { accessToken, refreshToken } = JSON.parse(tokenData!);
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
            .then((data: any) => {
                setUser(data);
            })
            .catch(error => console.error('Error fetching user profile:', error));
        }
    }, []);

    const handleLogout = async () => {
      await logout();
      setUser(null);
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };
    
      const openNav = () => {
        setSidenavVisible(true);
      };
    
      const closeNav = () => {
        setSidenavVisible(false);
      };


    return <div>
        <ul className="flex w-full justify-center bg-blue-700 p-4 mb-16">
            {user ? (
                <>
                <button className="text-gray-100 hover:text-blue-100 mr-8" onClick={toggleDropdown}>Hi, {user.email}</button>
                <li className="mr-6"><Link to="/user/profile" className="text-gray-100 hover:text-blue-100">User Profile</Link></li>
                <li className="mr-6"><button onClick={handleLogout} className="text-gray-100 hover:text-blue-100">Logout</button></li> 
                <li className="mr-6"><Link to="/event/create" className="text-gray-100 hover:text-blue-100">Create Event</Link></li>
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