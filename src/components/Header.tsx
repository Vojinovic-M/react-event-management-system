import axios from "axios";
import { useEffect, useState } from "react";
import { User } from "../pages/user/UserProfile";
import { Link } from "react-router-dom";

export default function Header() {
    const [user, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     axios.get('/user/profile')
    //         .then(response => setUser(response.data))
    //         .catch(error => console.error('Error fetching user profile:', error));
    // }, []);

    // const handleLogout = () => {
    //     axios.post('/user/logout')
    //         .then(() => setUser(null))
    //         .catch(error => console.error('Error logging out:', error));
    // }
    const handleLogout = () => {
        console.log('logout');
    }


    return <div>
        <ul className="flex w-full justify-center bg-gray-100 p-4">
            {user ? (
                <>
                    <li className="mr-6">
                            <span className="text-blue-500">Welcome, {user.firstName}</span>
                            <ul className="dropdown-content">
                                <li><Link className="text-blue-500 hover:text-blue-800" to="/user/profile">User Profile</Link></li>
                                <li><button className="text-blue-500 hover:text-blue-800" onClick={handleLogout}>Logout</button></li>
                            </ul>
                    </li>
                    <li className="mr-6"><Link className="text-blue-500 hover:text-blue-800" to="/event/create">Create Event</Link></li>
                </>
            ) : (
                <>
                    <li className="mr-6"><Link className="text-blue-500 hover:text-blue-800" to="/">Events List</Link></li>
                    <li className="mr-6"><Link className="text-blue-500 hover:text-blue-800" to="/user/login">Login</Link></li>
                    <li className="mr-6"><Link className="text-blue-500 hover:text-blue-800" to="/user/register">Register</Link></li>
                </>
                )}
        </ul>
    </div>
}