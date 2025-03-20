import '../lib/navbar.css';
import AdminNavbar from "./navbar/AdminNavbar";
import UserNavbar from "./navbar/UserNavbar";
import GuestNavbar from "./navbar/GuestNavbar";
import { logoutUser } from "../store/thunks/authThunks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user} = useAppSelector((state) => state.auth)

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/user/login')
    };

    return (
        <header>
            {user ? (
                user.roles?.includes("Admin") ? (
                    <AdminNavbar user={user} onLogout={handleLogout}/>
                ) : (
                    <UserNavbar user={user} onLogout={handleLogout}/>
                )
            ) : (
                <GuestNavbar/>
            )}
        </header>
    )
}